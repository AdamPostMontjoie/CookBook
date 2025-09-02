const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

// Get the default Metro configuration
const config = getDefaultConfig(__dirname);

// --- Apply Firebase's recommended changes ---
// This is done by modifying the 'config' object directly
config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;

// --- Apply Nativewind's wrapping ---
// This takes the modified 'config' and wraps it with Nativewind's bundler
module.exports = withNativeWind(config, { input: './global.css' });