# 📘 NestJS Controllers – Complete Documentation

## 📌 Introduction
Controllers in NestJS are responsible for handling incoming HTTP requests and returning responses to the client.

- They define routes
- They process requests
- They send responses back

---

## 🧱 Basic Controller Example

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

---

## 🚀 Creating Controller via CLI

```bash
nest g controller cats
```

---

## 🌐 Routing

```ts
@Controller('cats')
export class CatsController {
  @Get('breed')
  findBreed() {
    return 'Cat breed';
  }
}
```

---

## 📥 Request Object

```ts
import { Request } from 'express';

@Get()
findAll(@Req() request: Request) {
  return request.headers;
}
```

---

## 🎯 Useful Decorators

- @Req() → Request object
- @Res() → Response object
- @Body() → Request body
- @Query() → Query params
- @Param() → Route params
- @Headers() → Headers
- @Ip() → Client IP

---

## 📦 HTTP Methods

@Get()
@Post()
@Put()
@Delete()
@Patch()
@Options()
@Head()
@All()

---

## 🌟 Route Wildcards

```ts
@Get('abcd/*')
findAll() {
  return 'Wildcard route';
}
```

---

## 🔢 Status Codes

Default:
- GET → 200
- POST → 201

```ts
@Post()
@HttpCode(204)
create() {}
```

---

## 📤 Response Headers

```ts
@Post()
@Header('Cache-Control', 'no-store')
create() {}
```

---

## 🔁 Redirection

```ts
@Get()
@Redirect('https://nestjs.com', 301)
redirectToDocs() {}
```

---

## 🔗 Route Parameters

```ts
@Get(':id')
findOne(@Param('id') id: string) {
  return `Cat ID: ${id}`;
}
```

---

## ⚡ Async Support

```ts
@Get()
async findAll(): Promise<any[]> {
  return [];
}
```

---

## 📥 Request Payload (DTO)

```ts
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

```ts
@Post()
create(@Body() createCatDto: CreateCatDto) {
  return createCatDto;
}
```

---

## 🔍 Query Parameters

```ts
@Get()
findAll(@Query('age') age: number, @Query('breed') breed: string) {
  return `Age: ${age}, Breed: ${breed}`;
}
```

---

## 🧪 Full CRUD Example

```ts
@Controller('cats')
export class CatsController {

  @Post()
  create(@Body() dto: CreateCatDto) {
    return 'Create cat';
  }

  @Get()
  findAll(@Query() query: any) {
    return 'Get all cats';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Cat ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `Update ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Delete ${id}`;
  }
}
```

---

## 🧩 Register Controller in Module

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```

---

## ⚙️ Library-Specific Response (Express)

```ts
import { Response } from 'express';

@Post()
create(@Res() res: Response) {
  res.status(201).send();
}
```

---

## 🔄 Passthrough Mode

```ts
@Get()
findAll(@Res({ passthrough: true }) res: Response) {
  res.status(200);
  return [];
}
```

---

## ✅ Best Practices

- Use standard response handling
- Use DTO classes instead of interfaces
- Avoid overusing @Res()
- Keep controllers thin

---

## 📌 Summary

Controllers:
- Handle requests
- Define routes
- Return responses

---

# 🎯 End of Documentation
