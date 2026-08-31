# Mobile Application Profile

Use for React Native, Expo, Flutter, iOS (Swift/SwiftUI), and Android (Kotlin/Jetpack Compose) mobile projects.

Prioritize:
- Secure authentication & secret storage: enforce hardware-backed Keychain (iOS) and Keystore / EncryptedSharedPreferences (Android) via `expo-secure-store` or `react-native-keychain`; flag unencrypted `AsyncStorage` / `SharedPreferences` for auth tokens and passwords
- App Store & Play Store rejection gates: verify Apple Guideline 5.1.1(v) account deletion pathway (`DELETE /api/account` accessible in-app), privacy manifests, and declared background capabilities
- Deep linking & URL scheme protection: strictly sanitize and validate route parameters from custom URL schemes (`myapp://`) and Universal Links before state mutations or authentication bypass
- Offline resilience & network transitions: graceful handling of zero-connectivity, error boundaries, optimistic UI rollback, and retry queues
- Memory & performance: cleanup of event listeners, background timers, unoptimized image assets, and bridge serialization overhead
