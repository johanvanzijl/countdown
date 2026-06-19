# Countdown Timer

A simple fullscreen countdown timer built with Next.js. It is designed for situations where you want a large, easy-to-read timer on screen with minimal controls.

## Purpose

This application provides:

- A prominent `HH:MM:SS` countdown display
- A fast start/stop workflow with a single clear action
- A warning state when the timer is running low
- A finished state that flashes the timer and plays `public/classic-alarm.wav`

When the timer reaches zero, the display flashes and the alarm loops until `Stop` is pressed. `Clear` resets the timer back to its original duration.

## Duration From The URL

The timer duration is configured through the query string:

- `?minutes=15`
- `?duration=15`

If no valid value is provided, the app defaults to `15` minutes.

Examples:

```text
http://localhost:3000/?minutes=5
http://localhost:3000/?duration=25
```

## Run Locally

Install dependencies:

```bash
yarn install
yarn prepare
```

Start the development server:

```bash
yarn dev
```

Then open `http://localhost:3000`.

## Scripts

| Command              | Description                           |
| -------------------- | ------------------------------------- |
| `yarn dev`           | Start the Next.js dev server          |
| `yarn build`         | Build for production                  |
| `yarn build:webpack` | Build with webpack explicitly         |
| `yarn start`         | Start the production server           |
| `yarn typecheck`     | Run TypeScript without emitting files |
| `yarn lint`          | Run ESLint                            |
| `yarn prepare`       | Install Husky hooks                   |

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
