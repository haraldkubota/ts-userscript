import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";
import fs from "node:fs";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "m75q.lan",
    port: 6443,
    https: {
      key: fs.readFileSync("m75q.key"),
      cert: fs.readFileSync("m75q.crt"),
    },
  },
  plugins: [
    monkey({
      entry: "src/xkcd.ts",
      userscript: {
        name: "Display XKCD IMG title",
        icon: "https://vitejs.dev/logo.svg",
        namespace: "https://hkubota.wordpress.com/2021/09/04/xkcd-userscript/",
        match: ["http*://*xkcd.com/*"],
        author: "Harald Kubota",
        version: "0.4.2",
        description: "Show the IMG title and Explain XKCD Link",
      },
    }),
  ],
});
