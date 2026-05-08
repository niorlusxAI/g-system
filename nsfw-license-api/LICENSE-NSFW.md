# NSFW Content License (VIC-AU)

**Licensor:** Ashley (Independent Developer, Kialla VIC AU)
**Jurisdiction:** Victoria, Australia
**Version:** 1.0
**Effective:** 2026-05-05

---

## 1. Definitions

- **"Licensor"** — Ashley, the operator of the Open Source Playground mono-repo.
- **"Licensee"** — Any individual or entity issued a valid NSFW License Key
  via the `nsfw-license-api`.
- **"NSFW Content"** — Any content classified at Level 2, 3, or 4 under
  `POLICY-ADULTS-ONLY.md`.
- **"License Key"** — The JWT-based key issued by the `issue-license` edge
  function, signed by the Licensor's root key.
- **"Platform"** — Any service, application, or API operated by the Licensee
  that consumes NSFW Content under this license.

---

## 2. Grant of License

Subject to the terms below, the Licensor grants the Licensee a **non-exclusive,
non-transferable, revocable** license to:

1. Access NSFW Content via authenticated API calls using a valid License Key.
2. Display NSFW Content to **verified adults only** within the Licensee's Platform.
3. Cache NSFW Content for performance, subject to revocation propagation
   (max 24 hour TTL).

This license does **NOT** grant rights to:

- Redistribute NSFW Content outside the Licensee's Platform.
- Train AI models on NSFW Content without explicit written consent.
- Sub-license, resell, or transfer the License Key.
- Modify NSFW Content in a way that misrepresents the original creator.

---

## 3. Mandatory Conditions

The Licensee agrees to:

### 3.1 Age Verification
Enforce age verification on the Licensee's Platform that meets or exceeds the
standards in `POLICY-ADULTS-ONLY.md`. Specifically:

- Level 2 content requires verified `age_verified = true`
- Level 3 content requires strong verification (CCBill or Document ID)
- Level 4 content requires both a valid NSFW License Key AND age verification
- Re-verify users every 12 months

### 3.2 Compliance Hooks
Implement the following on the Licensee's Platform:

- CSAM hash-scanning on every upload (PhotoDNA, NCMEC, or equivalent)
- 2257 record-keeping with 7-year retention
- DMCA takedown handler with response within 72 hours
- eSafety Commissioner reporting endpoint

### 3.3 Reporting
Report aggregate usage statistics to the Licensor monthly:

- Total API calls
- Unique verified users
- Content takedown count
- Compliance incidents (CSAM detections, DMCA notices)

### 3.4 Jurisdiction Compliance
Comply with applicable laws in:

- The Licensee's country of operation
- The Licensor's jurisdiction (Victoria, Australia)
- The country of each end user (geo-fence where required)

---

## 4. Revocation

The Licensor may revoke the License Key **immediately and without notice** if:

- The Licensee breaches any term of this license or `POLICY-ADULTS-ONLY.md`.
- CSAM is detected on the Licensee's Platform.
- The Licensee fails to enforce age verification.
- A regulator orders revocation.
- The Licensee's payment fails (for paid tiers).

Upon revocation:

1. The License Key stops validating within 24 hours.
2. The Licensee MUST purge cached NSFW Content within 24 hours.
3. The Licensee MUST notify affected end users.
4. No refund is owed for unused subscription time in case of breach-based
   revocation.

---

## 5. Warranty Disclaimer

NSFW CONTENT IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. THE LICENSOR
MAKES NO WARRANTIES REGARDING:

- Fitness for a particular purpose
- Non-infringement
- Continuous availability
- Compliance with the laws of any jurisdiction other than VIC-AU

---

## 6. Limitation of Liability

To the maximum extent permitted by law, the Licensor's total liability under
this license is limited to the amount the Licensee paid for the License Key
in the 12 months preceding the claim.

The Licensor is NOT liable for:

- Indirect, incidental, or consequential damages
- Loss of profits, revenue, or data
- Regulatory penalties imposed on the Licensee
- Third-party claims arising from the Licensee's Platform

---

## 7. Indemnification

The Licensee agrees to indemnify and hold harmless the Licensor from any
claims, damages, or costs arising from:

- The Licensee's failure to enforce age verification
- The Licensee's breach of this license
- Content uploaded or generated on the Licensee's Platform
- Regulatory action against the Licensee's Platform

---

## 8. Governing Law

This license is governed by the laws of **Victoria, Australia**. Any disputes
shall be resolved in the courts of Victoria, Australia.

---

## 9. Acceptance

Issuance of a License Key via `issue-license` constitutes acceptance of this
license by the Licensee. Continued use of the License Key constitutes ongoing
acceptance of any updates to this license (notified 30 days in advance).

---

## Contact

- **License inquiries:** license@[yourdomain].com
- **Compliance:** legal@[yourdomain].com
- **Revocation appeals:** appeals@[yourdomain].com
