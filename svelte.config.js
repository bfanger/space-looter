import { execSync } from "node:child_process";
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    version: { name: execSync("git rev-parse HEAD || date").toString().trim() },
  },
  vitePlugin: { inspector: { holdMode: true } },
};
