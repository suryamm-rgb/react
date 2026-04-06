# 📦 NestJS – Complete Guide (Beginner to Advanced)

---

## 📌 What is NestJS?

NestJS is a **progressive Node.js framework** for building efficient, scalable, and maintainable server-side applications.

- Built with **TypeScript**
- Inspired by **Angular architecture**
- Uses **Express (default)** or **Fastify**

---

## 🎯 Where to Use NestJS?

NestJS is best suited for:

### 1. Backend APIs

- REST APIs
- GraphQL APIs

### 2. Enterprise Applications

- Large-scale applications
- Clean architecture systems

### 3. Real-time Applications

- Chat applications
- Live notifications (WebSockets)

### 4. Microservices

- Distributed systems
- Event-driven architecture

### 5. Full-stack Applications

- React + NestJS
- Angular + NestJS

---

## ⚙️ How to Use NestJS?

### 🔹 Step 1: Install NestJS CLI

```bash
npm install -g @nestjs/cli
```

---

### 🔹 Step 2: Create a New Project

```bash
nest new project-name
```

---

### 🔹 Step 3: Project Structure

```
src/
 ├── app.controller.ts   # Handles incoming requests
 ├── app.service.ts      # Business logic
 ├── app.module.ts       # Root module
 └── main.ts             # Entry point
```

---

### 🔹 Step 4: Generate Module

```bash
nest generate module users
```

---

### 🔹 Step 5: Generate Controller

```bash
nest generate controller users
```

---

### 🔹 Step 6: Generate Service

```bash
nest generate service users
```

---

### 🔹 Step 7: Basic Example

#### Controller

```ts
import { Controller, Get } from "@nestjs/common";

@Controller("users")
export class UsersController {
  @Get()
  getUsers() {
    return "List of users";
  }
}
```

---

#### Service

```ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  getUsers() {
    return ["User1", "User2"];
  }
}
```

---

#### Module

```ts
import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

---

### 🔹 Step 8: Run the Application

```bash
npm run start:dev
```

---

## 🧱 Core Concepts in NestJS

### 📦 Modules

- Organize the application into reusable blocks

### 🎮 Controllers

- Handle incoming HTTP requests

### 🧠 Services

- Contain business logic

### 🔌 Dependency Injection

- Automatically inject dependencies

### 🛡️ Guards

- Used for authentication & authorization

### 🔄 Interceptors

- Modify request/response globally

### 🔍 Pipes

- Validate and transform data

### 🧩 Middleware

- Runs before request reaches controller

---

## 🏗️ Real Project Structure (Best Practice)

```
src/
 ├── modules/
 │    ├── users/
 │    │    ├── users.controller.ts
 │    │    ├── users.service.ts
 │    │    ├── users.module.ts
 │    │    └── dto/
 │    ├── auth/
 │    └── products/
 │
 ├── common/
 │    ├── guards/
 │    ├── interceptors/
 │    ├── pipes/
 │
 ├── config/
 ├── database/
 ├── app.module.ts
 └── main.ts
```

---

## 🔄 NestJS vs Express

| Feature        | NestJS          | Express      |
| -------------- | --------------- | ------------ |
| Architecture   | Structured      | Unstructured |
| TypeScript     | Built-in        | Optional     |
| Scalability    | High            | Medium       |
| Learning Curve | Medium/High     | Easy         |
| Boilerplate    | More            | Less         |
| Use Case       | Enterprise apps | Small apps   |

---

## 🚀 Advantages of NestJS

### ✅ 1. Scalable Architecture

- Modular and maintainable

### ✅ 2. TypeScript Support

- Strong typing improves code quality

### ✅ 3. Dependency Injection

- Cleaner and testable code

### ✅ 4. Built-in Features

- Guards, pipes, interceptors, middleware

### ✅ 5. Multiple Paradigms Support

- REST, GraphQL, WebSockets, Microservices

### ✅ 6. Clean Code Structure

- Organized and readable

---

## ⚠️ Disadvantages of NestJS

### ❌ 1. Learning Curve

- Hard for beginners

### ❌ 2. Boilerplate Code

- More setup required

### ❌ 3. Overkill for Small Projects

- Not suitable for simple APIs

### ❌ 4. Slight Performance Overhead

- Due to abstraction layer

---

## 🧠 When to Use NestJS?

### ✅ Use NestJS If:

- Building large-scale applications
- Working in a team
- Need scalable architecture
- Using microservices

### ❌ Avoid NestJS If:

- Building small apps
- Need quick prototype
- Simple CRUD only

---

## 🏁 Conclusion

NestJS is a **powerful backend framework** that helps you build:

- Scalable applications
- Clean architecture
- Enterprise-grade systems

👉 If you already know **Node.js + TypeScript**, NestJS is the **best next step**.

---
