# Userscripts + TS + Vite

Take this as a template for creating userscripts with TypeScript.

Including tests (in TypeScript) with Jest.

Served by Vite.

## Run dev server
It contains all GM_* grants
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

Setting up TLS (optional)

Create certificates:
```
step ca certificate --not-after=$((7*24))h m75q.lan m75q.crt m75q.key --provisioner 'myCA@home' --password-file ~/.step/pass/provisioner_pass.txt
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
...
});
```
If needed, renew the certificate with
```
step ca renew m75q.crt m75q.key
```
Check validity of the certificates with
```
openssl x509 -in m75q.crt -enddate -noout
```

## Tests

Tests are written in TypeScript in tests/

Jest expects names like *.test.tsa

```
npm run test
```