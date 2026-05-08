# Perplexity Computer Work — Master TODO

**Updated:** 2026-05-05 | **Operator:** Ashley | **Location:** Kialla VIC AU

---

## CRITICAL / IN PROGRESS

- [ ] **Scaffold ai-gf-vr-soulverse** — Full stack: schema → env → edge functions
      → Next.js → CCBill + Bunny + Supabase (ap-southeast-2)
- [ ] **Deploy nsfw-license-api** — Supabase Edge Functions:
      `issue-license`, `validate-license`, `nsfw-gateway` + `mint-root.sh`
- [ ] **Apply POLICY-ADULTS-ONLY.md RLS** — Verified Adults Only policy on all
      NSFW tables + storage buckets in Supabase
- [ ] **Wire AU eSafety 2026 compliance** — JWT age claims, CSAM scan on upload,
      `ESAFETY_WEBHOOK_URL`, IBAC reporting route
- [ ] **secrets-vault deployment** — `vault.env.age` age-encrypted +
      `propagate.yml` syncing to ALL repos under GitHub account

---

## ACTIVE BUILDS

- [ ] **perplexity-loops × 4** — Deploy all 4 GitHub Actions self-redispatch loops:
  - [ ] research-harvester → Supabase
  - [ ] ai-gf-content-queue → SOULVERSE pipeline
  - [ ] keyforagents-stack-healer → health monitor
  - [ ] free-text-custom-spec → agent loop
- [ ] **Open Source Playground repo** — Create `playground/` mono-repo on GitHub
      with full structure
- [ ] **NSFW_BUILDER_MODE.md** — Pin Power Pack v1.0 as Knowledge doc in Comet Space
- [ ] **KeyForAgents SaaS** — Priority #1 revenue project — complete billing +
      key issuance flow
- [ ] **PromptForge** — Priority #3 — scaffold prompt marketplace
- [ ] **Creator FanWall** — CCBill subscription tiers + Bunny media + Supabase RLS

---

## SOULVERSE (ai-gf-vr-soulverse)

- [x] **UI scaffold** — Landing, age gate, dashboard, chat, paywall (mockup mode)
- [ ] **Supabase schema** — `users`, `profiles`, `companions`, `sessions`,
      `purchases`, `nsfw_content`, `age_verification` tables + RLS
- [ ] **Auth flow** — Supabase Auth + JWT custom claims (`age_verified`, `dob_year`)
- [ ] **CCBill integration** — Subscription webhooks → Supabase user entitlements
- [ ] **Bunny CDN** — Pull zone + upload signed URLs for NSFW media
- [ ] **Next.js 14 web app** — Companion profiles, paywall, WebXR viewer
- [ ] **React Native Expo** — Mobile companion app
- [ ] **ElevenLabs/Coqui TTS** — Voice synthesis for AI companions
- [ ] **Replicate** — Image/video generation pipeline
- [ ] **Unity VR** — WebXR scene scaffolding
- [ ] **P2P multiplayer** — Supabase Realtime + presence
- [ ] **Virtual economy** — Token/credit system schema
- [ ] **Face upload feature** — Replicate face-swap pipeline + consent gating

---

## AGENT / AUTOMATION INFRASTRUCTURE

- [ ] **PCS G-System v2.0** — Confirm `pcs_master`, `fleet`, `brain`, `collector`,
      `alerts` all healthy (Telegram + Slack summaries active)
- [ ] **Self-learning agent loop** — 5-min Perplexity Max spaces agents:
      learn → update → deploy → log to Sheets/Notion/Supabase
- [ ] **SkillBank embeds** — Passing test → activate new version →
      embed into SkillBank → log to Sheets + Notion
- [ ] **MetaClaw pattern** — Confirm task accuracy baseline (target >40.6%)
- [ ] **Memento-Skills** — Confirm GAIA benchmark score (target >+13.7 pts)
- [ ] **Notion sync** — All agent summaries/artifacts flowing to Notion
- [ ] **Google Sheets dashboard** — All loop statuses + revenue metrics visible

---

## CONTENT POLICY & COMPLIANCE

- [x] **POLICY-ADULTS-ONLY.md** — published in playground repo root
- [x] **LICENSE-NSFW.md** — VIC-AU jurisdiction NSFW license published
- [ ] **Supabase RLS — `verified_adults_only`** policy on:
  - [ ] `nsfw_content` table
  - [ ] `storage.objects` (`nsfw-media` bucket)
  - [ ] `companions` table (explicit tier)
  - [ ] `sessions` table (paid/NSFW sessions)
- [ ] **JWT claims pipeline** — `age_verified` + `method` + `dob_year` on login
- [ ] **Age re-verification cron** — 12-month expiry check (Supabase cron)
- [ ] **2257 records directory** — `/records/2257/` 7-year retention
- [ ] **CSAM hash-scan** — On every media upload (middleware)
- [ ] **DMCA pipeline** — Email handler + Supabase takedown log
- [ ] **eSafety webhook** — Report endpoint wired to `ESAFETY_WEBHOOK_URL`

---

## REVENUE MILESTONES

- [ ] **$0 → $1K MRR** — KeyForAgents first paying customers
- [ ] **$1K → $5K MRR** — SOULVERSE subscriptions live via CCBill
- [ ] **$5K → $10K MRR** — Creator FanWall + PromptForge live
- [ ] **$10K MRR** — Unlock: new projects approved, NexGen AI Agency scale-up
- [ ] **$81K MRR by Month 12** — Full 5-project portfolio firing

---

## Tags

`#playground` `#nsfw-builder` `#soulverse` `#perplexity-247` `#power-pack-v1`
`#verified-adults-only` `#termux` `#vic-au` `#ccbill` `#bunny` `#supabase`
