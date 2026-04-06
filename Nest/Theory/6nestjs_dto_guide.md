# NestJS DTO (Data Transfer Object) – Complete Guide

## 📌 What is DTO?

DTO (Data Transfer Object) is a design pattern used in NestJS to define the **structure of data** that is sent between client and server.

### ✅ Purpose of DTO:
- Define data shape
- Validate incoming requests
- Improve code readability
- Ensure type safety

---

## 🧠 Simple Definition

DTO = Structure of data + Validation rules

---

## ⚙️ Why DTO is Important?

- Prevents invalid data from entering your application
- Makes APIs predictable
- Helps in maintaining clean architecture

---

## 📦 Required Packages

Install these packages:

```bash
npm install class-validator class-transformer
```

---

## 🧾 Basic DTO Example

### create-user.dto.ts

```ts
import { IsString, IsEmail, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  age: number;
}
```

---

## 🎯 Using DTO in Controller

```ts
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return body;
  }
}
```

---

## ⚠️ Enable Validation Pipe (IMPORTANT)

In main.ts:

```ts
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(new ValidationPipe());
```

---

## ❌ Invalid Request Example

```json
{
  "name": "Surya",
  "email": "wrong-email",
  "age": "abc"
}
```

👉 This will throw validation errors.

---

## ✅ Optional Fields DTO

```ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;
}
```

---

## 🔁 PartialType (Update DTO)

```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

👉 Makes all fields optional automatically.

---

## 🧱 Nested DTO Example

```ts
import { Type } from 'class-transformer';
import { ValidateNested, IsString } from 'class-validator';

class AddressDto {
  @IsString()
  city: string;
}

export class UserDto {
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
```

---

## 🔥 DTO Best Practices

- Always validate user input
- Keep DTOs simple and focused
- Use separate DTOs for Create and Update
- Use PartialType for updates

---

## 🧠 Summary

| Concept | Description |
|--------|------------|
| DTO | Defines data structure |
| class-validator | Adds validation rules |
| ValidationPipe | Enables validation |
| PartialType | Makes fields optional |

---

## 🚀 Final Thought

DTOs are essential in NestJS for building scalable and clean APIs.

---

Generated on: 2026-04-03 10:42:42.579585
