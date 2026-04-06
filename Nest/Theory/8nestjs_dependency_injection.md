# NestJS Dependency Injection (DI) – Complete Guide

---

# What is Dependency Injection?

Dependency Injection (DI) is a design pattern where **NestJS automatically creates and provides dependencies (services) to classes like controllers or other services**.

Instead of manually creating objects, NestJS injects them.

Without DI ❌

```ts
const usersService = new UsersService();
```

With DI ✅

```ts
constructor(private usersService: UsersService) {}
```

NestJS automatically creates and injects the service.

---

# Why use Dependency Injection

## 1. Avoid Manual Object Creation

You don’t need to create objects manually.

NestJS handles object creation automatically.

---

## 2. Loose Coupling

Controller does not depend on service creation.

Controller only uses the service.

This makes code clean and maintainable.

---

## 3. Reusability

Same service can be used in multiple places.

Example:

- UsersController
- AuthController
- AdminController

All can use same service.

---

## 4. Easy Testing

You can replace real service with mock service.

Useful for unit testing.

---

# Where to use Dependency Injection

Use Dependency Injection when one class needs another class.

Common places:

### Controller → Service

```ts
constructor(private usersService: UsersService) {}
```

---

### Service → Service

```ts
constructor(private authService: AuthService) {}
```

---

### Controller → Multiple Services

```ts
constructor(
  private usersService: UsersService,
  private authService: AuthService,
) {}
```

---

# How Dependency Injection Works in NestJS

Flow:

```
Service (@Injectable)
        ↓
Module (providers)
        ↓
Controller (constructor injection)
```

---

# Step-by-Step Example

## Step 1 — Create Service

users.service.ts

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers() {
    return ['Surya', 'Ram', 'John'];
  }
}
```

Explanation:

- `@Injectable()` makes service available for dependency injection
- This service contains business logic

---

## Step 2 — Register in Module

users.module.ts

```ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

Explanation:

- `providers` array registers service
- NestJS creates instance of UsersService
- Service becomes available for injection

---

## Step 3 — Inject into Controller

users.controller.ts

```ts
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
```

Explanation:

- Service injected using constructor
- No manual object creation
- NestJS automatically injects service

---

# Complete Flow Explanation

Step 1:

You create service using `@Injectable()`

NestJS marks it as provider.

Step 2:

You register service inside module `providers`.

NestJS creates service instance.

Step 3:

You inject service into controller constructor.

NestJS passes the instance automatically.

---

# Visual Flow

```
users.service.ts
   (@Injectable)
        ↓
users.module.ts
   (providers)
        ↓
users.controller.ts
   (constructor injection)
```

---

# Real Life Example

Controller = Waiter  
Service = Chef  

Waiter does not cook food.

Waiter asks chef.

```
Controller → Service
```

This is Dependency Injection.

---

# Important Rules

1. Service must have `@Injectable()`
2. Service must be inside `providers` array
3. Inject using constructor
4. Do not create service using `new`

---

# One Line Definition

Dependency Injection in NestJS =  
NestJS automatically creates and injects services into controllers or other services.

---

# Folder Structure

```
users
 ├── users.module.ts
 ├── users.controller.ts
 ├── users.service.ts
```

---

# Summary

- Create service with `@Injectable()`
- Register in module `providers`
- Inject in controller constructor
- NestJS handles everything automatically

---

