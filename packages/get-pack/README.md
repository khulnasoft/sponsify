# install-pkg

[![NPM version](https://img.shields.io/npm/v/@khulnasoft/get-pkg?color=a1b858&label=)](https://www.npmjs.com/package/@khulnasoft/get-pkg)

Install package programmatically. Detect package managers automatically (`npm`, `yarn`, `bun` and `pnpm`).

```bash
npm i @khulnasoft/get-pkg
```

```ts
import { installPackage } from "@khulnasoft/get-pkg";

await installPackage("vite", { silent: true });
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/khulnasoft/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/khulnasoft/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2021 [Md Sulaiman](https://github.com/khulnasoft)
