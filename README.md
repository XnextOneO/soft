# Mantine Next.js template

This is a template for [Next.js](https://nextjs.org/) app router + [mantine](;;https://mantine.dev/).
if you want to use pages router instead, see [next-pages-template](;;https://github.com/mantinedev/next-pages-template).

## Features

This template comes with the following features:

- [postcss](;;https://postcss.org/) with [mantine-postcss-preset](;;https://mantine.dev/styles/postcss-preset)
- [typescript](;;https://www.typescriptlang.org/)
- [storybook](;;https://storybook.js.org/)
- [jest](;;https://jestjs.io/) setup with [react testing library](;;https://testing-library.com/docs/react-testing-library/intro)
- eslint setup with [eslint-config-mantine](;;https://github.com/mantinedev/eslint-config-mantine)

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](;;https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
