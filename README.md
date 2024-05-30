Read the [associated blog post](https://colinhacks.com/essays/live-types-typescript-monorepo) for complete information.

# _Live types_ in TypeScript monorepos

In development, your TypeScript code should feel "alive". When you update your code in one file, the effects of that change should propogate to all files that import it.

This is true even for monorepos, where you may not be importing things from a file, but from a local package.

```ts
- import { Fish } from "../pkg-a/index";
+ import { Fish } from "pkg-a"
```

This repo contains a few strategies you can use to make your TypeScript monorepo feel more alive. Each directory contains a monorepo with the following file structure:

```json
.
├── package.json
├── packages
│   ├── pkg-a
│   │   ├── README.md
│   │   ├── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── pkg-b
│       ├── README.md
│       ├── index.ts
│       ├── package.json
│       └── tsconfig.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── tsconfig.json
```

This is a pnpm monorepo (`pnpm-workspace.yaml`) with two packages, `pkg-a` and `pkg-b`. **`pkg-b` has a dependency on `pkg-a`**. Each package has a `tsconfig.json` that extends a `tsconfig.base.json` in the root of the monorepo.

Let's break down the approaches. Refer to the [associated blog post](https://colinhacks.com/essays/live-types-typescript-monorepo) for complete breakdowns. Each of these approaches is demonstrated in the associated subdirectory of this repo.

### `1. custom-conditions`

User-defined conditional export in `package.json#exports` plus `customConditions` in `tsconfig.json`

### `2. tsconfig-paths`

Configure `compilerOptions.paths` in `tsconfig.json` to override resolution for local package names.

### `3. publishConfig`

**Recommended** Use `publishConfig` in `package.json` to specify `.ts` file in development and `.js` file in production.

Happy monorepo hacking!
