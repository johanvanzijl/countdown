# 🧰 Consnet - Next.js 16 Template

A production-ready **Next.js 16 + TypeScript** baseline for new projects.  
Pre-configured with **Yarn 4 (Berry)**, **Tailwind CSS v4**, **ESLint + Prettier**, and **Husky + lint-staged**.

---

## 🚀 Features

- **Next.js 16 App Router** with TypeScript strict mode
- **Yarn 4 (Berry)** package manager
- **Tailwind CSS v4** for utility-first styling
- **ESLint + Prettier** with Next.js Core Web Vitals rules
- **Husky v9 + lint-staged** pre-commit hooks
- **Turbopack** and **React Compiler** enabled
- Ready for **CI/CD** and GitHub Actions lint checks

---

## 🧩 Getting Started

### 1. Create a new project from this template

Click **“Use this template”** on GitHub  
or use the CLI:

```bash
gh repo create my-new-project --template consnet/next16-template
cd my-new-project
```

### 2. Install dependencies

It is important to run yarn install and yarn prepare to ensure that dependencies and husky hooks are installed correctly.

```bash
yarn install
yarn prepare
```

### 3. Run locally

```bash
yarn dev
```

## ⚙️ Scripts

| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `yarn dev`          | Start the Next.js dev server            |
| `yarn build`        | Build for production                    |
| `yarn start`        | Start the production server             |
| `yarn lint`         | Run ESLint                              |
| `yarn lint:fix`     | Auto-fix lint errors                    |
| `yarn format`       | Check Prettier formatting               |
| `yarn format:write` | Format all files                        |
| `yarn prepare`      | Install Husky hooks                     |
| `yarn lint-staged`  | Run staged file linting (used by Husky) |

## 🧼 Hooks

### Pre-commit

Husky automatically runs `lint-staged` before each commit to:

- Fix lint errors (eslint --fix)
- Format code (prettier --write)

You can edit the commands inside .lintstagedrc.json if needed.

### Pre-push

Husky will run `yarn build` to ensure successful build before pushing to GH.
