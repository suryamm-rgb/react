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
