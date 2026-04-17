# NestJS Project -- Full Workflow Explanation (Based on Your Code)

This document explains **how your NestJS application works internally**,
step by step, using the exact structure you built.

------------------------------------------------------------------------

# 🧠 1. Overall Architecture

Your app follows NestJS's core architecture:

    Client Request → Controller → Service → (Other Services) → Response

You created **3 feature modules**:

  Module        Responsibility
  ------------- ------------------------
  UsersModule   User-related APIs
  PostsModule   Posts related to users
  AuthModule    Authentication logic

All are connected inside **AppModule**.

------------------------------------------------------------------------

# 📦 2. AppModule (Root Module)

``` ts
@Module({
  imports: [UsersModule, PostsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### What it does

This is the **main entry point** of your backend.

It tells NestJS: - Load **Users**, **Posts**, and **Auth** features -
Use **AppController** for root routes - Use **AppService** for root
logic

------------------------------------------------------------------------

# 🌍 3. Root Route Flow

### Controller

``` ts
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

### Service

``` ts
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello From NestJS!';
  }
}
```

### Flow

    GET /
     → AppController.getHello()
     → AppService.getHello()
     → "Hello From NestJS!"

------------------------------------------------------------------------

# 👤 4. Users Module

## UsersModule

``` ts
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [forwardRef(() => AuthModule)],
})
```

### Why `forwardRef`?

Because **UsersService** uses **AuthService** and **AuthService** also
uses **UsersService**.

This is called a **circular dependency**, and `forwardRef` tells NestJS:
\> "These depend on each other --- resolve later safely."

------------------------------------------------------------------------

## UsersController

### Get All Users

``` ts
@Get()
getUsers(
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
) {
  return this.usersService.findAll(limit, page);
}
```

### What happens

    GET /users?limit=5&page=2
     → limit converted to number
     → page converted to number
     → usersService.findAll(5, 2)

------------------------------------------------------------------------

### Get Single User

``` ts
@Get(':id')
getUserById(@Param() params: GetUsersParamsDto) {
  return this.usersService.findOne(params.id!);
}
```

DTO ensures `id` is a number.

------------------------------------------------------------------------

### Create User (POST)

``` ts
@Post()
createUser(@Body() createUserDto: CreateUserDto) {
  return 'you sent a Post request to Users endpoint';
}
```

Here NestJS: 1. Converts request body into **CreateUserDto** 2.
Validates using decorators like `@IsEmail`, `@MinLength`

------------------------------------------------------------------------

### Patch User (PATCH)

``` ts
@Patch()
patchUser(@Body() patchUserDto: patchUserDto) {
  return patchUserDto;
}
```

`PartialType(CreateUserDto)` makes all fields optional for updates.

------------------------------------------------------------------------

## UsersService

``` ts
constructor(
  @Inject(forwardRef(() => AuthService))
  private readonly authService: AuthService,
) {}
```

### findAll()

``` ts
const isAuth = this.authService.isAuth();
```

Before returning users, it checks authentication from **AuthService**.

------------------------------------------------------------------------

# 📝 5. Posts Module

## PostsModule

``` ts
@Module({
  imports: [UsersModule],
  controllers: [PostsController],
  providers: [PostsService],
})
```

Posts depend on **UsersService** to attach user info to posts.

------------------------------------------------------------------------

## PostsController

``` ts
@Get(':userId')
getPosts(@Param('userId') userId: string) {
  return this.postsService.findAll(userId);
}
```

Route:

    GET /posts/123

------------------------------------------------------------------------

## PostsService

``` ts
const user = this.usersService.findOneById(userId);
```

### Flow

    GET /posts/123
     → PostsController
     → PostsService.findAll("123")
     → UsersService.findOneById("123")
     → Returns posts with user info

------------------------------------------------------------------------

# 🔐 6. Auth Module

## AuthModule

``` ts
@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [AuthService],
  exports: [AuthService],
})
```

Again, `forwardRef` solves circular dependency.

------------------------------------------------------------------------

## AuthService

``` ts
login(email, password, id) {
  const user = this.usersService.findOneById('1234');
  return 'Sample_token';
}
```

This simulates: - Finding user - Checking credentials - Returning token

------------------------------------------------------------------------

# 🔄 7. Full Dependency Flow

    UsersService ⇄ AuthService   (circular dependency)
    PostsService → UsersService
    AppController → AppService

------------------------------------------------------------------------

# 📥 8. Request Lifecycle Example

### Example: GET /users

    Request
     → UsersController.getUsers()
     → UsersService.findAll()
     → AuthService.isAuth()
     → Return users list

### Example: GET /posts/1

    Request
     → PostsController
     → PostsService
     → UsersService
     → Return posts with user

------------------------------------------------------------------------

# 🧪 9. DTO Validation

### CreateUserDto ensures:

  Field       Rules
  ----------- -----------------------------------
  firstName   Required string (3--96 chars)
  lastName    Optional string
  email       Must be valid email
  password    Must include upper, lower, number

Nest automatically validates when **ValidationPipe** is enabled.

------------------------------------------------------------------------

# 🚀 10. Summary

You built a real modular backend with:

✔ Controllers handling routes\
✔ Services handling logic\
✔ DTOs validating data\
✔ Modules organizing features\
✔ Circular dependency handling with `forwardRef`\
✔ Feature-to-feature communication (Posts → Users)

This is **real-world NestJS architecture** 🎯

------------------------------------------------------------------------

# 📌 Next Level

-   Connect database (MongoDB/PostgreSQL)
-   Add JWT Authentication
-   Use Guards for route protection
-   Add Exception Filters

------------------------------------------------------------------------

**You are officially thinking like a backend architect now 😎**
