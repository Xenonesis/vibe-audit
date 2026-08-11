# Security Policy

## Scope
This repository contains instructions and tooling that may be used to inspect untrusted source trees. That makes the **execution boundary itself** security-sensitive.

## Reporting a vulnerability
Report issues that could cause the package to execute untrusted repository code unexpectedly, expose credentials, escape intended filesystem/network restrictions, bypass approval gates, misclassify destructive actions as safe, or upload sensitive artifacts.

Do not include live secrets in reports. Reproduce with synthetic fixtures whenever possible.

## Maintainer rules
- Security reports are treated as private until a safe remediation/release plan exists.
- Do not ask reporters to run destructive proof-of-concept commands on real systems.
- Patch the narrowest vulnerable boundary first; add a regression fixture/eval for every confirmed security bug when practical.
- Release notes must describe user-visible security behavior changes without exposing exploitable secrets.

## Execution safety invariant
Unknown repository code must not gain implicit access to host credentials, production services, privileged sockets, host home directories, or unrestricted network egress through this package's recommended runner path.

See `THREAT-MODEL.md` and `references/execution-safety.md`.
