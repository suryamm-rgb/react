# NestJS Module Dependency Documentation

## Overview

This document explains how to share a service (`UserService`) between
modules in NestJS.

------------------------------------------------------------------------

## Scenario

You have two modules: - User Module - Tweet Module

You want to use `UserService` inside the Tweet Module.

------------------------------------------------------------------------

## Step 1: Create User Module

### user.module.ts

``` ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService], // 👈 Export service
})
export class UserModule {}
```

------------------------------------------------------------------------

## Step 2: Create User Service

### user.service.ts

``` ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserById(id: number) {
    return { id, name: 'Surya' };
  }
}
```

------------------------------------------------------------------------

## Step 3: Import User Module in Tweet Module

### tweet.module.ts

``` ts
import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule], // 👈 Import module
  providers: [TweetService],
})
export class TweetModule {}
```

------------------------------------------------------------------------

## Step 4: Use UserService in Tweet Service

### tweet.service.ts

``` ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class TweetService {
  constructor(private userService: UserService) {}

  getTweetWithUser(userId: number) {
    const user = this.userService.getUserById(userId);
    return {
      tweet: "Hello world",
      user,
    };
  }
}
```

------------------------------------------------------------------------

## Important Concepts

### 1. exports

-   Makes a provider available outside the module

### 2. imports

-   Allows access to exported providers from another module

### 3. Dependency Injection

-   NestJS automatically injects services via constructor

------------------------------------------------------------------------

## Flow Diagram

UserModule └── exports UserService

TweetModule └── imports UserModule └── uses UserService

------------------------------------------------------------------------

## Common Errors

### ❌ Error: Nest can't resolve dependencies

✔ Fix: - Ensure service is exported - Ensure module is imported

------------------------------------------------------------------------

## Summary

  Step   Action
  ------ ----------------
  1      Create service
  2      Export service
  3      Import module
  4      Inject service

------------------------------------------------------------------------

## Best Practice

-   Keep modules independent
-   Export only required services
-   Avoid circular dependencies
