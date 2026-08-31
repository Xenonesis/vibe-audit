# Browser Extension Profile

Use for Chrome, Firefox, Edge, and Safari browser extensions (Manifest V3 / MV2 migration).

Prioritize:
- Manifest V3 service worker lifecycle: stateless background scripts, `chrome.alarms` over `setInterval`/`setTimeout`, persistent state in `chrome.storage.local`
- Chrome Web Store store-rejection prevention: zero remotely hosted code (`<script src="https://...">`), zero `eval()` / `new Function()`, minimum viable permissions (avoid `<all_urls>`, broad host permissions)
- Content script security: safe DOM manipulation (avoid unescaped `innerHTML` injection into host pages), secure messaging between content scripts and background workers (`chrome.runtime.sendMessage` validation)
- Storage & privacy: encryption of sensitive API keys or user tokens, no plaintext storage of sensitive user session credentials in sync storage
- CSP (Content Security Policy): valid `manifest.json` CSP definitions without unsafe directives
