// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  // Change the content array to point to your actual code files
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // This line is the fix
  ],
  theme: {
    extend: {
      colors: {
        // India - Saffron, White, and Green
        'india-saffron': '#FF9933',
        'india-green': '#138808',

        // America - Red, White, and Blue
        'america-red': '#BF0A30',
        'america-blue': '#002868',

        // Mexico - Green, White, and Red
        'mexico-green': '#00632E',
        'mexico-red': '#C42B35',

        // France - Blue, White, and Red
        'france-blue': '#002654',
        'france-red': '#EF4135',

        // Italy - Green, White, and Red
        'italy-green': '#008C45',
        'italy-red': '#CD212A',

        // China - Red and Gold
        'china-red': '#EE1C24',
        'china-gold': '#FFCC00',

        // Japan - White and Red
        'japan-red': '#BC002D',

        // Thailand - Red, White, and Blue
        'thailand-red': '#A51931',
        'thailand-blue': '#2D2A4A',

        // Greece - Blue and White
        'greece-blue': '#0054A3',

        // Turkey - Red and White
        'turkey-red': '#E30A17',

        // Vietnam - Red and Gold
        'vietnam-red': '#DA251D',
        'vietnam-gold': '#FFCC00',

        // Brazil - Green, Yellow, Blue
        'brazil-green': '#009B3A',
        'brazil-yellow': '#FFDF00',
        'brazil-blue': '#002776',
      },
    },
  },
  plugins: [],
}