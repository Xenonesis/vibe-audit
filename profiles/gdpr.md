# GDPR Compliance Profile (Lite)

Use when application handles EU user personal data, or when the user mentions "GDPR", "privacy", "PII", or "data protection".

> **Disclaimer:** These are technical heuristic checks against common compliance patterns. They are not legal advice and do not constitute a legal compliance certification. Consult qualified legal and data privacy professionals for formal regulatory compliance.

## Core Heuristics & Audit Targets

1. **PII Protection & Encryption at Rest**:
   - Verify that schema columns storing Personally Identifiable Information (PII) such as `email`, `phone`, `ssn`, `dob`, `address`, `ip_address` utilize encryption markers, hashing, or secure tokenization.
   - Flag plain-text PII stored in unencrypted relational or cache stores.

2. **Consent Capture & Preference Management**:
   - Check for explicit consent capture on signup/registration (e.g. Terms of Service and Privacy Policy checkbox).
   - Check that third-party analytics and tracking scripts (Google Analytics, Meta Pixel, Hotjar) are gated behind cookie consent banner acceptance.

3. **Right to Erasure (Data Deletion Pathway)**:
   - Verify existence of an account deletion pathway (e.g. `DELETE /api/users/:id`, user data purge routine, or automated erasure job).
   - Ensure cascade deletion or anonymization removes user records from related child tables, audit logs, and backups.

4. **Log Privacy & Data Minimization**:
   - Check that server loggers do not log plain-text user emails, phone numbers, IP addresses, or request bodies containing personal information.

5. **Data Retention & Expiry Policies**:
   - Check for TTL (Time-To-Live) or scheduled cleanup routines on ephemeral data (e.g. password reset tokens, unverified signups, audit logs older than retention period).

## Risk & Governance
- Schema changes or deletion pathway implementation: `HIGH` change risk (requires explicit user consent).
- Adding cookie consent gating or log sanitization: `MEDIUM` change risk.
