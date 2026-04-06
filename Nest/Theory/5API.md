# 📘 NestJS GET API Complete Guide

## 📌 Introduction

In NestJS, `@Get()` is used to handle HTTP GET requests.
GET requests are used to **retrieve (read) data** from the server.

---

# 🚀 CRUD Overview

| Operation | Method    | Description  |
| --------- | --------- | ------------ |
| Create    | POST      | Add new data |
| Read      | GET       | Fetch data   |
| Update    | PUT/PATCH | Modify data  |
| Delete    | DELETE    | Remove data  |

---

# 🧠 Basic Controller Setup

```ts
import { Controller, Get, Param, Query, ParseIntPipe } from "@nestjs/common";

@Controller("users")
export class UsersController {}
```

Base URL:

```
http://localhost:3000/users
```

---

# 🔹 1. Get All Users

```ts
@Get()
getUsers() {
  return ['user1', 'user2', 'user3'];
}
```

### API

```
GET /users
```

---

# 🔹 2. Get User by ID (Path Param)

```ts
@Get(':id')
getUser(@Param('id', ParseIntPipe) id: number) {
  return { id };
}
```

### API

```
GET /users/1
```

---

# 🔹 3. Get with Multiple Params

```ts
@Get(':id/:role')
getUserRole(
  @Param('id') id: string,
  @Param('role') role: string,
) {
  return { id, role };
}
```

### API

```
GET /users/1/admin
```

---

# 🔹 4. Query Parameters (Filtering / Pagination)

```ts
@Get()
getUsersWithQuery(
  @Query('limit') limit?: string,
  @Query('page') page?: string,
) {
  return { limit, page };
}
```

### API

```
GET /users?limit=10&page=2
```

---

# 🔹 5. Query + Param Combination

```ts
@Get(':id')
getUser(
  @Param('id', ParseIntPipe) id: number,
  @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
) {
  return { id, limit };
}
```

### API

```
GET /users/1?limit=5
```

---

# 🔹 6. Optional Route Parameter

```ts
@Get(':id')
getUser(@Param('id') id: string) {
  return { id };
}

@Get(':id/:optional')
getUserWithOptional(
  @Param('id') id: string,
  @Param('optional') optional: string,
) {
  return { id, optional };
}
```

### API

```
GET /users/1
GET /users/1/test
```

---

# 🔹 7. Default Values in Query

```ts
@Get()
getUsers(
  @Query('limit') limit: number = 10,
) {
  return { limit };
}
```

---

# 🔹 8. Using Pipes (Validation)

```ts
@Get(':id')
getUser(@Param('id', ParseIntPipe) id: number) {
  return { id };
}
```

---

# 🔹 9. Real-World Example (Best Practice)

```ts
@Get()
getUsers(
  @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  @Query('page', new ParseIntPipe({ optional: true })) page?: number,
  @Query('search') search?: string,
) {
  return {
    data: [],
    limit: limit ?? 10,
    page: page ?? 1,
    search: search ?? null,
  };
}
```

### API

```
GET /users?limit=5&page=2&search=surya
```

---

# 🧱 Final Combined Controller

```ts
import { Controller, Get, Param, Query, ParseIntPipe } from "@nestjs/common";

@Controller("users")
export class UsersController {
  @Get()
  getUsers(
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
  ) {
    return {
      message: "All users",
      limit: limit ?? 10,
      page: page ?? 1,
    };
  }

  @Get(":id")
  getUser(
    @Param("id", ParseIntPipe) id: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return { id, limit: limit ?? null };
  }

  @Get(":id/:optional")
  getUserWithOptional(
    @Param("id", ParseIntPipe) id: number,
    @Param("optional") optional: string,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return { id, optional, limit: limit ?? null };
  }
}
```

---

# ⚠️ Common Mistakes

❌ Optional param like `/users/:id?` (Not supported)

❌ Using ParseIntPipe without optional flag

---

# 💡 Best Practices

- Use `@Param()` for URL params
- Use `@Query()` for filters and pagination
- Always return objects instead of strings
- Use pipes for validation

---

# 🚀 Next Steps

1. POST API (Create)
2. PUT/PATCH API (Update)
3. DELETE API
4. DTO validation
5. Service layer

---

# ✅ Summary

| Type            | Example            |
| --------------- | ------------------ |
| Get all         | `/users`           |
| Get one         | `/users/1`         |
| Query           | `/users?limit=10`  |
| Mixed           | `/users/1?limit=5` |
| Multiple params | `/users/1/admin`   |
