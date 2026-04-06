# 📦 NestJS Modules (Beginner Guide)

## 🧠 What is a Module?

A **Module** in NestJS is a class decorated with `@Module()`.

It helps organize your application into **smaller, manageable parts**.

👉 Every NestJS app has at least **one module**:

- `AppModule` (Root Module)

---

## 🏗️ Basic Structure of a Module

```ts
import { Module } from "@nestjs/common";

@Module({
  controllers: [],
  providers: [],
  imports: [],
  exports: [],
})
export class ExampleModule {}
```

---

## 📌 Module Properties (Important)

| Property      | Purpose                            |
| ------------- | ---------------------------------- |
| `controllers` | Handles incoming requests          |
| `providers`   | Services (business logic)          |
| `imports`     | Other modules you want to use      |
| `exports`     | Share providers with other modules |

---

## 🚀 Example: Feature Module

Let’s create a **Cats Module**

### 1. cats.module.ts

```ts
import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

---

### 2. Import into Root Module

```ts
import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```

---

## 📁 Folder Structure

```
src/
 ├── cats/
 │   ├── cats.controller.ts
 │   ├── cats.service.ts
 │   ├── cats.module.ts
 │   ├── dto/
 │   └── interfaces/
 ├── app.module.ts
 └── main.ts
```

---

## 🎯 Feature Modules

👉 A **Feature Module** groups related things:

Example:

- CatsController
- CatsService

✔ Helps in:

- Clean code
- Better structure
- Easy scaling

---

## 🔁 Shared Modules

By default, modules are **singleton (only one instance)**.

### Export a service:

```ts
@Module({
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

### Use in another module:

```ts
@Module({
  imports: [CatsModule],
})
export class AnotherModule {}
```

👉 Now both modules share the **same instance** of `CatsService`

---

## ❗ Why NOT create service in every module?

Bad approach ❌:

- Multiple instances
- More memory usage
- Data inconsistency

Good approach ✅:

- Export + reuse service
- Single instance (shared)

---

## 🔄 Module Re-exporting

```ts
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```

👉 Any module importing `CoreModule` gets `CommonModule`

---

## 💉 Dependency Injection in Module

```ts
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
```

⚠️ Note:

- Modules can use services
- But modules **cannot be injected** elsewhere

---

## 🌍 Global Modules

If you want a module available **everywhere**:

```ts
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

👉 Now you don't need to import it everywhere

⚠️ Warning:

- Avoid overusing global modules
- Can make code messy

---

## ⚡ Dynamic Modules

Used when you want **runtime configuration**

### Example:

```ts
import { Module, DynamicModule } from "@nestjs/common";

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [],
      exports: [],
    };
  }
}
```

### Usage:

```ts
@Module({
  imports: [DatabaseModule.forRoot()],
})
export class AppModule {}
```

---

## 🧩 When to Use Dynamic Modules?

Use when:

- Database configs
- External APIs
- Environment-based setup

---

## 🏁 Summary

✔ Module = Building block of NestJS
✔ Helps organize code
✔ Use Feature Modules for structure
✔ Use `exports` to share services
✔ Avoid multiple service instances
✔ Use Global modules carefully
✔ Use Dynamic modules for configs

---

## 💡 Simple Rule

👉 Think of Module as a **folder with power**

- Controllers → Handle requests
- Services → Business logic
- Module → Connect everything

---

## 🧑‍💻 CLI Command

```bash
nest g module cats
```
