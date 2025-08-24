import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://crossbone.cc",
  integrations: [mdx(), preact()],

  vite: {
    plugins: [tailwindcss()],
  },
});