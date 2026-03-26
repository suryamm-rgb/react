# 🚀 Next.js Installation (Step-by-Step Guide)

_Last updated: March 20, 2026_

---

## 📌 Quick Start

Create a new Next.js app and run it locally:

```bash
pnpm create next-app@latest my-app --yes
cd my-app
pnpm dev
```

👉 Open in browser: http://localhost:3000

> `--yes` uses default setup (TypeScript, Tailwind CSS, ESLint, App Router, Turbopack)

---

## 🧠 System Requirements

- Node.js ≥ 20.9
- OS: macOS, Windows (WSL), Linux

---

## 🌐 Supported Browsers

- Chrome 111+
- Edge 111+
- Firefox 111+
- Safari 16.4+

---

## ⚙️ Create Project (CLI Method)

Run:

```bash
pnpm create next-app
```

### During Setup, You’ll Be Asked:

- Project name
- TypeScript → Yes / No
- Linter → ESLint / Biome
- Tailwind CSS → Yes / No
- App Router → Yes (recommended)
- Import alias → @/\*
- Include AGENTS.md → Yes / No

---

## 📦 Manual Installation

```bash
pnpm i next@latest react@latest react-dom@latest
```

### Add Scripts in `package.json`

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "lint:fix": "eslint --fix"
}
```

---

## 📁 App Directory Setup

Create folder:

```
app/
```

### Create Root Layout

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

### Create Home Page

```tsx
export default function Page() {
  return <h1>Hello, Next.js!</h1>;
}
```

---

## 🖼️ Public Folder (Optional)

Create:

```
public/
```

Example usage:

```tsx
import Image from "next/image";

export default function Page() {
  return <Image src="/profile.png" alt="Profile" width={100} height={100} />;
}
```

---

## ▶️ Run Development Server

```bash
npm run dev
```

👉 Visit: http://localhost:3000

---

## 🧩 TypeScript Setup

- Rename files to `.ts` or `.tsx`
- Next.js auto-configures TypeScript

---

## 🔍 Linting Setup

### ESLint

```bash
npm run lint
```

### Biome (Optional)

```bash
npm run format
```

---

## 🔗 Absolute Imports

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "src/",
    "paths": {
      "@/components/*": ["components/*"]
    }
  }
}
```

---

## 🎉 Done!

Your Next.js app is successfully installed and running 🚀
