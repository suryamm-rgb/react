# 📁 Special Files in Next.js (App Router) — Simple Guide

In Next.js (App Router), certain files have **special meaning**. They automatically control routing, layout, loading, and error handling.

---

## 📄 1. `page.tsx`

👉 This is the **main UI of a route**

- Every folder with `page.tsx` becomes a route
- Example:

  ```
  app/about/page.tsx → /about
  ```

### ✅ Example

```tsx
export default function Page() {
  return <h1>About Page</h1>;
}
```

👉 This renders when user visits `/about`

---

## 🧱 2. `layout.tsx`

👉 Used to create a **shared layout (UI wrapper)**

- Applies to all pages inside the folder
- Common for navbar, sidebar, footer

### ✅ Example

```tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Navbar</h1>
      {children}
    </div>
  );
}
```

👉 All pages inside this folder will have the same layout

---

## 🔁 3. `template.tsx`

👉 Similar to layout, but **re-renders every time**

- Layout → cached
- Template → fresh render on navigation

### ✅ When to use?

- Animations
- Resetting state on page change

---

## 🚫 4. `not-found.tsx`

👉 Custom **404 page**

- Shown when route is not found
- Can also be triggered manually using `notFound()`

### ✅ Example

```tsx
export default function NotFound() {
  return <h1>Page Not Found 😢</h1>;
}
```

---

## ⏳ 5. `loading.tsx`

👉 Shows a **loading UI while page is fetching data**

- Automatically used during async loading

### ✅ Example

```tsx
export default function Loading() {
  return <h1>Loading...</h1>;
}
```

👉 Improves UX (no blank screen)

---

## ❌ 6. `error.tsx`

👉 Handles **runtime errors in UI**

- Works like an error boundary
- Must be a client component (`"use client"`)

### ✅ Example

```tsx
"use client";

export default function Error({ error }: { error: Error }) {
  return <h1>Something went wrong!</h1>;
}
```

---

## 🧠 Quick Summary Table

| File            | Purpose                        |
| --------------- | ------------------------------ |
| `page.tsx`      | Main UI of route               |
| `layout.tsx`    | Shared UI (navbar, footer)     |
| `template.tsx`  | Re-render layout on navigation |
| `not-found.tsx` | Custom 404 page                |
| `loading.tsx`   | Loading UI                     |
| `error.tsx`     | Error handling UI              |

---

## 🏗️ Example Folder Structure

```
app/
 ├── layout.tsx
 ├── page.tsx
 ├── loading.tsx
 ├── error.tsx
 ├── not-found.tsx
 └── about/
      ├── page.tsx
      └── layout.tsx
```

---

## 🎯 Final Idea

👉 These files make Next.js powerful because:

- No manual routing setup needed
- Built-in loading & error handling
- Clean and scalable structure

---
