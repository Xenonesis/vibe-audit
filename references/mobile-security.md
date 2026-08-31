# Mobile Application Security & Resilience Reference

Mobile applications run in untrusted client environments with local filesystem access, background lifecycle suspension, and strict App Store review policies. Vibe-coded mobile apps frequently store credentials insecurely in unencrypted storage or miss mandatory store compliance flows.

## Core Audit Targets

### 1. Insecure Local Credential Storage
Check:
- Storing authentication tokens, JWTs, refresh tokens, passwords, or encryption keys in unencrypted storage:
  - React Native: `AsyncStorage.setItem()` (stored as plain SQLite / XML on Android / iOS sandbox) instead of `expo-secure-store` or `react-native-keychain`.
  - Flutter: `SharedPreferences` instead of `flutter_secure_storage`.
  - Android: `SharedPreferences` without `EncryptedSharedPreferences`.
  - iOS: `UserDefaults` instead of the iOS Keychain.

### 2. App Store & Play Store Rejection Gates
Check:
- Missing in-app account deletion mechanism: Apple App Store Review Guideline 5.1.1(v) requires any app supporting account creation to offer immediate in-app account deletion (`DELETE /api/user/account`).
- Missing Privacy Manifests: iOS 17+ requirement for third-party SDK privacy declarations (`PrivacyInfo.xcprivacy`).
- Declaring background execution capabilities (audio, location, VoIP, fetch) in `Info.plist` / `AndroidManifest.xml` without actual, user-facing continuous background functionality.
- Missing clear privacy policy links in app settings or signup screens.

### 3. Deep Linking & URL Scheme Security
Check:
- Implicit trust of deep link parameters: routing directly to sensitive screens or mutating state based on `myapp://reset-password?token=...` or Universal Links without active session validation.
- Unsanitized URL parameters in in-app webviews leading to open redirects or local file disclosure (`file://`).

### 4. Network Resilience & Offline Fallbacks
Check:
- Unhandled network disconnections resulting in unrecoverable white screens or infinite loading spinners.
- Missing root error boundaries (`ErrorBoundary` in React Native) around navigation trees.
- Insecure HTTP traffic: `NSAllowsArbitraryLoads` enabled in iOS `Info.plist` or `android:usesCleartextTraffic="true"` in `AndroidManifest.xml`.

## Remediation Policy
- **Confidence:** `CONFIRMED` when auth tokens are written to `AsyncStorage` / `UserDefaults`, or in-app account deletion is absent in account-enabled apps.
- **Change Risk:** `MEDIUM`. Migrating storage keys to Keychain requires backward-compatible token migration.
