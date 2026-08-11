# Browser runner
Optional Playwright suite. Do not let this tool start an arbitrary unknown repository command on the host. Launch the trusted/test application inside an approved sandbox, expose only a test port, then point `VCP_BASE_URL` at it. Install browser dependencies only in this tooling directory or a disposable CI image.
