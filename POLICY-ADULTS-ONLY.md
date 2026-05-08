# Verified Adults Only — Content Access Policy

**Jurisdiction:** Victoria, Australia (eSafety Act 2021 + 2026 Draft Age Assurance Codes)
**Operator:** Ashley (Independent Developer, Kialla VIC AU)
**Effective:** 2026-05-05
**Version:** 1.0

---

## Policy Statement

All NSFW, adult, explicit, or age-restricted content served by this platform
or any sub-project under the Open Source Playground mono-repo is subject to
**mandatory age verification** before access is granted. No exceptions.

This policy applies to:

- The SOULVERSE AI companion platform (`ai-gf-vr-soulverse`)
- The NSFW License API (`nsfw-license-api`)
- Creator FanWall (`creator-fanwall`)
- Any future sub-project producing or serving Level 2+ classified content

---

## Enforcement Mechanism (Supabase RLS)

Every NSFW table and storage bucket MUST have a `verified_adults_only` policy
applied at the database level. RLS is the source of truth — application code
is a secondary defence only.

```sql
-- Applied to ALL NSFW tables
CREATE POLICY "verified_adults_only" ON nsfw_content
  FOR SELECT USING (
    (auth.jwt() ->> 'age_verified')::bool = true
    AND (auth.jwt() ->> 'age_verified_method') IS NOT NULL
    AND (auth.jwt() ->> 'dob_year')::int <= EXTRACT(YEAR FROM NOW()) - 18
  );

-- Applied to media assets
CREATE POLICY "verified_adults_only_media" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'nsfw-media'
    AND (auth.jwt() ->> 'age_verified')::bool = true
  );

-- Applied to companions table (explicit tier)
CREATE POLICY "verified_adults_only_companions" ON companions
  FOR SELECT USING (
    content_level <= 1
    OR (
      (auth.jwt() ->> 'age_verified')::bool = true
      AND (auth.jwt() ->> 'dob_year')::int <= EXTRACT(YEAR FROM NOW()) - 18
    )
  );
```

---

## Age Verification Requirements (AU eSafety 2026)

| Tier | Method | Strength | Use Case |
|------|--------|----------|----------|
| Minimum | DOB self-declaration + checkbox | Weak | Level 1 (Suggestive) |
| Standard | Credit card via CCBill | Medium | Level 2 (Explicit) |
| Strong (recommended) | Document ID via AU-approved provider | High | Level 3-4 (Hardcore / AI-gen) |

- All `age_verified` flags stored in Supabase Auth JWT custom claims
- `age_verified_method` logged in `user_profiles` table for audit
- **Re-verification required every 12 months** (enforced via Supabase cron)

---

## Required JWT Claims (set on verified login)

```json
{
  "age_verified": true,
  "age_verified_method": "ccbill|document|dob_self_declare",
  "age_verified_at": "2026-05-05T10:00:00Z",
  "dob_year": 1990,
  "jurisdiction": "AU-VIC"
}
```

---

## Content Classification

| Level | Label | Gate Requirement |
|-------|-------|------------------|
| 0 | SFW | Public — no auth required |
| 1 | Suggestive | Logged in (any verified email) |
| 2 | Explicit | `age_verified = true` (any method) |
| 3 | Hardcore | `age_verified = true` + strong method (CCBill or Document) |
| 4 | Custom / AI-gen | NSFW License Key + `age_verified = true` |

---

## Compliance Hooks

- **eSafety Commissioner reporting:** `ESAFETY_WEBHOOK_URL` env var
- **CSAM hash-scan:** Integrated on every media upload (PhotoDNA / NCMEC)
- **2257 record-keeping:** `/records/2257/` directory, 7-year retention
- **DMCA takedown pipeline:** `dmca@[yourdomain].com` + Supabase takedown log
- **IBAC reporting route:** Anonymous reporting endpoint for content concerns

---

## Operator Liability

Content served without verified adult status is a violation of this policy
and may constitute a breach of the **Online Safety Act 2021 (AU)**.

All NSFW API keys issued via `nsfw-license-api` inherit this policy
automatically — license holders agree to enforce equivalent age verification
on any downstream platform.

---

## Revocation

The Operator reserves the right to revoke any NSFW license key, suspend any
account, or remove any content at any time for policy violations, legal
compliance, or safety concerns. Revocation is immediate and non-appealable
in the case of:

- CSAM detection
- Non-consensual content (NCII / deepfake without consent)
- Bypassing age verification mechanisms
- Failure to enforce equivalent policies on downstream platforms

---

## Contact

- **DMCA / Takedown:** dmca@[yourdomain].com
- **Compliance / Legal:** legal@[yourdomain].com
- **eSafety concerns:** safety@[yourdomain].com
