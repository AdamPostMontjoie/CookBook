// babel.config.js

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
      
    ],
    plugins: [
      // ADD THIS LINE
      "expo-router/babel",
      "react-native-reanimated/plugin",
    ],
  };
};