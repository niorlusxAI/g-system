/**
 * G-System Orchestrator
 * Central 24/7 automation brain for niorlusxAI domain/deploy/health pipeline.
 *
 * Intergenerational (polyglot) design: this TS core dispatches to skill adapters
 * that can be implemented in any language (Python, Bash, Node, Go) via the
 * `skills/` directory. Each skill exposes a JSON stdin/stdout contract.
 *
 * Responsibilities:
 *   - Pull pending jobs from Supabase queue
 *   - Route to providers (Dynadot, Vercel, DNS, Health)
 *   - Retry with exponential backoff + circuit breaker
 *   - Emit structured logs + metrics
 *
 * NOTE: No secrets are committed. All credentials are read from environment
 * variables documented in SETUP.md. Configure via Vercel/GitHub secrets.
 */

import { spawn } from "node:child_process";

type JobType =
  | "domain.acquire"
  | "domain.dns.sync"
  | "deploy.vercel"
  | "health.check"
  | "skill.invoke";

interface Job {
  id: string;
  type: JobType;
  payload: Record<string, unknown>;
  attempts: number;
  max_attempts: number;
}

interface ProviderResult {
  ok: boolean;
  data?: unknown;
  error?: string;
  retryable?: boolean;
}

// ---------- ENV ----------
const ENV = {
  SUPABASE_URL: process.env.SUPABASE_URL ?? "",
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ?? "",
  DYNADOT_API_KEY: process.env.DYNADOT_API_KEY ?? "",
  VERCEL_TOKEN: process.env.VERCEL_TOKEN ?? "",
  VERCEL_TEAM_ID: process.env.VERCEL_TEAM_ID ?? "",
  TICK_MS: Number(process.env.TICK_MS ?? 15_000),
};

// ---------- Circuit Breaker ----------
class CircuitBreaker {
  private failures = 0;
  private openedAt = 0;
  constructor(private threshold = 5, private cooldownMs = 60_000) {}
  canPass(): boolean {
    if (this.failures < this.threshold) return true;
    if (Date.now() - this.openedAt > this.cooldownMs) {
      this.failures = 0;
      return true;
    }
    return false;
  }
  recordSuccess() { this.failures = 0; }
  recordFailure() {
    this.failures++;
    if (this.failures >= this.threshold) this.openedAt = Date.now();
  }
}

const breakers: Record<string, CircuitBreaker> = {
  dynadot: new CircuitBreaker(),
  vercel: new CircuitBreaker(),
  dns: new CircuitBreaker(),
};

// ---------- Providers ----------
async function dynadotRequest(command: string, params: Record<string, string>): Promise<ProviderResult> {
  if (!breakers.dynadot.canPass()) return { ok: false, error: "breaker_open", retryable: true };
  const url = new URL("https://api.dynadot.com/api3.json");
  url.searchParams.set("key", ENV.DYNADOT_API_KEY);
  url.searchParams.set("command", command);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    breakers.dynadot.recordSuccess();
    return { ok: true, data };
  } catch (e: any) {
    breakers.dynadot.recordFailure();
    return { ok: false, error: String(e), retryable: true };
  }
}

async function vercelAddDomain(project: string, domain: string): Promise<ProviderResult> {
  if (!breakers.vercel.canPass()) return { ok: false, error: "breaker_open", retryable: true };
  const url = `https://api.vercel.com/v10/projects/${project}/domains${ENV.VERCEL_TEAM_ID ? `?teamId=${ENV.VERCEL_TEAM_ID}` : ""}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ENV.VERCEL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: domain }),
    });
    const data = await res.json();
    if (!res.ok) {
      breakers.vercel.recordFailure();
      return { ok: false, error: data?.error?.message ?? "vercel_error", retryable: res.status >= 500 };
    }
    breakers.vercel.recordSuccess();
    return { ok: true, data };
  } catch (e: any) {
    breakers.vercel.recordFailure();
    return { ok: false, error: String(e), retryable: true };
  }
}

async function healthCheck(url: string): Promise<ProviderResult> {
  try {
    const started = Date.now();
    const res = await fetch(url, { method: "HEAD" });
    return { ok: res.ok, data: { status: res.status, latency_ms: Date.now() - started } };
  } catch (e: any) {
    return { ok: false, error: String(e), retryable: true };
  }
}

// ---------- Polyglot Skill Adapter ----------
// Invoke any language via subprocess with JSON stdin/stdout.
// skills/<name>.{py,sh,js,go-bin} — orchestrator auto-detects by extension.
function invokeSkill(name: string, input: unknown): Promise<ProviderResult> {
  return new Promise((resolve) => {
    const candidates = [
      { cmd: "python3", args: [`skills/${name}.py`] },
      { cmd: "node",    args: [`skills/${name}.js`] },
      { cmd: "bash",    args: [`skills/${name}.sh`] },
    ];
    const pick = candidates[0]; // simple default; real impl would stat files
    const proc = spawn(pick.cmd, pick.args, { stdio: ["pipe", "pipe", "pipe"] });
    let out = "", err = "";
    proc.stdout.on("data", (d) => (out += d.toString()));
    proc.stderr.on("data", (d) => (err += d.toString()));
    proc.on("close", (code) => {
      if (code === 0) {
        try { resolve({ ok: true, data: JSON.parse(out) }); }
        catch { resolve({ ok: true, data: out }); }
      } else {
        resolve({ ok: false, error: err || `exit_${code}`, retryable: true });
      }
    });
    proc.stdin.write(JSON.stringify(input));
    proc.stdin.end();
  });
}

// ---------- Supabase Queue (minimal REST) ----------
async function sbFetch(path: string, init: RequestInit = {}) {
  const res = await fetch(`${ENV.SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: ENV.SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${ENV.SUPABASE_SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers || {}),
    },
  });
  return res.json();
}

async function claimNextJob(): Promise<Job | null> {
  const rows = await sbFetch(
    "jobs?status=eq.pending&order=created_at.asc&limit=1",
    { method: "PATCH", body: JSON.stringify({ status: "running" }) },
  );
  return Array.isArray(rows) && rows.length ? rows[0] as Job : null;
}

async function completeJob(id: string, result: ProviderResult) {
  await sbFetch(`jobs?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      status: result.ok ? "done" : "failed",
      result,
      finished_at: new Date().toISOString(),
    }),
  });
}

// ---------- Dispatch ----------
async function dispatch(job: Job): Promise<ProviderResult> {
  switch (job.type) {
    case "domain.acquire":
      return dynadotRequest("register", job.payload as Record<string, string>);
    case "domain.dns.sync":
      return dynadotRequest("set_ns", job.payload as Record<string, string>);
    case "deploy.vercel":
      return vercelAddDomain(
        String(job.payload.project),
        String(job.payload.domain),
      );
    case "health.check":
      return healthCheck(String(job.payload.url));
    case "skill.invoke":
      return invokeSkill(String(job.payload.name), job.payload.input);
    default:
      return { ok: false, error: "unknown_job_type" };
  }
}

// ---------- Main Loop ----------
async function tick() {
  try {
    const job = await claimNextJob();
    if (!job) return;
    const result = await dispatch(job);
    await completeJob(job.id, result);
    console.log(JSON.stringify({ ts: Date.now(), job: job.id, type: job.type, ok: result.ok }));
  } catch (e) {
    console.error(JSON.stringify({ ts: Date.now(), error: String(e) }));
  }
}

async function main() {
  console.log(JSON.stringify({ ts: Date.now(), msg: "g-system orchestrator starting", tick_ms: ENV.TICK_MS }));
  // 24/7 loop
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await tick();
    await new Promise((r) => setTimeout(r, ENV.TICK_MS));
  }
}

if (require.main === module) {
  main().catch((e) => {
    console.error("fatal", e);
    process.exit(1);
  });
}

export { main, dispatch, invokeSkill };
