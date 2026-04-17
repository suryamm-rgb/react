# NestJS Inter-Module Dependency Example

## 📌 Overview

This document explains **Inter-Module Dependency in NestJS** using:

-   Users Module
-   Tweet Module

The goal is to use `UsersService` inside `TweetService`.

------------------------------------------------------------------------

## 🧩 Architecture

UsersModule └── exports UsersService

TweetModule └── imports UsersModule └── uses UsersService

------------------------------------------------------------------------

## ✅ Users Module

### users.module.ts

``` ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // 👈 important
})
export class UsersModule {}
```

------------------------------------------------------------------------

## ✅ Users Service

### users.service.ts

``` ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  users = [
    { id: 1, name: 'John', email: 'john@gmail.com' },
    { id: 2, name: 'Jane', email: 'jane@gmail.com' },
    { id: 3, name: 'Doe', email: 'doe@gmail.com' },
  ];

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
```

------------------------------------------------------------------------

## ✅ Tweet Module

### tweet.module.ts

``` ts
import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule], // 👈 important
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
```

------------------------------------------------------------------------

## ✅ Tweet Service

### tweet.service.ts

``` ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class TweetService {
  constructor(private readonly userService: UsersService) {}

  tweets = [
    { text: 'some tweet', date: new Date(), userId: 1 },
    { text: 'hello', date: new Date(), userId: 2 },
  ];

  getTweets(userId: number) {
    const user = this.userService.getUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return this.tweets
      .filter((t) => t.userId === userId)
      .map((t) => ({
        text: t.text,
        date: t.date,
        name: user.name,
        email: user.email,
      }));
  }
}
```

------------------------------------------------------------------------

## 🎯 Key Concepts

### 1. exports

-   Makes a service available to other modules

### 2. imports

-   Allows using exported services from another module

### 3. Dependency Injection

-   Services are injected using constructor

------------------------------------------------------------------------

## ⚠️ Common Errors

### ❌ Error: Nest can't resolve dependencies

✔ Fix: - Export the service - Import the module

------------------------------------------------------------------------

## 🚀 Summary

  Step   Action
  ------ ----------------
  1      Create service
  2      Export service
  3      Import module
  4      Inject service

------------------------------------------------------------------------

## 💡 Best Practices

-   Use `number` instead of `Number`
-   Use `string` instead of `String`
-   Handle undefined cases properly
-   Keep modules loosely coupled
