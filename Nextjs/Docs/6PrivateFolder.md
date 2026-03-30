### Private folder

- A way to tell Next.js, "Hey, this folder is just for internal stuff - don't include it in the routing system"
- The folder and all the its subfolders are excluded from routing
- Add an underscore at the start of the folder name

#### Private folders contd.

- Private folders are super useful for a bunch of things:
- Keeping your UI logic separate from routing logic
- Having a consistent way to organize internal files in your project
- Making it easier to group related files in your code editor
- Avoiding potential naming conflicts with future Next.js file naming conventions

# 📁 Next.js Private Folders Guide

## 🔒 What is a Private Folder?

In Next.js (App Router), a **private folder** is a folder that is **excluded from the routing system**.

It tells Next.js:

> "This folder is only for internal project structure — do not treat it as a route."

---

## ⚙️ How to Create a Private Folder

To create a private folder, simply prefix the folder name with an underscore `_`.

### ✅ Example:

```
app/
│
├── page.tsx
├── _lib/
│   ├── utils.ts
│   ├── api.ts
│   └── helpers.ts
```

- `_lib` is a **private folder**
- It will **NOT generate a route**
- It is used only for internal logic

---

## 🚫 What Happens Without `_`?

If you create a normal folder:

```
app/lib/page.tsx
```

👉 This becomes a route:

```
/lib
```

---

## ✅ What Happens With `_`?

```
app/_lib/page.tsx
```

👉 This **will NOT** create any route.

---

## 🎯 Use Cases of Private Folders

Private folders are extremely useful for:

### 1. 🧠 Separating Logic from UI

Keep business logic separate from route components.

```
app/
├── dashboard/
│   ├── page.tsx
│   └── _components/
│       └── Chart.tsx
```

---

### 2. 📦 Organizing Internal Utilities

Store helper functions, API logic, or constants.

```
app/_lib/
├── fetchData.ts
├── auth.ts
└── constants.ts
```

---

### 3. 🧩 Grouping Related Files

Helps keep your project clean and scalable.

```
app/profile/
├── page.tsx
├── _components/
│   ├── ProfileCard.tsx
│   └── EditForm.tsx
```

---

### 4. 🚀 Avoid Future Naming Conflicts

Prevents clashes with future Next.js reserved filenames.

---

## 🛠 Example Code

### `_lib/utils.ts`

```ts
export function formatDate(date: Date) {
  return date.toLocaleDateString();
}
```

---

### `app/page.tsx`

```tsx
import { formatDate } from "./_lib/utils";

export default function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>Today: {formatDate(new Date())}</p>
    </div>
  );
}
```

---

## 🧠 Key Points to Remember

- Prefix folder with `_` → **Not part of routing**
- Works only inside **App Router (`app/`)**
- Useful for:
  - Utilities
  - Components
  - Hooks
  - API logic

---

## 📌 Summary

| Feature           | Normal Folder | Private Folder (`_`) |
| ----------------- | ------------- | -------------------- |
| Creates Route     | ✅ Yes        | ❌ No                |
| Used for UI Pages | ✅ Yes        | ❌ No                |
| Used for Logic    | ⚠️ Sometimes  | ✅ Best Practice     |

---

## Route Groups

- Lets us logically organize our routes and project files without impacting the URL structure
- ** Let's implement authentication routes **
- Register
- Login
- Forgot password

# 📂 Next.js Route Groups Guide

## 🚀 What are Route Groups?

**Route Groups** in Next.js allow you to:

> Organize routes and project files logically **without affecting the URL structure**

---

## ⚙️ How Route Groups Work

To create a route group, wrap the folder name in parentheses:

```bash
(auth)
```

- The folder name is **ignored in the URL**
- Used only for **project structure & organization**

---

## 🧠 Example: Authentication Routes

We want to create:

- Login page → `/login`
- Register page → `/register`
- Forgot Password page → `/forgotpassword`

But organize them inside an `auth` group.

---

## 📁 Folder Structure

```bash
app/
│
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── register/
│   │   └── page.tsx
│   │
│   └── forgotpassword/
│       └── page.tsx
│
├── page.tsx
```

---

## 🌐 Resulting Routes

Even though everything is inside `(auth)`:

| File Path                        | URL               |
| -------------------------------- | ----------------- |
| `(auth)/login/page.tsx`          | `/login`          |
| `(auth)/register/page.tsx`       | `/register`       |
| `(auth)/forgotpassword/page.tsx` | `/forgotpassword` |

👉 Notice:

- `(auth)` **does NOT appear in the URL**

---

## 🎯 Why Use Route Groups?

### 1. 🧩 Clean Project Structure

Group related routes like authentication, dashboard, etc.

---

### 2. 🔐 Better Separation of Concerns

Keep auth-related pages separate from main app pages.

---

### 3. 🎨 Layout Control (Advanced)

You can apply **different layouts** to groups.

```bash
(auth)/layout.tsx
```

---

### 4. 📦 Scalability

Helps when your app grows large.

---

## 🔥 Advanced Example with Layout

```bash
app/
├── (auth)/
│   ├── layout.tsx   ← Auth layout
│   ├── login/
│   ├── register/
│   └── forgotpassword/
```

---

## 🧠 Key Points

- Use `(folderName)` → Route Group
- **Does NOT affect URL**
- Helps in:
  - Organization
  - Layout separation
  - Code maintainability

---

## 📌 Summary

| Feature               | Route Group |
| --------------------- | ----------- |
| Affects URL           | ❌ No       |
| Used for Organization | ✅ Yes      |
| Supports Layouts      | ✅ Yes      |
| Improves Scalability  | ✅ Yes      |

---

## 🎉 Final Tip

Use route groups like:

- `(auth)` → authentication pages
- `(dashboard)` → user dashboard
- `(marketing)` → landing pages

👉 Keeps your Next.js project **clean, scalable, and professional**

---

# Layouts

- Page are route-specific UI components
- A layout is UI that is shared between multiple pages in your app

## How to create layouts

- Default export a React component from a layout.js or layout.tsx file
- That component takes a children prop, which Next.js will populate with your page content
