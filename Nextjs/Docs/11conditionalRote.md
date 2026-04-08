# Next.js Parallel Routes — Documentation

## What are Parallel Routes?

Parallel routing is an advanced routing mechanism in Next.js that allows you to render multiple pages simultaneously within the same layout. This feature is useful when building dashboards, split views, or complex admin interfaces where different sections of the UI need to load and function independently.

---

## How Parallel Routes Work

Parallel routes in Next.js are defined using a feature known as **slots**.

Slots help organize content in a modular way. Each slot represents a section of the UI that can render its own route independently.

To create a slot, use the `@folder` naming convention.

Example:

```
app/
 ├── layout.tsx
 ├── @users/
 │   └── page.tsx
 ├── @revenue/
 │   └── page.tsx
 └── @notifications/
     └── page.tsx
```

Each defined slot automatically becomes a prop in its corresponding `layout.tsx` file.

---

## Layout Example

```tsx
export default function DashboardLayout({
  users,
  revenue,
  notifications,
}: {
  users: React.ReactNode;
  revenue: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <div>
      <div>{users}</div>
      <div>{revenue}</div>
      <div>{notifications}</div>
    </div>
  );
}
```

Each slot renders independently inside the layout.

---

## Parallel Routes Use Cases

Parallel routes are useful for:

- Dashboards with multiple sections
- Split-view interfaces
- Multi-pane layouts
- Complex admin panels
- Analytics dashboards
- Messaging interfaces

---

## Benefits of Parallel Routes

### 1. Layout Splitting

Parallel routes are great for splitting a layout into manageable slots. Each section can be developed and maintained independently.

### 2. Independent Route Handling

Each slot in your layout (such as users, revenue, and notifications) can handle its own:

- loading.tsx
- error.tsx
- not-found.tsx

This granular control is particularly useful when different sections of the page load at varying speeds or encounter unique errors.

Example:

```
@users/loading.tsx
@revenue/loading.tsx
@notifications/error.tsx
```

Each slot manages its own state.

---

## Sub-navigation in Parallel Routes

Each slot can function as a mini-application, complete with its own:

- Navigation
- State management
- Filters
- Pagination
- Sorting

Users can interact with each section separately without affecting other parts of the page.

For example:

- Users tab can change pages
- Revenue tab can apply filters
- Notifications tab can refresh

All of these work independently.

---

## Example Folder Structure with Sub Navigation

```
app/
 ├── dashboard/
 │   ├── layout.tsx
 │   ├── @users/
 │   │   ├── page.tsx
 │   │   ├── loading.tsx
 │   │   └── error.tsx
 │   ├── @revenue/
 │   │   ├── page.tsx
 │   │   └── loading.tsx
 │   └── @notifications/
 │       └── page.tsx
```

---

## When to Use Parallel Routes

Use parallel routes when:

- You need multiple independent UI sections
- Sections should load separately
- Each section needs its own navigation
- Dashboard-style layouts
- Complex admin interfaces

---

## Key Points to Remember

- Use `@folder` to create slots
- Slots become props in `layout.tsx`
- Each slot renders independently
- Each slot can have its own loading and error UI
- Great for dashboards and admin panels

---

## Summary

Parallel routes allow you to render multiple pages inside the same layout simultaneously. They are implemented using slots (`@folder`) and provide independent loading, navigation, and error handling for each section. This makes them ideal for dashboards, split views, and complex UI layouts.

---

# Conditional Routes in Next.js

## What are Conditional Routes?

Conditional routes allow you to render different UI based on certain conditions, such as authentication status, user role, or feature flags, while keeping the same URL.

For example, you may want to:

- Show a dashboard for authenticated users
- Show a login page for unauthenticated users
- Show admin panel for admin users
- Show upgrade page for free users

Conditional routes help achieve this while maintaining completely separate code paths on the same route.

---

## Example Scenario

Imagine you want to show different content based on whether a user is logged in or not.

- Authenticated user → Dashboard
- Not authenticated → Login page

Both use the same URL: `/dashboard`

---

## Folder Structure Example

```
app/
 └── dashboard/
     ├── page.tsx
     ├── login/
     │   └── page.tsx
     └── main/
         └── page.tsx
```

---

## Basic Conditional Route Example

```tsx
export default function DashboardPage() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <div>Please Login</div>;
  }

  return <div>Dashboard</div>;
}
```

---

## Conditional Routing Using Components

```tsx
import Dashboard from "./main/page";
import Login from "./login/page";

export default function Page() {
  const isLoggedIn = true;

  return isLoggedIn ? <Dashboard /> : <Login />;
}
```

---

## Real Authentication Example (Server Component)

```tsx
import { cookies } from "next/headers";
import Dashboard from "./dashboard";
import Login from "./login";

export default function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return <Login />;
  }

  return <Dashboard />;
}
```

---

## Conditional Routes Use Cases

- Authentication based routing
- Role based routing (admin/user)
- Feature flag rendering
- A/B testing UI
- Subscription based UI (free vs pro)

---

## Benefits of Conditional Routes

### 1. Same URL

You can render different UI while keeping the same route.

### 2. Clean Separation

Login and dashboard logic stay completely separate.

### 3. Better UX

No unnecessary redirects.

### 4. Flexible Logic

You can conditionally render based on:

- authentication
- user role
- permissions
- feature flags

---

# Next.js Parallel Routes — Documentation

## What are Parallel Routes?

Parallel routing is an advanced routing mechanism in Next.js that allows you to render multiple pages simultaneously within the same layout. This feature is useful when building dashboards, split views, or complex admin interfaces where different sections of the UI need to load and function independently.

---

## How Parallel Routes Work

Parallel routes in Next.js are defined using a feature known as **slots**.

Slots help organize content in a modular way. Each slot represents a section of the UI that can render its own route independently.

To create a slot, use the `@folder` naming convention.

Example:

```
app/
 ├── layout.tsx
 ├── @users/
 │   └── page.tsx
 ├── @revenue/
 │   └── page.tsx
 └── @notifications/
     └── page.tsx
```

Each defined slot automatically becomes a prop in its corresponding `layout.tsx` file.

---

## Layout Example

```tsx
export default function DashboardLayout({
  users,
  revenue,
  notifications,
}: {
  users: React.ReactNode;
  revenue: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <div>
      <div>{users}</div>
      <div>{revenue}</div>
      <div>{notifications}</div>
    </div>
  );
}
```

Each slot renders independently inside the layout.

---

## Parallel Routes Use Cases

Parallel routes are useful for:

- Dashboards with multiple sections
- Split-view interfaces
- Multi-pane layouts
- Complex admin panels
- Analytics dashboards
- Messaging interfaces

---

## Benefits of Parallel Routes

### 1. Layout Splitting

Parallel routes are great for splitting a layout into manageable slots. Each section can be developed and maintained independently.

### 2. Independent Route Handling

Each slot in your layout (such as users, revenue, and notifications) can handle its own:

- loading.tsx
- error.tsx
- not-found.tsx

This granular control is particularly useful when different sections of the page load at varying speeds or encounter unique errors.

Example:

```
@users/loading.tsx
@revenue/loading.tsx
@notifications/error.tsx
```

Each slot manages its own state.

---

## Sub-navigation in Parallel Routes

Each slot can function as a mini-application, complete with its own:

- Navigation
- State management
- Filters
- Pagination
- Sorting

Users can interact with each section separately without affecting other parts of the page.

For example:

- Users tab can change pages
- Revenue tab can apply filters
- Notifications tab can refresh

All of these work independently.

---

## Example Folder Structure with Sub Navigation

```
app/
 ├── dashboard/
 │   ├── layout.tsx
 │   ├── @users/
 │   │   ├── page.tsx
 │   │   ├── loading.tsx
 │   │   └── error.tsx
 │   ├── @revenue/
 │   │   ├── page.tsx
 │   │   └── loading.tsx
 │   └── @notifications/
 │       └── page.tsx
```

---

## When to Use Parallel Routes

Use parallel routes when:

- You need multiple independent UI sections
- Sections should load separately
- Each section needs its own navigation
- Dashboard-style layouts
- Complex admin interfaces

---

## Key Points to Remember

- Use `@folder` to create slots
- Slots become props in `layout.tsx`
- Each slot renders independently
- Each slot can have its own loading and error UI
- Great for dashboards and admin panels

---

## Summary

Parallel routes allow you to render multiple pages inside the same layout simultaneously. They are implemented using slots (`@folder`) and provide independent loading, navigation, and error handling for each section. This makes them ideal for dashboards, split views, and complex UI layouts.

---

# Conditional Routes in Next.js

## What are Conditional Routes?

Conditional routes allow you to render different UI based on certain conditions, such as authentication status, user role, or feature flags, while keeping the same URL.

For example, you may want to:

- Show a dashboard for authenticated users
- Show a login page for unauthenticated users
- Show admin panel for admin users
- Show upgrade page for free users

Conditional routes help achieve this while maintaining completely separate code paths on the same route.

---

## Example Scenario

Imagine you want to show different content based on whether a user is logged in or not.

- Authenticated user → Dashboard
- Not authenticated → Login page

Both use the same URL: `/dashboard`

---

## Folder Structure Example

```
app/
 └── dashboard/
     ├── page.tsx
     ├── login/
     │   └── page.tsx
     └── main/
         └── page.tsx
```

---

## Basic Conditional Route Example

```tsx
export default function DashboardPage() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <div>Please Login</div>;
  }

  return <div>Dashboard</div>;
}
```

---

## Conditional Routing Using Components

```tsx
import Dashboard from "./main/page";
import Login from "./login/page";

export default function Page() {
  const isLoggedIn = true;

  return isLoggedIn ? <Dashboard /> : <Login />;
}
```

---

## Real Authentication Example (Server Component)

```tsx
import { cookies } from "next/headers";
import Dashboard from "./dashboard";
import Login from "./login";

export default function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return <Login />;
  }

  return <Dashboard />;
}
```

---

## Conditional Routes Use Cases

- Authentication based routing
- Role based routing (admin/user)
- Feature flag rendering
- A/B testing UI
- Subscription based UI (free vs pro)

---

## Benefits of Conditional Routes

### 1. Same URL

You can render different UI while keeping the same route.

### 2. Clean Separation

Login and dashboard logic stay completely separate.

### 3. Better UX

No unnecessary redirects.

### 4. Flexible Logic

You can conditionally render based on:

- authentication
- user role
- permissions
- feature flags

---

## Summary

Conditional routes allow you to show different content on the same URL based on conditions like authentication or user role. This helps keep code separate while providing a clean and flexible routing experience.

---

# Advanced Routing Patterns in Next.js

Next.js provides advanced routing patterns that help build complex UI layouts and navigation flows.

## Types of Advanced Routing

- Parallel Routes
- Intercepting Routes

### Learning Goals

When working with advanced routing, you should focus on:

1. Understanding the core concepts and conventions
2. Practical implementation
3. Real-world use cases
4. Folder structure patterns

---

# Intercepting Routes

## What are Intercepting Routes?

Intercepting routes are an advanced routing mechanism that allows you to load a route from another part of your application within the current layout.

This is commonly used when you want to show content without leaving the current page context.

For example:

- Open a modal on top of a page
- Preview a product without navigating away
- Open photo gallery overlay
- Login modal on top of dashboard

---

## Example Scenario

You are on:

```
/feed
```

You click on a post:

```
/feed/post/1
```

Instead of navigating to a new page, the post opens as a modal on top of the feed page.

This is achieved using intercepting routes.

---

## Intercepting Route Conventions

Next.js provides special folder conventions:

- `(.)` → same level
- `(..)` → one level up
- `(..)(..)` → two levels up
- `(...)` → from root app folder

These allow you to intercept routes from different locations.

---

## Example Folder Structure

```
app/
 ├── feed/
 │   ├── page.tsx
 │   ├── @modal/
 │   │   └── (..)post/
 │   │       └── [id]/page.tsx
 │
 └── post/
     └── [id]/page.tsx
```

Here:

- `/post/[id]` is the actual route
- `( .. )post` intercepts it
- It renders inside the `feed` layout

---

## Intercepting Routes Use Cases

- Modal routing
- Image preview overlays
- Product quick view
- Login modal
- Side panel navigation
- Drawer based navigation

---

## Benefits of Intercepting Routes

### 1. Preserve Context

Users stay on the same page while viewing new content.

### 2. Better User Experience

No full page navigation.

### 3. Shareable URLs

Modal content still has its own URL.

### 4. Flexible Layout Control

Render content inside modals, drawers, or panels.

---
