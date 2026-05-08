# NSFW_BUILDER_MODE — Power Pack v1.0

**Operator:** Ashley | **Location:** Kialla, VIC, AU | **Stack defaults locked**

---

## Confirmed Rails

| Layer | Provider | Region |
|-------|----------|--------|
| Database / Auth / RLS | Supabase | ap-southeast-2 (Sydney) |
| Payments | CCBill | Global (adult-friendly) |
| Media CDN | Bunny CDN | Global pull-zone |
| Hosting (web) | Vercel | Global edge |
| Mobile | Expo / React Native | iOS + Android |
| AI Voice | ElevenLabs / Coqui | API |
| AI Image / Video | Replicate | API |
| Encrypted Vault | age + GitHub Actions | Self-hosted |

---

## Compliance Defaults

- **Jurisdiction:** AU-VIC (Victoria, Australia)
- **Age Assurance:** eSafety Act 2021 + 2026 Draft Codes
- **Re-verification:** 12-month rolling
- **Records:** 2257 retention, 7 years
- **CSAM scan:** Mandatory on every upload (PhotoDNA / NCMEC)
- **Geo-fence:** Per end-user jurisdiction

---

## Skill Router

| Intent | Skill | Output |
|--------|-------|--------|
| "Build SOULVERSE" | `soulverse-scaffold` | Next.js 14 + Supabase schema |
| "Issue NSFW key" | `nsfw-license-mint` | JWT signed by root key |
| "Add new sub-project" | `playground-bootstrap` | Folder + secrets sync + workflows |
| "Deploy edge fn" | `supabase-edge-deploy` | Function deploy + env injection |
| "Run loop" | `perplexity-loop-dispatch` | GitHub Action self-redispatch |
| "Heal stack" | `keyforagents-healer` | Telemetry → alerts → auto-fix |

---

## Power Pack Boot Line

```
Load NSFW_BUILDER_MODE from pinned Power Pack v1.0. Confirm rails, hosting, and skill router.
I'm in Termux/VIC-AU. Default to CCBill + Bunny + Supabase (ap-southeast-2).
Apply AU eSafety 2026 age assurance. Ask me which template before scaffolding.
```

---

## Templates

1. **soulverse-mini** — Single companion, paywall, chat. ~1 day to MVP.
2. **soulverse-full** — Full SOULVERSE with VR, mobile, voice, image gen.
3. **fanwall-creator** — Creator subscription tiers + media gallery.
4. **promptforge** — Prompt marketplace with NSFW + SFW shelves.
5. **keyforagents** — SaaS API key issuance with usage metering.

---

## Quick Boot (Termux)

```bash
git clone https://github.com/YOUR_HANDLE/playground.git && cd playground
age -d -i ~/.age/key.txt secrets-vault/vault.env.age > .env && source .env
bash perplexity-loops/start-all.sh
bash secrets-vault/mint-root.sh
supabase functions deploy issue-license validate-license nsfw-gateway
cd ai-gf-vr-soulverse/apps/web && vercel --prod
```

---

## Status

- [x] Rails confirmed
- [x] Compliance defaults locked
- [x] Skill router published
- [x] SOULVERSE UI scaffolded (this repo)
- [ ] Supabase integration pending operator approval
- [ ] CCBill webhook handler pending
- [ ] Bunny CDN pull-zone pending
