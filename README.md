# Servicegrid 📱🌐

**Servicegrid** is a mobile application built using [Expo](https://expo.dev) and [React Native](https://reactnative.dev).  
It serves as a **mobile wrapper** for the internal **Service Grid web platform**, using a **WebView** to render the web-based system inside a native app.

> This app is intended for use within the BFSI internal network to access Service Grid timesheets and related features from mobile devices.

---

## 🚀 Get Started (Expo Workflow)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the app with Expo:

   ```bash
   npx expo start
   ```

You can then open the app in a:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go) _(limited functionality with WebView)_

---

## 🛠️ Run with React Native CLI (Bare Workflow)

If you're building the app with Xcode or Android Studio, follow these steps:

1. Generate native code:

   ```bash
   npx expo prebuild
   ```

2. (macOS/iOS only) Install CocoaPods dependencies:

   ```bash
   npx pod-install
   ```

3. Run on Android:

   ```bash
   npx react-native run-android
   ```

4. Run on iOS (macOS only):

   ```bash
   npx react-native run-ios
   ```

> Make sure you’ve already opened the app at least once with `npx expo start` before using native commands.

---

## 🔧 Development Notes

- The app uses **WebView** to load:  
  `http://servicegrid.bfsi.local:8069/odoo/timesheets`
- Custom error handling will alert the user if the Service Grid cannot be reached (e.g., not connected to BFSI network).
- Supports:
  - Pull-to-refresh gesture
  - Automatic reload on app resume

### Routing

This project uses [file-based routing](https://docs.expo.dev/router/introduction) via the `expo-router` package. You can develop screens inside the `app/` directory.

---

## 🧹 Reset the Project

To reset and start from a blank app structure:

```bash
npm run reset-project
```

This will move the starter code to `app-example/` and create a fresh `app/` directory.

---

## 📚 Learn More

- [Expo documentation](https://docs.expo.dev/)
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)

---

## 💬 Join the Community

- [Expo on GitHub](https://github.com/expo/expo)
- [Expo Discord](https://chat.expo.dev)

---

_This project is maintained internally and is intended for use inside the BFSI network only._