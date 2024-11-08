# SponsiFy

[![NPM version](https://img.shields.io/npm/v/sponsify?color=a1b858&label=)](https://www.npmjs.com/package/sponsify)

Toolkit for fetching sponsors info and generating sponsors images.

Supports:

- [**GitHub Sponsors**](https://github.com/sponsors)
- [**Patreon**](https://www.patreon.com/)
- [**OpenCollective**](https://opencollective.com/)
- [**Afdian**](https://afdian.net/)
- [**Polar**](https://polar.sh/)

## Usage

Create `.env` file with:

```ini
; GitHub provider.
; Token requires the `read:user` and `read:org` scopes.
SPONSIFY_GITHUB_TOKEN=
SPONSIFY_GITHUB_LOGIN=

; Patreon provider.
; Create v2 API key at https://www.patreon.com/portal/registration/register-clients
; and use the "Creator’s Access Token".
SPONSIFY_PATREON_TOKEN=

; OpenCollective provider.
; Create an API key at https://opencollective.com/applications
SPONSIFY_OPENCOLLECTIVE_KEY=
; and provide the ID, slug or GitHub handle of your account.
SPONSIFY_OPENCOLLECTIVE_ID=
; or
SPONSIFY_OPENCOLLECTIVE_SLUG=
; or
SPONSIFY_OPENCOLLECTIVE_GH_HANDLE=
; If it is a personal account, set it to `person`. Otherwise not set or set to `collective`
SPONSIFY_OPENCOLLECTIVE_TYPE=

; Afdian provider.
; Get user_id at https://afdian.net/dashboard/dev
SPONSIFY_AFDIAN_USER_ID=
; Create token at https://afdian.net/dashboard/dev
SPONSIFY_AFDIAN_TOKEN=

; Polar provider.
; Get your token at https://polar.sh/settings
SPONSIFY_POLAR_TOKEN=
; The name of the organization to fetch sponsorships from.
SPONSIFY_POLAR_ORGANIZATION=
```

> Only one provider is required to be configured.

Run:

```base
npx sponsify
```

[Example Setup](./example/) | [GitHub Actions Setup](https://github.com/khulnasoft-bot/static/blob/master/.github/workflows/scheduler.yml) | [Generated SVG](https://cdn.jsdelivr.net/gh/khulnasoft/static/sponsors.svg)

### Configurations

Create `sponsify.config.js` file with:

```ts
import { defineConfig, tierPresets } from 'sponsify'

export default defineConfig({
  // Providers configs
  github: {
    login: 'khulnasoft',
    type: 'user',
  },
  opencollective: {
    // ...
  },
  patreon: {
    // ...
  },
  afdian: {
    // ...
  },
  polar: {
    // ...
  },

  // Rendering configs
  width: 800,
  renderer: 'tiers', // or 'circles'
  formats: ['json', 'svg', 'png', 'webp'],
  tiers: [
    // Past sponsors, currently only supports GitHub
    {
      title: 'Past Sponsors',
      monthlyDollars: -1,
      preset: tierPresets.xs,
    },
    // Default tier
    {
      title: 'Backers',
      preset: tierPresets.base,
    },
    {
      title: 'Sponsors',
      monthlyDollars: 10,
      preset: tierPresets.medium,
    },
    {
      title: 'Silver Sponsors',
      monthlyDollars: 50,
      preset: tierPresets.large,
    },
    {
      title: 'Gold Sponsors',
      monthlyDollars: 100,
      preset: tierPresets.xl,
    },
  ],
})
```

Also check [the example](./example/).

### Programmatic Utilities

You can also use SponsiFy programmatically:

```ts
import { fetchSponsors } from 'sponsify'

const sponsors = await fetchSponsors({
  github: {
    token,
    login,
  },
  // ...
})
```

Check the type definition or source code for more utils available.

### Renderers

We provide two renderers built-in:

- `tiers`: Render sponsors in tiers.
- `circles`: Render sponsors in packed circles.

#### Tiers Renderer

```ts
export default defineConfig({
  renderer: 'tiers',
  // ...
})
```

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/khulnasoft/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/khulnasoft/static/sponsors.svg'/>
  </a>
</p>

#### Circles Renderer

```ts
export default defineConfig({
  renderer: 'circles',
  // ...
})
```

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/khulnasoft/static/sponsors.circles.svg">
    <img src='https://cdn.jsdelivr.net/gh/khulnasoft/static/sponsors.circles.svg'/>
  </a>
</p>

### Multiple Renders

We also support rendering multiple images at once with different configurations, via `renders` field:

```ts
import { defineConfig, tierPresets } from 'sponsify'

export default defineConfig({
  // Providers configs
  github: { /* ... */ },

  // Default configs
  width: 800,
  tiers: [
    /* ... */
  ],

  // Define multiple renders, each will inherit the top-level configs
  renders: [
    {
      name: 'sponsors.tiers',
      formats: ['svg'],
    },
    {
      name: 'sponsors.wide',
      width: 1200,
    },
    {
      name: 'sponsors.circles',
      renderer: 'circles',
      width: 600,
    },
    // ...
  ],
})
```

## License

[MIT](./LICENSE) License © 2022 [Md Sulaiman](https://github.com/khulnasoft-bot)
