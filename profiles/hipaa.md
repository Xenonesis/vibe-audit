# HIPAA Compliance Profile (Lite)

Use when application handles Protected Health Information (PHI), medical records, or when the user mentions "HIPAA", "healthcare", "patient data", or "clinical".

> **Disclaimer:** These are technical heuristic checks against common compliance patterns. They are not legal advice and do not constitute a HIPAA compliance certification. Consult qualified healthcare security and regulatory compliance experts.

## Core Heuristics & Audit Targets

1. **PHI Encryption at Rest & in Transit**:
   - Verify health data columns (e.g. `diagnosis`, `medication`, `patient_id`, `medical_history`, `treatment_plan`) are stored encrypted at rest with industry-standard algorithms (AES-256).
   - Ensure all public and internal service communication strictly enforces TLS 1.3/1.2 (HTTPS/WSS/gRPC TLS).

2. **Access Control & Role-Based PHI Authorization**:
   - Verify that all routes and database queries accessing patient data enforce strict role and permission checks (e.g. physician, patient, administrator).
   - Prevent IDOR / BOLA vulnerabilities on patient record lookup endpoints.

3. **Audit Logging & Access Trails**:
   - Verify that every read, write, and export operation involving PHI records an immutable audit log entry (timestamp, user_id, patient_id, action_type, IP address).
   - Ensure audit logs cannot be modified or deleted by standard application users.

4. **Session Expiry & Inactivity Timeout**:
   - Verify that authenticated user sessions automatically expire after a configurable period of inactivity (e.g. 15 minutes).

5. **Data Minimization & Exposure Prevention**:
   - Verify that PHI is never passed in URL query parameters (which are stored in proxy/webserver access logs).
   - Verify that application error responses and stack traces never leak patient data values.

## Risk & Governance
- Any changes to PHI storage, encryption, or access controls are `HIGH` change risk (strictly require explicit user approval).
