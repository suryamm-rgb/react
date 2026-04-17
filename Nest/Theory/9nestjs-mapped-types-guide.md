# 📘 NestJS Mapped Types & Type Utilities Guide

## 📌 What are Types in TypeScript?

Types define the **shape of data** in your application.

### Example:
```ts
type User = {
  id: number;
  name: string;
};
```

👉 Helps with:
- Type safety
- Autocomplete
- Error prevention

---

## 📌 What are Mapped Types?

Mapped Types allow you to **create new types based on existing ones**.

👉 Instead of rewriting types, you reuse and modify them.

---

## 📌 Why Use Mapped Types?

- Avoid code duplication
- Maintain consistency
- Easier refactoring
- Cleaner DTOs in NestJS

---

## 📌 Where to Use?

- DTO transformations (Create → Update)
- API request validation
- Modifying existing interfaces

---

# 🚀 Built-in Mapped Types in NestJS

```ts
import { PartialType, PickType, OmitType, IntersectionType } from '@nestjs/mapped-types';
```

---

# 1️⃣ PartialType

## 🔹 What it does:
Makes **all properties optional**

## 🔹 Use Case:
Update DTO

### Example:

```ts
export class CreateUserDto {
  name: string;
  email: string;
}
```

```ts
export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

👉 Result:
```ts
{
  name?: string;
  email?: string;
}
```

---

# 2️⃣ PickType

## 🔹 What it does:
Selects **specific fields only**

## 🔹 Use Case:
When you need only certain fields

### Example:

```ts
export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}
```

```ts
export class UserEmailDto extends PickType(CreateUserDto, ['email'] as const) {}
```

👉 Result:
```ts
{
  email: string;
}
```

---

# 3️⃣ OmitType

## 🔹 What it does:
Removes specific fields

## 🔹 Use Case:
Exclude sensitive fields

### Example:

```ts
export class UserDto extends OmitType(CreateUserDto, ['password'] as const) {}
```

👉 Result:
```ts
{
  name: string;
  email: string;
}
```

---

# 4️⃣ IntersectionType

## 🔹 What it does:
Combines multiple types

## 🔹 Use Case:
Merge DTOs

### Example:

```ts
class UserBasicDto {
  name: string;
}

class UserExtraDto {
  age: number;
}
```

```ts
export class FullUserDto extends IntersectionType(
  UserBasicDto,
  UserExtraDto,
) {}
```

👉 Result:
```ts
{
  name: string;
  age: number;
}
```

---

# 🔥 Composition (Advanced Usage)

You can combine multiple mapped types.

### Example:

```ts
export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}
```

```ts
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const),
) {}
```

👉 Result:
```ts
{
  name?: string;
  email?: string;
}
```

---

# ⚡ Real-World Example (NestJS)

## Create DTO

```ts
export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}
```

## Update DTO

```ts
export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

## Response DTO

```ts
export class UserResponseDto extends OmitType(CreateUserDto, ['password'] as const) {}
```

---

# 🧠 Summary Table

| Type              | Purpose                          | Example Use Case        |
|------------------|----------------------------------|-------------------------|
| PartialType      | Make all fields optional         | Update API              |
| PickType         | Select specific fields           | Email-only DTO          |
| OmitType         | Remove fields                    | Hide password           |
| IntersectionType | Combine multiple types           | Merge DTOs              |

---

# 🎯 Key Takeaways

- Use **PartialType** for updates
- Use **PickType** for minimal data
- Use **OmitType** to hide fields
- Use **IntersectionType** to combine DTOs
- Combine them for powerful compositions

---

