# Browser Extension (Manifest V3) Reference

Manifest V3 (MV3) enforces a strict security and execution model for browser extensions across Chromium (Chrome, Edge, Brave, Opera) and Firefox. Vibe-coded extensions frequently suffer from broken background state, store rejections due to forbidden patterns, or DOM security holes in content scripts.

## Core Audit Targets

### 1. Service Worker Lifecycle & Statelessness
Check:
- Global variables or module-level memory caching in `background.js` / `service-worker.js`. MV3 terminates service workers after ~30 seconds of inactivity; any in-memory state is wiped.
- Use of `setInterval` or `setTimeout` for recurring jobs. Timers are killed when the worker goes idle; use `chrome.alarms.create()` and `chrome.alarms.onAlarm` instead.
- Persistent state management: missing use of `chrome.storage.local` / `chrome.storage.session` for state across worker restarts.
- Asynchronous response handling in `chrome.runtime.onMessage`: forgetting to `return true;` from message listeners when sending an asynchronous `sendResponse()`, causing message ports to close prematurely.

### 2. Chrome Web Store Rejection Triggers
Check:
- Remotely hosted code: loading external JavaScript scripts via `<script src="https://...">`, dynamic CDN imports, or remote iframe execution. All extension code must be packaged locally.
- Use of `eval()`, `new Function()`, or `setTimeout("string", ...)`: forbidden by default MV3 Content Security Policy (CSP).
- Over-broad host permissions: requesting `<all_urls>` or broad wildcards (`*://*/*`) instead of specific domains or `activeTab`.
- Unjustified sensitive permissions: declaring permissions (`webRequest`, `cookies`, `management`, `nativeMessaging`) without corresponding functional usage.

### 3. Content Script DOM Security
Check:
- Unsafe DOM insertion: using `element.innerHTML = userContent` or inserting unescaped external data into the host webpage DOM. Always use `textContent`, `element.setAttribute()`, or DOMPurify.
- Content script prototype pollution or polluting host page global namespace without isolation.
- Unvalidated message passing: accepting commands from webpage postMessage (`window.addEventListener('message', ...)`) without verifying `event.origin` and `event.source`.

### 4. Cross-Origin Fetch & CORS
Check:
- Performing cross-origin `fetch()` in content scripts (subject to the host page's origin and CSP) instead of delegating network calls to the background service worker where extension host permissions apply.
- Storing unencrypted sensitive API keys or user credentials in `chrome.storage.sync` (synced to Google/browser cloud in plain text).

## Remediation Policy
- **Confidence:** `CONFIRMED` when `setInterval` is used in MV3 service worker, `eval` is present in extension bundle, or `innerHTML` injects unescaped variables in content scripts.
- **Change Risk:** `LOW` to `MEDIUM`. Converting timers to `chrome.alarms` requires listener reorganization.
