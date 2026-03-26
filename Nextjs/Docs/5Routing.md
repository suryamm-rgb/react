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
