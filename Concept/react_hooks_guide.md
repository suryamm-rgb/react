# React — Concepts & Hooks Guide

---

## What is React?

React is a **JavaScript library** for building user interfaces, developed and maintained by Meta. Its core philosophy revolves around a few key ideas:

- **Component-Based Architecture**: UIs are broken into small, reusable, self-contained pieces called *components*.
- **Declarative UI**: You describe *what* the UI should look like for a given state — React figures out *how* to update the DOM efficiently.
- **Unidirectional Data Flow**: Data flows from parent to child via `props`, making state changes predictable and traceable.
- **Virtual DOM**: React maintains a lightweight copy of the real DOM. On state changes, it diffs the virtual DOM and applies only the minimal real DOM updates needed.

---

## Core Concepts

### Components
Functions (or classes) that return JSX — a syntax that looks like HTML but compiles to JavaScript.

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

### Props
Read-only inputs passed from a parent component to a child.

```jsx
<Greeting name="Alice" />
```

### State
Internal data that, when changed, causes the component to re-render.

### JSX
A syntax extension that lets you write HTML-like markup inside JavaScript.

---

## React Hooks

Hooks are **functions** that let functional components "hook into" React features like state, lifecycle, context, and more. They were introduced in React 16.8.

> **Rules of Hooks:**
> 1. Only call hooks **at the top level** (not inside loops, conditions, or nested functions).
> 2. Only call hooks **inside React functional components** or custom hooks.

---

### 1. `useState`
Adds local state to a functional component.

**Syntax:**
```js
const [state, setState] = useState(initialValue);
```

- `state` — current state value
- `setState` — function to update the state (triggers re-render)
- `initialValue` — the starting value (can be any type)

**Example:**
```jsx
const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>Count: {count}</button>
```

---

### 2. `useEffect`
Performs **side effects** (data fetching, subscriptions, DOM manipulation) after render.

**Syntax:**
```js
useEffect(() => {
  // effect logic
  return () => {
    // cleanup (optional)
  };
}, [dependencies]);
```

- Runs after every render if no dependency array is provided
- Runs only once (on mount) if dependency array is `[]`
- Runs when specified dependencies change
- The returned function is a **cleanup** (runs before next effect or on unmount)

**Example:**
```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

---

### 3. `useContext`
Consumes a React **Context** value without prop drilling.

**Syntax:**
```js
const value = useContext(MyContext);
```

- `MyContext` — a context object created with `React.createContext()`
- Returns the current context value from the nearest matching `Provider`

**Example:**
```jsx
const theme = useContext(ThemeContext);
```

---

### 4. `useReducer`
An alternative to `useState` for managing **complex state logic**, similar to Redux reducers.

**Syntax:**
```js
const [state, dispatch] = useReducer(reducer, initialState);
```

- `reducer` — a function `(state, action) => newState`
- `initialState` — the starting state value
- `dispatch` — function to send an action to the reducer

**Example:**
```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: return state;
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'increment' });
```

---

### 5. `useRef`
Returns a **mutable ref object** that persists across renders without causing re-renders.

**Syntax:**
```js
const ref = useRef(initialValue);
```

- `ref.current` — holds the current value
- Commonly used to access **DOM elements** directly
- Also used to store any mutable value that should not trigger re-renders

**Example:**
```jsx
const inputRef = useRef(null);
<input ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>Focus</button>
```

---

### 6. `useMemo`
**Memoizes** an expensive computed value, recomputing only when dependencies change.

**Syntax:**
```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- Use when a calculation is computationally heavy
- Returns the cached result unless dependencies change

**Example:**
```jsx
const sortedList = useMemo(() => items.sort(), [items]);
```

---

### 7. `useCallback`
**Memoizes** a function reference, preventing unnecessary re-creation on every render.

**Syntax:**
```js
const memoizedFn = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

- Useful when passing callbacks to child components that rely on reference equality (e.g., wrapped in `React.memo`)
- Only returns a new function when dependencies change

**Example:**
```jsx
const handleClick = useCallback(() => {
  console.log(value);
}, [value]);
```

---

### 8. `useLayoutEffect`
Identical to `useEffect`, but fires **synchronously after DOM mutations** and before the browser paints.

**Syntax:**
```js
useLayoutEffect(() => {
  // DOM measurement or mutation
  return () => { /* cleanup */ };
}, [dependencies]);
```

- Use when you need to read/modify layout before the browser paints
- Prefer `useEffect` in most cases; use this only when you face visual flicker issues

**Example:**
```jsx
useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setHeight(height);
}, []);
```

---

### 9. `useImperativeHandle`
Customizes the **instance value** exposed when using `ref` on a component wrapped in `forwardRef`.

**Syntax:**
```js
useImperativeHandle(ref, () => ({
  customMethod() { ... }
}), [dependencies]);
```

- Used with `React.forwardRef`
- Lets parent components call specific methods on a child component

**Example:**
```jsx
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
  }));
  return <input ref={inputRef} />;
});
```

---

### 10. `useDebugValue`
Displays a **label** for custom hooks in React DevTools.

**Syntax:**
```js
useDebugValue(value);
// or with a formatter:
useDebugValue(date, date => date.toISOString());
```

- Only useful inside **custom hooks**
- Helps in debugging by showing descriptive labels in DevTools

**Example:**
```jsx
function useOnlineStatus() {
  const isOnline = getOnlineStatus();
  useDebugValue(isOnline ? 'Online' : 'Offline');
  return isOnline;
}
```

---

### 11. `useId` *(React 18+)*
Generates a **unique, stable ID** that is consistent between server and client renders.

**Syntax:**
```js
const id = useId();
```

- Do **not** use for list keys
- Useful for accessibility attributes like `htmlFor` / `aria-*`

**Example:**
```jsx
const id = useId();
<label htmlFor={id}>Name</label>
<input id={id} />
```

---

### 12. `useTransition` *(React 18+)*
Marks state updates as **non-urgent**, keeping the UI responsive during heavy updates.

**Syntax:**
```js
const [isPending, startTransition] = useTransition();
```

- `isPending` — `true` while the transition is in progress
- `startTransition` — wraps non-urgent state updates

**Example:**
```jsx
startTransition(() => {
  setSearchResults(filterLargeList(query));
});
{isPending && <Spinner />}
```

---

### 13. `useDeferredValue` *(React 18+)*
Defers re-rendering a part of the UI until more urgent updates are done.

**Syntax:**
```js
const deferredValue = useDeferredValue(value);
```

- Similar to `useTransition` but for values, not state setters
- Useful when you receive a value you can't control (e.g., from props)

**Example:**
```jsx
const deferredQuery = useDeferredValue(query);
<SearchResults query={deferredQuery} />
```

---

### 14. `useSyncExternalStore` *(React 18+)*
Subscribes to an **external store** in a way that's compatible with concurrent rendering.

**Syntax:**
```js
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?);
```

- `subscribe` — function to subscribe to the store
- `getSnapshot` — function returning current store value
- Designed for library authors integrating external state managers

---

### 15. `useInsertionEffect` *(React 18+)*
Fires **before any DOM mutations**, designed for CSS-in-JS libraries to inject styles.

**Syntax:**
```js
useInsertionEffect(() => {
  // inject styles
  return () => { /* cleanup */ };
}, [dependencies]);
```

- Intended for **library authors**, not application code
- Cannot read refs or schedule updates inside it

---

## Quick Reference Table

| Hook | Purpose |
|---|---|
| `useState` | Local component state |
| `useEffect` | Side effects (fetch, subscriptions) |
| `useContext` | Consume context values |
| `useReducer` | Complex state logic |
| `useRef` | DOM refs / mutable values |
| `useMemo` | Memoize expensive computations |
| `useCallback` | Memoize function references |
| `useLayoutEffect` | Synchronous DOM measurements |
| `useImperativeHandle` | Expose methods via ref |
| `useDebugValue` | DevTools labels for custom hooks |
| `useId` | Unique stable IDs |
| `useTransition` | Non-urgent state transitions |
| `useDeferredValue` | Defer re-renders for a value |
| `useSyncExternalStore` | Subscribe to external stores |
| `useInsertionEffect` | Inject styles before DOM mutations |

---

*React version referenced: 18.x*
