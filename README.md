# Userscripts + TS + Vite

```
❯ npm create monkey
✔ Project name: … vite-userscript
✔ Select a framework: › vanilla
✔ Select a variant: › vanilla-ts

Scaffolding project in /home/harald/js/userscript/parcel/vite-userscript...

Done. Now run:

  cd vite-userscript
  npm install
  npm run dev

❯ cd vite-userscript
❯ npm install

added 37 packages, and audited 38 packages in 4s

12 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## Fix build script

Change this line in package.json:
```
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
```
to
```
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
```

## Run dev server
```
npm run dev
```

## Build
```
npm run build
```
and the output is in dist/

## Preview
```
npm run preview
```
lets you install the userscript file as if it were built by "npm run build" (specifically GM_* grants are restricted to what you use)

## TLS

```
step ca certificate --not-after=$((7*24))h m75q.lan m75q.crt m75q.key --provisioner 'myCA' --password-file ~/.step/pass/provisioner.txt
```
and edit vite.config.ts:
```
import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import fs from 'node:fs';

// https://vitejs.dev/config/
export default defineConfig({
 server: {
   host: 'm75q.lan',
   port: 6443,
   https: {
    key: fs.readFileSync('m75q.key'),
    cert: fs.readFileSync('m75q.crt'),
   },
  },
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.google.com/'],
      },
    }),
  ],
});
```
Renew the certificate with
```
step ca renew m75q.crt m75q.key
```
Check validity with
```
openssl x509 -in m75q.crt -enddate -noout
```

## Tests

Tests are written in TypeScript in tests/
Jest expects names like *.test.ts
