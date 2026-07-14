import type { Config } from "tailwindcss";

const preset = require("@imeek/ui/tailwind-preset.js");

const config: Config = {
  presets: [preset],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  theme: { extend: {} },
  plugins: []
};

export default config;
