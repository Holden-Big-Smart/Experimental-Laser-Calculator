import aspectRatioPlugin from '@tailwindcss/aspect-ratio'
import daisyUI from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    aspectRatioPlugin,
    daisyUI
  ],
  daisyui: {
    themes: ["light"],
  },
}
