# Project Structure and Organization
*Last updated March 20, 2026*

This page provides an overview of all the folder and file conventions in Next.js, and recommendations for organizing your project.

---

## Folder and File Conventions

### Top-level Folders

Top-level folders are used to organize your application's code and static assets.

| Folder | Description |
|--------|-------------|
| `app` | App Router |
| `pages` | Pages Router |
| `public` | Static assets to be served |
| `src` | Optional application source folder |

### Top-level Files

Top-level files are used to configure your application, manage dependencies, run proxy, integrate monitoring tools, and define environment variables.

| File | Description |
|------|-------------|
| `next.config.js` | Configuration file for Next.js |
| `package.json` | Project dependencies and scripts |
| `instrumentation.ts` | OpenTelemetry and Instrumentation file |
| `proxy.ts` | Next.js request proxy |
| `.env` | Environment variables (should not be tracked by version control) |
| `.env.local` | Local environment variables (should not be tracked by version control) |
| `.env.production` | Production environment variables (should not be tracked by version control) |
| `.env.development` | Development environment variables (should not be tracked by version control) |
| `eslint.config.mjs` | Configuration file for ESLint |
| `.gitignore` | Git files and folders to ignore |
| `next-env.d.ts` | TypeScript declaration file for Next.js (should not be tracked by version control) |
| `tsconfig.json` | Configuration file for TypeScript |
| `jsconfig.json` | Configuration file for JavaScript |

### Routing Files

Add `page` to expose a route, `layout` for shared UI such as header, nav, or footer, `loading` for skeletons, `error` for error boundaries, and `route` for APIs.

| File | Extensions | Description |
|------|------------|-------------|
| `layout` | `.js .jsx .tsx` | Layout |
| `page` | `.js .jsx .tsx` | Page |
| `loading` | `.js .jsx .tsx` | Loading UI |
| `not-found` | `.js .jsx .tsx` | Not found UI |
| `error` | `.js .jsx .tsx` | Error UI |
| `global-error` | `.js .jsx .tsx` | Global error UI |
| `route` | `.js .ts` | API endpoint |
| `template` | `.js .jsx .tsx` | Re-rendered layout |
| `default` | `.js .jsx .tsx` | Parallel route fallback page |

---

## Nested Routes

Folders define URL segments. Nesting folders nests segments. Layouts at any level wrap their child segments. A route becomes public when a `page` or `route` file exists.

| Path | URL Pattern | Notes |
|------|-------------|-------|
| `app/layout.tsx` | — | Root layout wraps all routes |
| `app/blog/layout.tsx` | — | Wraps `/blog` and descendants |
| `app/page.tsx` | `/` | Public route |
| `app/blog/page.tsx` | `/blog` | Public route |
| `app/blog/authors/page.tsx` | `/blog/authors` | Public route |

---

## Dynamic Routes

Parameterize segments with square brackets. Use `[segment]` for a single param, `[...segment]` for catch-all, and `[[...segment]]` for optional catch-all. Access values via the `params` prop.

| Path | URL Pattern |
|------|-------------|
| `app/blog/[slug]/page.tsx` | `/blog/my-first-post` |
| `app/shop/[...slug]/page.tsx` | `/shop/clothing`, `/shop/clothing/shirts` |
| `app/docs/[[...slug]]/page.tsx` | `/docs`, `/docs/layouts-and-pages`, `/docs/api-reference/use-router` |

---

## Route Groups and Private Folders

Organize code without changing URLs with route groups `(group)`, and colocate non-routable files with private folders `_folder`.

| Path | URL Pattern | Notes |
|------|-------------|-------|
| `app/(marketing)/page.tsx` | `/` | Group omitted from URL |
| `app/(shop)/cart/page.tsx` | `/cart` | Share layouts within `(shop)` |
| `app/blog/_components/Post.tsx` | — | Not routable; safe place for UI utilities |
| `app/blog/_lib/data.ts` | — | Not routable; safe place for utils |

---

## Parallel and Intercepted Routes

These features fit specific UI patterns, such as slot-based layouts or modal routing.

Use `@slot` for named slots rendered by a parent layout. Use intercept patterns to render another route inside the current layout without changing the URL.

| Pattern | Meaning | Typical Use Case |
|---------|---------|-----------------|
| `@folder` | Named slot | Sidebar + main content |
| `(.)folder` | Intercept same level | Preview sibling route in a modal |
| `(..)folder` | Intercept parent | Open a child of the parent as an overlay |
| `(..)(..)folder` | Intercept two levels | Deeply nested overlay |
| `(...)folder` | Intercept from root | Show arbitrary route in current view |

---

## Metadata File Conventions

### App Icons

| File | Extensions | Description |
|------|------------|-------------|
| `favicon` | `.ico` | Favicon file |
| `icon` | `.ico .jpg .jpeg .png .svg` | App Icon file |
| `icon` | `.js .ts .tsx` | Generated App Icon |
| `apple-icon` | `.jpg .jpeg .png` | Apple App Icon file |
| `apple-icon` | `.js .ts .tsx` | Generated Apple App Icon |

### Open Graph and Twitter Images

| File | Extensions | Description |
|------|------------|-------------|
| `opengraph-image` | `.jpg .jpeg .png .gif` | Open Graph image file |
| `opengraph-image` | `.js .ts .tsx` | Generated Open Graph image |
| `twitter-image` | `.jpg .jpeg .png .gif` | Twitter image file |
| `twitter-image` | `.js .ts .tsx` | Generated Twitter image |

### SEO

| File | Extensions | Description |
|------|------------|-------------|
| `sitemap` | `.xml` | Sitemap file |
| `sitemap` | `.js .ts` | Generated Sitemap |
| `robots` | `.txt` | Robots file |
| `robots` | `.js .ts` | Generated Robots file |

---

## Organizing Your Project

Next.js is unopinionated about how you organize and colocate your project files. But it does provide several features to help you organize your project.

### Component Hierarchy

The components defined in special files are rendered in a specific hierarchy:

1. `layout.js`
2. `template.js`
3. `error.js` (React error boundary)
4. `loading.js` (React suspense boundary)
5. `not-found.js` (React error boundary for "not found" UI)
6. `page.js` or nested `layout.js`

The components are rendered recursively in nested routes, meaning the components of a route segment will be nested inside the components of its parent segment.

### Colocation

In the `app` directory, nested folders define route structure. Each folder represents a route segment that is mapped to a corresponding segment in a URL path.

However, even though route structure is defined through folders, a route is not publicly accessible until a `page.js` or `route.js` file is added to a route segment. Only the content returned by `page.js` or `route.js` is sent to the client.

This means that project files can be safely colocated inside route segments in the `app` directory without accidentally being routable.

> **Good to know:** While you can colocate your project files in `app` you don't have to. If you prefer, you can keep them outside the `app` directory.

### Private Folders

Private folders can be created by prefixing a folder with an underscore: `_folderName`

This indicates the folder is a private implementation detail and should not be considered by the routing system, thereby opting the folder and all its subfolders out of routing.

Private folders are useful for:

- Separating UI logic from routing logic.
- Consistently organizing internal files across a project and the Next.js ecosystem.
- Sorting and grouping files in code editors.
- Avoiding potential naming conflicts with future Next.js file conventions.

> **Good to know:**
> - While not a framework convention, you might also consider marking files outside private folders as "private" using the same underscore pattern.
> - You can create URL segments that start with an underscore by prefixing the folder name with `%5F` (the URL-encoded form of an underscore): `%5FfolderName`.
> - If you don't use private folders, it would be helpful to know Next.js special file conventions to prevent unexpected naming conflicts.

### Route Groups

Route groups can be created by wrapping a folder in parenthesis: `(folderName)`

This indicates the folder is for organizational purposes and should not be included in the route's URL path.

Route groups are useful for:

- Organizing routes by site section, intent, or team (e.g. marketing pages, admin pages).
- Enabling nested layouts in the same route segment level:
  - Creating multiple nested layouts in the same segment, including multiple root layouts.
  - Adding a layout to a subset of routes in a common segment.

### `src` Folder

Next.js supports storing application code (including `app`) inside an optional `src` folder. This separates application code from project configuration files which mostly live in the root of a project.

---

## Examples

The following section lists a very high-level overview of common strategies. The simplest takeaway is to choose a strategy that works for you and your team and be consistent across the project.

> **Good to know:** In the examples below, `components` and `lib` folders are used as generalized placeholders; their naming has no special framework significance and your projects might use other folders like `ui`, `utils`, `hooks`, `styles`, etc.

### Store Project Files Outside of `app`

This strategy stores all application code in shared folders in the root of your project and keeps the `app` directory purely for routing purposes.

### Store Project Files in Top-level Folders Inside of `app`

This strategy stores all application code in shared folders in the root of the `app` directory.

### Split Project Files by Feature or Route

This strategy stores globally shared application code in the root `app` directory and splits more specific application code into the route segments that use them.

---

## Common Patterns

### Organize Routes Without Affecting the URL Path

To organize routes without affecting the URL, create a group to keep related routes together. The folders in parenthesis will be omitted from the URL (e.g. `(marketing)` or `(shop)`).

Even though routes inside `(marketing)` and `(shop)` share the same URL hierarchy, you can create a different layout for each group by adding a `layout.js` file inside their folders.

### Opting Specific Segments into a Layout

To opt specific routes into a layout, create a new route group (e.g. `(shop)`) and move the routes that share the same layout into the group (e.g. `account` and `cart`). The routes outside of the group will not share the layout (e.g. `checkout`).

### Opting for Loading Skeletons on a Specific Route

To apply a loading skeleton via a `loading.js` file to a specific route, create a new route group (e.g., `/(overview)`) and then move your `loading.tsx` inside that route group.

The `loading.tsx` file will only apply to your dashboard → overview page instead of all your dashboard pages without affecting the URL path structure.

### Creating Multiple Root Layouts

To create multiple root layouts, remove the top-level `layout.js` file, and add a `layout.js` file inside each route group. This is useful for partitioning an application into sections that have a completely different UI or experience. The `<html>` and `<body>` tags need to be added to each root layout.
