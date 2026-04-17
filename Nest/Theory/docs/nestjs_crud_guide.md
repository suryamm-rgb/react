# NestJS CRUD Operations Guide (Step-by-Step)

This guide explains how to build **CRUD (Create, Read, Update, Delete)**
APIs in NestJS.

We'll use a **Users** example.

------------------------------------------------------------------------

# 📌 What is CRUD?

  Operation   HTTP Method   Example Route   Purpose
  ----------- ------------- --------------- ----------------------
  Create      POST          /users          Add new record
  Read All    GET           /users          Get multiple records
  Read One    GET           /users/:id      Get single record
  Update      PATCH / PUT   /users/:id      Modify record
  Delete      DELETE        /users/:id      Remove record

------------------------------------------------------------------------

# 1️⃣ Create Module, Controller, Service

``` bash
nest g module users
nest g controller users
nest g service users
```

------------------------------------------------------------------------

# 2️⃣ Users Service (Business Logic)

``` ts
@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John', email: 'john@test.com' },
    { id: 2, name: 'Alice', email: 'alice@test.com' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  create(userData) {
    const newUser = { id: Date.now(), ...userData };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateData) {
    const user = this.findOne(id);
    if (!user) return null;
    Object.assign(user, updateData);
    return user;
  }

  remove(id: number) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;
    return this.users.splice(index, 1)[0];
  }
}
```

------------------------------------------------------------------------

# 3️⃣ Users Controller (Routes)

``` ts
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET multiple records
  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  // GET single record
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // CREATE record
  @Post()
  createUser(@Body() body) {
    return this.usersService.create(body);
  }

  // UPDATE record
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body,
  ) {
    return this.usersService.update(id, body);
  }

  // DELETE record
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
```

------------------------------------------------------------------------

# 4️⃣ How Each API Works

### 🔹 GET All Users

**Request:**\
`GET /users`

**Flow:**\
Controller → Service.findAll() → Returns array of users

------------------------------------------------------------------------

### 🔹 GET Single User

**Request:**\
`GET /users/1`

**Flow:**\
Controller extracts `id` → Service.findOne(1) → Returns user

------------------------------------------------------------------------

### 🔹 POST Create User

**Request:**\
`POST /users`\
Body:

``` json
{
  "name": "Bob",
  "email": "bob@test.com"
}
```

**Flow:**\
Controller → Service.create() → Adds new user → Returns created user

------------------------------------------------------------------------

### 🔹 PATCH Update User

**Request:**\
`PATCH /users/1`\
Body:

``` json
{
  "name": "John Updated"
}
```

**Flow:**\
Controller → Service.update(1, body) → Updates fields → Returns updated
user

------------------------------------------------------------------------

### 🔹 DELETE User

**Request:**\
`DELETE /users/1`

**Flow:**\
Controller → Service.remove(1) → Removes user → Returns deleted user

------------------------------------------------------------------------

# 5️⃣ Adding DTO Validation (Best Practice)

### CreateUserDto

``` ts
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
```

Use in controller:

``` ts
@Post()
createUser(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto);
}
```

Enable global validation in **main.ts**:

``` ts
app.useGlobalPipes(new ValidationPipe());
```

------------------------------------------------------------------------

# 🧠 Request Flow Summary

    Client Request
       ↓
    Controller (Route Handler)
       ↓
    Service (Business Logic)
       ↓
    Database (later)
       ↓
    Response to Client

------------------------------------------------------------------------

# 🚀 You Now Know

✔ How to get multiple records\
✔ How to get a single record\
✔ How to create data\
✔ How to update data\
✔ How to delete data\
✔ How controller & service work together

------------------------------------------------------------------------

**Next Step:** Connect this CRUD to a real database (MongoDB/Postgres)
🔥
