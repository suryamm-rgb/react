# NestJS Step-by-Step Beginner Guide

This guide walks you through **how NestJS works**, how to create
**Modules, Controllers, and Services**, and how to build basic **GET,
POST, and PATCH APIs**.

------------------------------------------------------------------------

## 1. What is NestJS?

NestJS is a **Node.js framework** for building scalable backend
applications using **TypeScript** and inspired by **Angular
architecture**.

It uses: - **Modules** → Organize features - **Controllers** → Handle
HTTP requests - **Services** → Business logic - **DTOs** → Validate
request data

------------------------------------------------------------------------

## 2. Install NestJS CLI

``` bash
npm i -g @nestjs/cli
nest new project-name
cd project-name
npm run start:dev
```

Your app runs at:\
**http://localhost:3000**

------------------------------------------------------------------------

## 3. Understanding Core Structure

    src/
     ├── app.module.ts
     ├── app.controller.ts
     ├── app.service.ts

### AppModule

Main root module that connects everything.

### AppController

Handles routes.

### AppService

Contains logic.

------------------------------------------------------------------------

## 4. Creating a Module

Modules group related features.

``` bash
nest generate module users
```

Creates:

    users/
     └── users.module.ts

------------------------------------------------------------------------

## 5. Creating a Controller

Controllers handle incoming HTTP requests.

``` bash
nest generate controller users
```

Example:

``` ts
@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return "List of users";
  }
}
```

Route: **GET /users**

------------------------------------------------------------------------

## 6. Creating a Service

Services hold business logic.

``` bash
nest generate service users
```

Example:

``` ts
@Injectable()
export class UsersService {
  findAll() {
    return [{ id: 1, name: 'John' }];
  }
}
```

Inject into controller:

``` ts
constructor(private readonly usersService: UsersService) {}

@Get()
getUsers() {
  return this.usersService.findAll();
}
```

------------------------------------------------------------------------

## 7. HTTP Methods in NestJS

### GET --- Fetch Data

``` ts
@Get()
getUsers() {}
```

### GET by ID

``` ts
@Get(':id')
getUser(@Param('id') id: string) {
  return id;
}
```

### POST --- Create Data

``` ts
@Post()
createUser(@Body() body) {
  return body;
}
```

### PATCH --- Update Data

``` ts
@Patch(':id')
updateUser(@Param('id') id: string, @Body() body) {
  return { id, ...body };
}
```

------------------------------------------------------------------------

## 8. Using DTO (Data Validation)

Install:

``` bash
npm i class-validator class-transformer
```

Create DTO:

``` ts
export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;
}
```

Use in controller:

``` ts
@Post()
createUser(@Body() dto: CreateUserDto) {
  return dto;
}
```

Enable validation in **main.ts**:

``` ts
app.useGlobalPipes(new ValidationPipe());
```

------------------------------------------------------------------------

## 9. Connecting Modules

If Posts need UsersService:

``` ts
@Module({
  imports: [UsersModule],
})
export class PostsModule {}
```

------------------------------------------------------------------------

## 10. Dependency Injection Flow

Controller → Service → Database (later)

Nest automatically injects dependencies using constructors.

------------------------------------------------------------------------

## 11. Full Example Flow

    Client Request → Controller → Service → Response

Example:

**GET /users**\
Controller calls `usersService.findAll()` → Returns users list.

------------------------------------------------------------------------

## 12. Summary

You learned:

✔ Create modules\
✔ Create controllers\
✔ Create services\
✔ Handle GET, POST, PATCH\
✔ Use DTO validation\
✔ Connect modules together

------------------------------------------------------------------------

## Next Steps

-   Connect MongoDB or PostgreSQL\
-   Add Authentication (JWT)\
-   Use Guards & Middleware

------------------------------------------------------------------------

**Happy Coding with NestJS 🚀**
