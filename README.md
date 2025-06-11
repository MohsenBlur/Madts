# Madts
## Math‑Playground

> **An open‑source, interactive whiteboard playground that turns abstract mathematics and geometry into hands‑on fun.**

![banner](docs/banner.png)

[![Build](https://github.com/MohsenBlur/Madts/actions/workflows/ci.yml/badge.svg)](https://github.com/MohsenBlur/Madts/actions/workflows/ci.yml)
[![Deploy](https://vercel.com/button)](https://math-playground.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ What is it?

Math‑Playground is a **Next.js 15** + **TypeScript** monorepo that bundles a whiteboard (powered by `tldraw`) with creative‑coding sketches (`p5.js 2`), letting learners _drag, drop, and play_ their way through core maths topics—no prior knowledge required.

<details>
<summary><strong>Try it in 30 seconds</strong></summary>

```bash
npx create-next-app@latest math-playground --example https://github.com/MohsenBlur/Madts
cd math-playground
pnpm dev # open http://localhost:3000
```

</details>

---

## 🎯 Goals

* **Visual intuition first** – every concept must be *toy‑able* before text appears.
* **Zero friction** – one‑click deploy to Vercel; everything else is `pnpm install && pnpm dev`.
* **Teacher‑friendly** – progress tracking & shareable links for classroom use.
* **Community‑driven** – modular lessons, MDX content, and a public roadmap.

---

## 🏗️ Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Language | **TypeScript 5** | Safer math code & great DX ([Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)) |
| Framework | **Next.js 15** | Hybrid static + SSR, RSC stable, Vercel native ([blog](https://nextjs.org/blog/next-15)) |
| UI / Whiteboard | **tldraw SDK** | Infinite canvas, selection, undo/redo out‑of‑the‑box (<https://tldraw.dev>) |
| Creative Coding | **p5.js 2** | WebGPU‑ready shapes & helpers ([p5 2.0 vision](https://www.davepagurek.com/blog/p5-2.0-philosophy/)) |
| State / Data | React hooks + Context; optional **Supabase** Auth (<https://supabase.com/docs/guides/auth>) |
| Testing | **Vitest** unit + **Playwright** e2e (<https://vitest.dev/guide>, <https://playwright.dev/docs/ci-intro>) |
| Package Mgr | **pnpm** workspaces (<https://pnpm.io/workspaces>) |

---

## 📂 Repository Layout

```
math-playground/
├─ apps/site/              # Next.js 15 app (RSC, routes, pages)
├─ packages/canvas-core/   # Geometry utils & tldraw bindings
├─ packages/demos/         # One folder per math concept (MDX + React)
├─ packages/ui-kit/        # shadcn/ui components, icons, hooks
├─ docs/                   # Documentation site (static MDX)
├─ .github/workflows/      # CI & CD pipelines
└─ README.md
```

> **Tip:** each lesson lives beside its MDX narrative so contributors can edit prose *and* code in a single PR.

---

## 🚀 Quick Start

1. **Clone & install**
   ```bash
   git clone https://github.com/MohsenBlur/Madts.git
   cd math-playground
   pnpm install
   ```
2. **Run locally**
   ```bash
   pnpm dev   # localhost:3000
   ```
3. **Open** <http://localhost:3000> and drag out a *Square Builder*—area & perimeter update live.
4. **Deploy**
   * Click the **Vercel** button above and follow the prompts (free tier OK).
   * In your repository settings add `VERCEL_PROJECT_ID` and `VERCEL_ORG_ID` as
     secrets so GitHub Actions can trigger preview and production deployments.

---

## 🗺️ Roadmap

| Week | Milestone | Description |
|------|-----------|-------------|
| 0 | **Scope & personas** | Learner archetypes + concept map |
| 1 | **Stack, repo, CI** | Next.js 15 skeleton, tldraw added, GitHub Actions → Vercel Preview |
| 2 | **Prototype: Hello Shapes** | First interactive demo in production |
| 3‑6 | **Core modules** | Transformations · Trig Explorer · Conic Sections · Vectors |
| 7 | **Gamification layer** | Badges, streaks, share‑link snapshots |
| 8 | **Testing & QA** | Vitest coverage, Playwright visual regression |
| 9 | **Launch 0.1.0** | Public Discussions, Dev.to announcement |

See [`ROADMAP.md`](docs/ROADMAP.md) for the living board.

---

## 🧩 Adding a New Lesson

1. **Generate a package**
   ```bash
   pnpm dlx turbo gen lesson <slug>
   ```
2. **Edit `packages/demos/<slug>/index.mdx`**
   * Import `CanvasLesson` from `canvas-core`.
   * Write explanatory prose in MDX front‑matter.
3. **Run local storybook** *(optional)*
   ```bash
   pnpm storybook
   ```
4. **Open a PR** – the CI will lint, type‑check, unit‑test, run e2e, and deploy a Vercel preview for review.

---

## 🤝 Contributing

We love help!

* **Good first issues** are labelled on GitHub.
* Follow the style guide (`eslint`, `prettier`, `commitlint`).
* All code and docs are MIT‑licensed; by submitting a PR you agree to license your contribution under MIT.

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before diving in.

---

## 🔒 License

This project is released under the [MIT License](LICENSE).

---

## 🌐 Further Reading & Resources

* **TypeScript Handbook** – <https://www.typescriptlang.org/docs/handbook/intro.html>
* **Next.js 15 announcement** – <https://nextjs.org/blog/next-15>
* **tldraw SDK docs** – <https://tldraw.dev>
* **p5.js 2 design goals** – <https://www.davepagurek.com/blog/p5-2.0-philosophy/>
* **pnpm workspaces** – <https://pnpm.io/workspaces>
* **Vitest guide** – <https://vitest.dev/guide>
* **Playwright CI** – <https://playwright.dev/docs/ci-intro>
* **Supabase Auth** – <https://supabase.com/docs/guides/auth>

---

> _“If a concept isn’t toy‑able, rethink the interaction before adding text.” – Design rule #1_
