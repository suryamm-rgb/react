# 📘 NestJS TypeORM Database Connection (Sync vs Async)

## 📌 Overview
NestJS supports two ways to configure a database connection using TypeORM:

- **Synchronous** → `forRoot()`
- **Asynchronous** → `forRootAsync()`

---

# 🔹 1. Synchronous Connection (`forRoot`)

## ✅ Use Case
- Static configuration
- Quick setup
- No dependency injection required

## 💻 Example

```ts
import { TypeOrmModule } from '@nestjs/typeorm';

TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'suryamm',
  password: 'postgres123',
  database: 'nesttjs',
  entities: [],
  synchronize: true,
});
```

---

# 🔹 2. Asynchronous Connection (`forRootAsync`)

## ✅ Use Case
- Environment variables (`.env`)
- ConfigService
- External APIs / secret managers
- Production-ready apps

## 💻 Example

```ts
TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'suryamm',
    password: 'postgres123',
    database: 'nesttjs',
    entities: [],
    synchronize: true,
  }),
});
```

---

# 🔍 Differences

| Feature                | forRoot | forRootAsync |
|----------------------|--------|-------------|
| Config Type          | Static | Dynamic     |
| Dependency Injection | No     | Yes         |
| Async Support        | No     | Yes         |
| Production Ready     | No     | Yes         |

---

# ⚠️ Best Practices

- Avoid `synchronize: true` in production
- Use `.env` for credentials
- Prefer async config

---

# 🚀 Summary

- Use `forRoot()` for simple apps
- Use `forRootAsync()` for production
