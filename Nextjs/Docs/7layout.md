# 🧩 Next.js Layouts Guide

## 📌 What are Layouts?

In Next.js (App Router):

- **Pages** → Route-specific UI
- **Layouts** → Shared UI across multiple pages

👉 A **layout** allows you to reuse UI like:

- Navbar
- Sidebar
- Footer
- Wrappers (containers, themes)

---

## 🚀 Why Use Layouts?

Layouts help you:

- 🔁 Avoid repeating UI code
- 🧱 Maintain consistent design
- ⚡ Improve scalability of your app
- 🎯 Separate structure from page logic

---

## ⚙️ How to Create a Layout

To create a layout:

1. Create a file named:

```bash id="q0k2lu"
layout.tsx
```

2. Default export a React component

3. Accept a `children` prop

---

## 🛠 Basic Example

### 📁 Folder Structure

```bash id="qth72s"
app/
│
├── layout.tsx
├── page.tsx
```

---

### 🧩 `app/layout.tsx`

```tsx id="9w1wdf"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <header>Navbar</header>

        <main>{children}</main>

        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

---

### 📄 `app/page.tsx`

```tsx id="y0vqdf"
export default function HomePage() {
  return <h1>Home Page</h1>;
}
```

---

## 🌐 Output

All pages will render inside the layout:

```bash id="m6pvd6"
Navbar
-------
Home Page
-------
Footer
```

---

## 🧠 Key Concept: `children`

- `children` represents the **page content**
- Next.js automatically injects the page into the layout

---

## 🧩 Nested Layouts

Layouts can be **nested** inside folders.

---

### 📁 Example

```bash id="ry2mgg"
app/
├── layout.tsx          ← Root layout
│
├── dashboard/
│   ├── layout.tsx      ← Dashboard layout
│   └── page.tsx
```

---

### 🔄 Behavior

- Root layout wraps everything
- Nested layout wraps only its folder

---

### 🧩 `dashboard/layout.tsx`

```tsx id="7gmqsl"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <aside>Sidebar</aside>
      <section>{children}</section>
    </div>
  );
}
```

---

## 🎯 Layout with Route Groups

You can combine layouts with route groups:

```bash id="rpfgnr"
app/
├── (auth)/
│   ├── layout.tsx
│   ├── login/
│   ├── register/
```

👉 This lets you apply a **special layout only for auth pages**

---

## 🔐 Example: Auth Layout

```tsx id="pr1zqv"
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2>Authentication</h2>
      {children}
    </div>
  );
}
```

---

## 🧠 Key Points

- `layout.tsx` defines shared UI
- Must export a **default React component**
- Must accept `children`
- Supports **nesting**
- Works perfectly with **Route Groups**

---

## ⚠️ Important Notes

- Layouts are **persistent** (they don’t re-render on navigation)
- Good for:
  - Navigation bars
  - Sidebars
  - Global wrappers

---

## 📌 Summary

| Feature                 | Layout |
| ----------------------- | ------ |
| Shared UI               | ✅ Yes |
| Route-specific          | ❌ No  |
| Uses `children`         | ✅ Yes |
| Supports nesting        | ✅ Yes |
| Works with route groups | ✅ Yes |

---

## 🎉 Final Tip

Use layouts strategically:

- Root layout → Global UI
- `(auth)/layout.tsx` → Auth pages
- `dashboard/layout.tsx` → Dashboard UI

👉 This makes your app **clean, modular, and scalable**

---

# 🧩 Next.js Nested Layouts Guide

## 📌 What are Nested Layouts?

**Nested layouts** allow you to define layouts at different levels of your app.

👉 Each layout wraps only the routes inside its folder.

---

## 🧠 Concept

- Root layout → applies to entire app
- Nested layout → applies only to a specific section

👉 Layouts are layered (wrapped inside each other)

---

## 📁 Folder Structure Example

```bash
app/
│
├── layout.tsx              ← Root Layout
├── page.tsx
│
├── dashboard/
│   ├── layout.tsx          ← Nested Layout
│   ├── page.tsx
│   └── settings/
│       └── page.tsx
```

---

## 🔄 How It Works

### Route: `/dashboard`

Rendered UI:

```bash
Root Layout
   ↓
Dashboard Layout
   ↓
Dashboard Page
```

---

### Route: `/dashboard/settings`

Rendered UI:

```bash
Root Layout
   ↓
Dashboard Layout
   ↓
Settings Page
```

---

## 🛠 Example Code

### 🌍 Root Layout (`app/layout.tsx`)

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>Global Navbar</header>
        {children}
      </body>
    </html>
  );
}
```

---

### 📊 Dashboard Layout (`app/dashboard/layout.tsx`)

```tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <aside>Sidebar</aside>
      <main>{children}</main>
    </div>
  );
}
```

---

### 📄 Dashboard Page (`app/dashboard/page.tsx`)

```tsx
export default function DashboardPage() {
  return <h1>Dashboard</h1>;
}
```

---

### ⚙️ Settings Page (`app/dashboard/settings/page.tsx`)

```tsx
export default function SettingsPage() {
  return <h1>Settings</h1>;
}
```

---

## 🎯 Benefits of Nested Layouts

### 1. 🧱 Reusability

Reuse layout for a group of pages (like dashboard).

---

### 2. 🎨 Consistent UI

Sidebar, headers remain consistent across related pages.

---

### 3. ⚡ Performance

Layouts do not re-render unnecessarily → faster navigation.

---

### 4. 📦 Scalability

Perfect for large apps (admin panel, dashboards, etc.)

---

## 🔗 Combine with Route Groups

```bash
app/
├── (auth)/
│   ├── layout.tsx
│   ├── login/
│   ├── register/
```

👉 Nested layouts + route groups = 🔥 powerful structure

---

## 🧠 Key Rules

- Each folder can have its own `layout.tsx`
- Layout wraps all pages inside that folder
- Layouts are **nested automatically**
- Always use `children` prop

---

## ⚠️ Important Notes

- Layouts are **persistent**
- Only page content changes during navigation
- Great for:
  - Dashboards
  - Auth sections
  - Admin panels

---

## 📌 Summary

| Level                 | Layout Applied          |
| --------------------- | ----------------------- |
| `/`                   | Root Layout             |
| `/dashboard`          | Root + Dashboard Layout |
| `/dashboard/settings` | Root + Dashboard Layout |

---

## 🎉 Final Tip

Structure your app like this:

- Root layout → Global UI
- Section layout → Feature-specific UI
- Page → Actual content

👉 This makes your app **clean, modular, and scalable**

---

# 🧩 Next.js Multiple Root Layouts Guide

## 📌 What are Multiple Root Layouts?

In Next.js, **Multiple Root Layouts** allow you to define **separate root-level UI structures** for different parts of your application.

👉 This is achieved using **Route Groups**

---

## 🚀 Why Use Multiple Root Layouts?

Sometimes your app needs completely different layouts, such as:

- 🌐 Public website (landing pages)
- 🔐 Authentication pages
- 📊 Dashboard / Admin panel

👉 Each of these can have its **own root layout**

---

## ⚙️ Role of Route Groups

Route Groups help:

- 📂 Organize project structure
- 🚫 Avoid affecting URL paths
- 🎯 Apply layouts to specific sections

---

## 📁 Example Folder Structure

```bash id="n5p0qr"
app/
│
├── (marketing)/
│   ├── layout.tsx       ← Root layout for marketing
│   └── page.tsx
│
├── (auth)/
│   ├── layout.tsx       ← Root layout for auth
│   ├── login/
│   └── register/
│
├── (dashboard)/
│   ├── layout.tsx       ← Root layout for dashboard
│   └── dashboard/
│       └── page.tsx
```

---

## 🌐 Resulting Routes

| File Path                        | URL          |
| -------------------------------- | ------------ |
| `(marketing)/page.tsx`           | `/`          |
| `(auth)/login/page.tsx`          | `/login`     |
| `(auth)/register/page.tsx`       | `/register`  |
| `(dashboard)/dashboard/page.tsx` | `/dashboard` |

👉 Route groups **do not appear in URLs**

---

## 🛠 Example Layouts

---

### 🌍 Marketing Layout

```tsx id="s7k3v6"
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>Public Navbar</header>
        {children}
        <footer>Public Footer</footer>
      </body>
    </html>
  );
}
```

---

### 🔐 Auth Layout

```tsx id="9j7k2x"
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>Auth Layout</div>
        {children}
      </body>
    </html>
  );
}
```

---

### 📊 Dashboard Layout

```tsx id="4h2k9m"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <aside>Sidebar</aside>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

---

## 🧠 Key Rules

- Each route group can have its own `layout.tsx`
- These layouts act as **separate root layouts**
- Route groups `( )` are ignored in URLs
- No single global layout is required if using multiple roots

---

## ⚠️ Important Notes

### ❗ Full Page Reloads

Navigating between different root layouts causes:

👉 Full page reload (not client-side navigation)

---

### ❗ HTML Structure Required

Each root layout must include:

```tsx id="8f3k1p"
<html>
  <body>{children}</body>
</html>
```

---

## 🎯 When to Use

Use multiple root layouts when:

- UI is completely different across sections
- You want strict separation of app parts
- Example:
  - Landing vs Dashboard
  - Auth vs App

---

## 📌 Summary

| Feature                           | Multiple Root Layouts |
| --------------------------------- | --------------------- |
| Uses Route Groups                 | ✅ Yes                |
| Affects URL                       | ❌ No                 |
| Separate UI per section           | ✅ Yes                |
| Causes full reload between groups | ⚠️ Yes                |

---

## 🎉 Final Tip

Use this structure for real-world apps:

- `(marketing)` → Public pages
- `(auth)` → Login/Register
- `(dashboard)` → Logged-in user area

👉 This makes your app **clean, scalable, and production-ready**

---
