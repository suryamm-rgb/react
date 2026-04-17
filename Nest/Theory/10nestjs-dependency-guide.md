# 📘 NestJS Dependency & Circular Dependency Guide

## 📌 What is Dependency in NestJS?

In NestJS, **Dependency Injection (DI)** is a design pattern where a class receives its dependencies from outside rather than creating them itself.

### Example:

```ts
@Injectable()
export class UsersService {
  getUsers() {
    return ['John', 'Jane'];
  }
}
```

```ts
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
```

👉 Here:
- `UsersController` depends on `UsersService`
- NestJS automatically injects it

---

## 📌 Why Dependency Injection?

- Loose coupling
- Better testing
- Reusability
- Cleaner code

---

# 🔁 Inter-Module Dependency

When one module needs services from another module.

---

## 📌 Example

### Users Module

```ts
@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

### Orders Module

```ts
@Module({
  imports: [UsersModule],
  providers: [OrdersService],
})
export class OrdersModule {}
```

### Orders Service

```ts
@Injectable()
export class OrdersService {
  constructor(private readonly usersService: UsersService) {}
}
```

👉 Key Points:
- Use `exports` to share service
- Use `imports` to access it

---

# 🔴 Circular Dependency

A circular dependency happens when:

```
A → B → A
```

---

## 📌 Example (Problem)

```ts
@Injectable()
export class UsersService {
  constructor(private ordersService: OrdersService) {}
}
```

```ts
@Injectable()
export class OrdersService {
  constructor(private usersService: UsersService) {}
}
```

👉 This causes:
- Runtime errors
- Undefined dependencies

---

# ✅ Fix Circular Dependency

Use `forwardRef()`

---

## 📌 Fixed Example

### Users Service

```ts
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => OrdersService))
    private ordersService: OrdersService,
  ) {}
}
```

### Orders Service

```ts
@Injectable()
export class OrdersService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}
}
```

---

## 📌 Modules Fix

```ts
@Module({
  imports: [forwardRef(() => OrdersModule)],
})
export class UsersModule {}
```

```ts
@Module({
  imports: [forwardRef(() => UsersModule)],
})
export class OrdersModule {}
```

---

# ⚠️ When to Avoid Circular Dependency

- Bad design indication
- Hard to maintain
- Difficult testing

---

# 💡 Better Solution (Recommended)

Extract shared logic into a **third service**

---

## 📌 Example

```
UsersService ← SharedService → OrdersService
```

---

```ts
@Injectable()
export class SharedService {
  commonLogic() {}
}
```

---

# 🧠 Summary

| Concept | Meaning |
|--------|--------|
| Dependency Injection | Inject services instead of creating |
| Inter-module Dependency | Share services using imports/exports |
| Circular Dependency | Two modules depend on each other |
| forwardRef | Fix circular dependency |
| Best Practice | Avoid circular, use shared service |

---

# 🚀 Final Takeaways

- Always use DI properly
- Export services when needed
- Avoid circular dependency when possible
- Use `forwardRef` only if required

---

## ✅ Done!
