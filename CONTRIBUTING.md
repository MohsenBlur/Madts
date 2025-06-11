# Contributing

Thank you for helping improve Madts! This document covers a few common conventions used in the repository.

## Branch naming

Use short, descriptive branch names so pull requests are easy to understand. A common pattern is:

```
codex/my-feature
```

Replace `my-feature` with a concise summary of your work.

## Lint rules

Run the linter before submitting a pull request:

```bash
pnpm lint
```

The project uses ESLint with the AirBnB and Prettier configs (see `.eslintrc.cjs`), so please fix any reported issues.

## Commit format

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) style, e.g.

```
feat(canvas): add new drawing tool
fix(ui-kit): correct button color
```

Each commit should state the type (`feat`, `fix`, `chore`, etc.) and a short description.

## Launching Storybook

To preview components locally, run:

```bash
pnpm storybook
```

This starts the Storybook server on `localhost:6006`.
