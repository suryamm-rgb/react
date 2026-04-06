import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

// https://localhost:3000/users

@Controller('users')
export class UsersController {
  //   @Get()
  //   public getUsers() {
  //     return 'you set a request to get users';
  //   }
  //   // /users/323
  //   @Get(':id')
  //   getUser(@Param('id') id: string) {
  //     return { id };
  //   }
  //   // /users/323/optional
  //   @Get(':id/:optional')
  //   getUserWithOptional(
  //     @Param('id') id: string,
  //     @Param('optional') optional: string,
  //   ) {
  //     return { id, optional };
  //   }
  //   @Post()
  //   public createUser() {
  //     return 'you set a request to create user';
  //   }
  //   @Get(':id')
  //   getUser(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  //   ) {
  //     return `ID is ${id}, limit is ${limit ?? 'not provided'}`;
  //   }
  //   @Get(':id/:optional')
  //   getUserWithOptional(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Param('optional') optional: string,
  //     @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  //   ) {
  //     return `ID is ${id}, optional is ${optional}, limit is ${limit ?? 'not provided'}`;
  //   }

  //   1. Get All Users
  @Get()
  getUsers() {
    return ['user1', 'user2', 'user3'];
  }
  //   2. Get User by ID (Path Param)
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
  //   3. Get with Multiple Params
  @Get(':id/:role')
  getUserRole(@Param('id') id: string, @Param('role') role: string) {
    return { id, role };
  }
  //   4. Query Parameters (Filtering / Pagination)
  @Get()
  getUsersWithQuery(
    @Query('limit') limit?: string,
    @Query('page') page?: string,
  ) {
    return { limit, page };
  }
}
