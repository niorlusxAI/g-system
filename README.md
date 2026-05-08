# Ashley's Open Source Playground

> Build everything. Own everything. License everything.
> **Stack:** Termux · GitHub Actions · Supabase · Bunny CDN · CCBill · Vercel · Next.js · Expo

This repository currently contains the **SOULVERSE** sub-project (Next.js 14
web app scaffold) plus the licensing and policy framework for the wider
playground mono-repo.

---

## Current Contents

```
.
├── app/                          # Next.js 14 App Router (SOULVERSE web)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/                   # SOULVERSE UI
│   ├── age-verification-gate.tsx # AU eSafety 2026 compliant DOB gate
│   ├── landing-page.tsx          # Hero, companions, pricing, CTA
│   ├── companion-card.tsx        # AI companion profile card
│   ├── chat-interface.tsx        # Messaging UI with locked premium features
│   ├── dashboard.tsx             # User dashboard + usage stats
│   ├── paywall-modal.tsx         # CCBill subscription tier selector
│   └── site-header.tsx           # Auth-aware header
├── components/ui/                # shadcn/ui primitives
├── lib/utils.ts                  # cn() helper
├── LICENSE                       # MIT (code) + carve-out for NSFW
├── POLICY-ADULTS-ONLY.md         # Verified Adults Only enforcement policy
├── NSFW_BUILDER_MODE.md          # Power Pack v1.0 boot file
├── nsfw-license-api/
│   └── LICENSE-NSFW.md           # VIC-AU NSFW content license
└── README.md                     # This file
```

---

## Target Mono-repo Structure (Roadmap)

```
playground/
├── .github/workflows/
│   ├── load-secrets.yml          # Vault → all repos
│   ├── agent-loop.yml            # 24/7 Perplexity self-redispatch
│   └── deploy.yml                # Unified deploy trigger
├── secrets-vault/
│   ├── vault.env.age             # age-encrypted master secrets
│   ├── mint-root.sh              # Issues NSFW root key
│   └── propagate.yml             # Syncs to all repos
├── nsfw-license-api/
│   ├── supabase/functions/
│   │   ├── issue-license/        # JWT NSFW key issuance
│   │   ├── validate-license/     # License gate middleware
│   │   └── nsfw-gateway/         # Age-verified content router
│   └── LICENSE-NSFW.md
├── perplexity-loops/
│   ├── research-harvester.yml
│   ├── ai-gf-content-queue.yml
│   ├── keyforgents-healer.yml
│   └── free-text-spec.yml
├── ai-gf-vr-soulverse/           # ← This is what's currently scaffolded
├── creator-fanwall/
├── keyforagents/
├── promptforge/
├── pcs-g-system/
└── NSFW_BUILDER_MODE.md
```

---

## Quick Boot (Termux)

```bash
# Clone playground
git clone https://github.com/YOUR_HANDLE/playground.git && cd playground

# Decrypt secrets
age -d -i ~/.age/key.txt secrets-vault/vault.env.age > .env && source .env

# Start all loops locally
bash perplexity-loops/start-all.sh

# Issue NSFW root license key
bash secrets-vault/mint-root.sh

# Deploy Supabase edge functions
supabase functions deploy issue-license validate-license nsfw-gateway

# Deploy SOULVERSE web
cd ai-gf-vr-soulverse/apps/web && vercel --prod
```

---

## SOULVERSE — Local Dev

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. Age verification gate appears first; pass it to
see the landing page. The "Sign In" button bypasses real auth (UI mockup mode)
until Supabase is connected.

---

## Power Pack Boot Line

```
Load NSFW_BUILDER_MODE from pinned Power Pack v1.0. Confirm rails, hosting, and skill router.
I'm in Termux/VIC-AU. Default to CCBill + Bunny + Supabase (ap-southeast-2).
Apply AU eSafety 2026 age assurance. Ask me which template before scaffolding.
```

---

## Licensing

| Asset | License | File |
|-------|---------|------|
| Source code (non-NSFW) | MIT | `LICENSE` |
| NSFW content & API keys | VIC-AU NSFW License | `nsfw-license-api/LICENSE-NSFW.md` |
| Adult content access policy | Operator-enforced | `POLICY-ADULTS-ONLY.md` |
| Builder mode rails | Internal reference | `NSFW_BUILDER_MODE.md` |

All adult content access is governed by `POLICY-ADULTS-ONLY.md` (Verified
Adults Only — VIC-AU + AU eSafety Act 2021 + 2026 Draft Age Assurance Codes).

---

## Compliance Summary

- **Jurisdiction:** Victoria, Australia
- **Age verification:** Mandatory before Level 2+ content access
- **Re-verification cadence:** 12 months
- **CSAM scanning:** Required on every upload
- **2257 records:** 7-year retention
- **DMCA window:** 72 hours
- **eSafety reporting:** Webhook-wired

---

## Status

- [x] SOULVERSE UI mockup scaffolded
- [x] Licensing framework published (MIT + NSFW + Adults-Only Policy)
- [x] Power Pack v1.0 boot file pinned
- [ ] Supabase integration (operator action required)
- [ ] CCBill webhook handlers
- [ ] Bunny CDN pull-zone wiring
- [ ] Edge functions deploy (`issue-license`, `validate-license`, `nsfw-gateway`)
- [ ] Mobile app (Expo)
- [ ] WebXR / VR scene
- [ ] Perplexity self-redispatch loops
