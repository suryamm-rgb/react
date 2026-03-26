## Routing

Next.js has a file system based routing system. The URLs you can access in your browser are determined by how you organize your files and folders in your code.

### Routing Conventions

- All routes must live inside the `app` folder
- Route files must be named either `page.js` or `page.tsx`
- Each folder represents a segment of the URL path

### Example

```
app/
├── page.tsx         →  /
├── about/
│   └── page.tsx     →  /about
└── profile/
    └── page.tsx     →  /profile
```

> **Key rule:** A folder alone does not create a route — it must contain a `page.tsx` (or `page.js`) file to be accessible in the browser.

# 🚀 Next.js Nested Routing (App Router)

## 📌 Introduction

Nested routing in Next.js allows you to create routes using the folder structure inside the `app/` directory.

Each folder represents a route, and each `page.tsx` file defines the UI for that route.

---

## 📂 Folder Structure Example

```
app/
│
├── blog/
│   ├── page.tsx          → /blog
│   │
│   ├── first/
│   │   └── page.tsx      → /blog/first
│   │
│   └── second/
│       └── page.tsx      → /blog/second
```

---

## 🌐 Routes Mapping

| Folder Path                | URL Route      |
| -------------------------- | -------------- |
| `app/blog/page.tsx`        | `/blog`        |
| `app/blog/first/page.tsx`  | `/blog/first`  |
| `app/blog/second/page.tsx` | `/blog/second` |

---

## 🧩 Code Examples

### 1️⃣ `/blog` Page

📄 `app/blog/page.tsx`

```tsx
export default function BlogPage() {
  return (
    <div>
      <h1>Blog Home</h1>
      <p>Welcome to the blog page</p>
    </div>
  );
}
```

---

### 2️⃣ `/blog/first` Page

📄 `app/blog/first/page.tsx`

```tsx
export default function FirstBlog() {
  return (
    <div>
      <h1>First Blog</h1>
      <p>This is the first blog post</p>
    </div>
  );
}
```

---

### 3️⃣ `/blog/second` Page

📄 `app/blog/second/page.tsx`

```tsx
export default function SecondBlog() {
  return (
    <div>
      <h1>Second Blog</h1>
      <p>This is the second blog post</p>
    </div>
  );
}
```

---

## 🔗 Navigation (Optional)

You can navigate between pages using `Link`:

```tsx
import Link from "next/link";

export default function BlogPage() {
  return (
    <div>
      <h1>Blog Home</h1>

      <Link href="/blog/first">Go to First Blog</Link>
      <br />

      <Link href="/blog/second">Go to Second Blog</Link>
    </div>
  );
}
```

## ⚡ Summary

- `/blog` → Main blog page
- `/blog/first` → First blog page
- `/blog/second` → Second blog page
- Routing is automatic based on folder structure

# 🚀 Next.js Dynamic Routing (App Router)

## 📌 Introduction

Dynamic routing in Next.js allows you to create routes based on dynamic values like IDs, slugs, or usernames.

Instead of hardcoding routes, you can use **dynamic segments** using square brackets `[]`.

---

## 📂 Folder Structure Example

```bash
app/
├── products/
│   ├── page.tsx                → /products
│   └── [productId]/
│       └── page.tsx            → /products/1, /products/abc
```

---

## 🌐 Route Mapping

| Folder Path                         | URL Example     |
| ----------------------------------- | --------------- |
| `app/products/page.tsx`             | `/products`     |
| `app/products/[productId]/page.tsx` | `/products/1`   |
|                                     | `/products/abc` |

---

## 🧩 Code Implementation

### 1️⃣ Products Page

📄 `app/products/page.tsx`

```tsx
export default function Products() {
  return <h1>Products Page</h1>;
}
```

---

### 2️⃣ Dynamic Product Details Page

📄 `app/products/[productId]/page.tsx`

```tsx
export default function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  return <h1>Product Details page {params.productId}</h1>;
}
```

👉 In Next.js, `params` is **already available synchronously**

---

## ✅ Async Version (Correct Way)

```tsx
export default async function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;

  return <h1>Product Details page {productId}</h1>;
}
```

---

## 🔗 Navigation Example

```tsx
import Link from "next/link";

export default function Products() {
  return (
    <div>
      <h1>Products Page</h1>

      <Link href="/products/1">Product 1</Link>
      <br />

      <Link href="/products/2">Product 2</Link>
    </div>
  );
}
```

---

## ⚡ Summary

- `/products` → Products list page
- `/products/1` → Product details page for ID = 1
- `/products/abc` → Product details page for ID = "abc"

---

## ✅ Best Practices

- Use meaningful dynamic names like `[productId]`, `[slug]`
- Keep logic simple inside page components
- Fetch data using `productId`
- Use async functions only when needed

---
