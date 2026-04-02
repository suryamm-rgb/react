## 🚀 Navigation in Next.js

### 📁 File-Based Routing System

Next.js uses a **file-based routing system**, where the structure of your `app/` or `pages/` directory defines the routes of your application.

#### ✅ Types of Routes

- **Root Routes**
  - Example: `/` → `app/page.tsx`

- **Nested Routes**
  - Create folders inside `app/`
  - Example: `/dashboard` → `app/dashboard/page.tsx`

- **Dynamic Routes**
  - Used for dynamic data like user profiles
  - Example: `/users/1`, `/users/2`
  - File: `app/users/[id]/page.tsx`

- **Catch-All Routes**
  - Handles multiple segments
  - Example: `/docs/a/b/c`
  - File: `app/docs/[...slug]/page.tsx`

#### 👤 Example: Users Route

- `/users` → List of users
- `/users/[id]` → Individual user details

#### 🔄 Navigation Behavior

- Users can:
  - Click on links to navigate
  - Be redirected after actions (e.g., login, form submit)

---

## 🎯 UI Navigation

### 🔗 Link Component

For **client-side navigation**, Next.js provides the `<Link>` component.

#### 📌 Key Points

- Extends the native HTML `<a>` tag
- Enables **fast navigation without full page reload**
- Prefetches pages in the background for better performance

#### ✅ Example Usage

```jsx
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/about">Go to About</Link>
    </div>
  );
}
```

## ⚡ Benefits

- Faster navigation (no full reload)
- Better user experience
- Built-in prefetching

## 🔗 Active Link in Next.js

### 📌 What?

Active Link means **highlighting the current page link** in navigation.

Example:

- If user is on `/login`
- Then "Login" link will look different (bold/color)

---

### ❓ Why?

- Helps users know **which page they are on**
- Improves **user experience (UX)**
- Makes navigation **clear and easy**

---

### ⚙️ How to Use?

1. Use `usePathname()` from `next/navigation`
2. Get current URL path
3. Compare it with link `href`
4. Apply different styles if matched

---

### ✅ Example

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div>
      <Link
        href="/login"
        className={pathname === "/login" ? "font-bold" : "text-blue-500"}
      >
        Login
      </Link>

      <Link
        href="/register"
        className={pathname === "/register" ? "font-bold" : "text-blue-500"}
      >
        Register
      </Link>
    </div>
  );
}
```

## 🔗 params & searchParams in Next.js

---

### 📌 What?

#### 🔹 params

- Contains **dynamic route values**
- Comes from folder name like `[id]`

👉 Example:
URL → `/articles/123`  
`params = { articleId: "123" }`

---

#### 🔹 searchParams

- Contains **query parameters** from URL
- Comes after `?`

👉 Example:
URL → `/articles/123?lang=en`  
`searchParams = { lang: "en" }`

---

### ❓ Why?

- To build **dynamic pages**
- To pass **data through URL**
- To support features like:
  - language selection 🌍
  - filters & sorting 🔍
  - pagination 📄

---

### ⚙️ How to Use?

#### ✅ In Server Component (Recommended)

```tsx
export default function Page({ params, searchParams }) {
  const { articleId } = params;
  const lang = searchParams?.lang || "en";

  return (
    <div>
      {articleId} - {lang}
    </div>
  );
}
```
