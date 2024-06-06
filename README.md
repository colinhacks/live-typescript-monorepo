Read the [associated blog post](https://colinhacks.com/essays/live-types-typescript-monorepo) for complete information.

# _Live types_ in TypeScript monorepos

In development, your TypeScript code should feel "alive". When you update your code in one file, the effects of that change should propogate to all files that import it.

This is true even for monorepos, where you may not be importing things from a file, but from a local package.

```diff
- import { Fish } from "../pkg-a/index";
+ import { Fish } from "pkg-a"
```

This repo contains a few strategies you can use to make your TypeScript monorepo feel more alive.

## Approaches

Each subdirectory contains a pnpm monorepo (`pnpm-workspace.yaml`) with two packages, `pkg-a` and `pkg-b`. **`pkg-b` has a dependency on `pkg-a`**. Each package has a `tsconfig.json` that extends a `tsconfig.base.json` in the root of the monorepo.

The file structure looks something like this:

```txt
.
├── package.json
├── packages
│   ├── pkg-a
│   │   ├── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── pkg-b
│       ├── index.ts
│       ├── package.json
│       └── tsconfig.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── tsconfig.json
```

Let's break down the approaches. (Refer to the [associated blog post](https://colinhacks.com/essays/live-types-typescript-monorepo) for complete breakdowns.)

### `1. project-references`

Use TypeScript project references to link packages together. This has a lot of downsides and doesn't play nice with `node` or other tooling out of the box.

### `2. publishConfig`

Use `publishConfig` in `package.json` to specify `.ts` file in development and `.js` file in production.

### `3. tsconfig-paths`

Configure `compilerOptions.paths` in `tsconfig.json` to override resolution for local package names.

### `4. custom-conditions`

**Recommended** User-defined conditional export in `package.json#exports` plus `customConditions` in `tsconfig.json`

## Usage

To play around with a particular approach, clone this repo and navigate to the appropriate subdirectory.

```sh
$ gh repo clone colinhacks/live-typescript-monorepo
$ cd live-typescript-monorepo
$ cd <subdir>  # tsconfig-paths, publishconfig, project-references, custom-conditions
```

Then run the following commands:

```sh
$ pnpm i                  # install
$ code .                  # open in VS Code
```

Once the project is open in VS Code, open `packages/pkg-a/index.ts` and `packages/pkg-b/index.ts`. When you change the definition of `Fish` in `pkg-a`, those changes should propagate immediately to `pkg-b` without a build step.

Each subdirectory also contains a `"test"` script that executes `pkg-b/index.ts`. (This won't work in `project-references`.) This should execute the latest `.ts` files for both `pkg-a` and `pkg-b`! Make some changes and see the effects.

```ts
pnpm test
```

Happy monorepo hacking!
