import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "SIGETIC",
  slug: "sigetic",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.sigetic.app"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundColor: "#ffffff"
    },
    package: "com.sigetic.app",
    versionCode: 1
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      }
    ]
  ],
  experiments: {
    typedRoutes: true
  },
  // 👇 MUY IMPORTANTE: Configuración de EAS
  extra: {
    ...(config?.extra ?? {}),
    eas: {
      ...(config?.extra as any)?.eas,
      projectId: "6d74ecd8-bdf0-4f70-beda-61db0db1cd51",
    },
    // Variables de entorno para la API
    API_URL: process.env.API_URL ?? "https://apisoporteti.cortedelsanta.com/api/v1",
    API_BASE_URL: "https://apisoporteti.cortedelsanta.com/api/v1",
  },
  // Configuración de esquemas de URL para deep linking
  scheme: "sigetic",
  // Configuración de actualizaciones OTA
  updates: {
    url: "https://u.expo.dev/6d74ecd8-bdf0-4f70-beda-61db0db1cd51"
  },
  // Configuración de runtime
  runtimeVersion: {
    policy: "sdkVersion"
  }
});
