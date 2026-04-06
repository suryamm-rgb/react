# 📌 NestJS Controllers - Complete Guide

## 📖 Introduction

Controllers in NestJS are responsible for: - Handling incoming HTTP
requests - Returning responses to the client

They act as the **entry point** of your application.

------------------------------------------------------------------------

## 🧠 What is a Controller?

A controller is a class decorated with `@Controller()`.

It defines routes and handles requests.

``` ts
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

------------------------------------------------------------------------

## 🚀 Creating Controller using CLI

``` bash
nest g controller cats
```

------------------------------------------------------------------------

## 🌐 Routing in NestJS

``` ts
@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return 'All users';
  }

  @Get('profile')
  getProfile() {
    return 'User profile';
  }
}
```

------------------------------------------------------------------------

## 🔗 Route Parameters

``` ts
@Get(':id')
getUser(@Param('id') id: string) {
  return `User ID: ${id}`;
}
```

------------------------------------------------------------------------

## ❓ ParseIntPipe

``` ts
@Get(':id')
getUser(@Param('id', ParseIntPipe) id: number) {}
```

------------------------------------------------------------------------

## 📦 Request Decorators

-   @Param()
-   @Body()
-   @Query()
-   @Headers()
-   @Req()
-   @Res()

------------------------------------------------------------------------

## 📥 Query Parameters

``` ts
@Get()
getUsers(@Query('age') age: number) {
  return `Age: ${age}`;
}
```

------------------------------------------------------------------------

## 📦 Request Body (DTO)

``` ts
export class CreateUserDto {
  name: string;
  age: number;
}
```

``` ts
@Post()
createUser(@Body() body: CreateUserDto) {
  return body;
}
```

------------------------------------------------------------------------

## 🔄 CRUD Example

``` ts
@Controller('cats')
export class CatsController {

  @Post()
  create(@Body() body: any) {
    return 'Cat created';
  }

  @Get()
  findAll() {
    return 'All cats';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Cat ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `Updated cat ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Deleted cat ${id}`;
  }
}
```

------------------------------------------------------------------------

## 🔁 Status Codes

``` ts
@Post()
@HttpCode(204)
create() {}
```

------------------------------------------------------------------------

## 📬 Headers

``` ts
@Post()
@Header('Cache-Control', 'no-store')
create() {}
```

------------------------------------------------------------------------

## 🔀 Redirect

``` ts
@Get()
@Redirect('https://nestjs.com', 301)
redirect() {}
```

------------------------------------------------------------------------

## ⚡ Async

``` ts
@Get()
async getData(): Promise<string[]> {
  return ['data'];
}
```

------------------------------------------------------------------------

## 🔧 Module Registration

``` ts
@Module({
  controllers: [CatsController],
})
export class AppModule {}
```

------------------------------------------------------------------------

## 📌 Best Practices

-   Keep controllers thin
-   Use services
-   Use DTOs
-   Use Pipes for validation
