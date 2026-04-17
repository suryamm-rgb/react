/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserParamDto } from './dto/get-users-params.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //   @Get()
  //   getUsers() {
  //     // return 'You made the request to get all users';
  //     const usersService = new UsersService();
  //     return usersService.getAllUsers();
  //   }
  // @Get()
  // getUsers(@Query() query: any) {
  //   if (query.age) {
  //     return this.usersService
  //       .getAllUsers()
  //       .filter((user) => user.age === Number(query.age));
  //   }

  //   return this.usersService.getAllUsers();
  // }
///////example for pipe lines
  //   @Get()
  // getUsers(@Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit: number, 
  //         @Query('page',new DefaultValuePipe(1), ParseIntPipe) page: number) {
  //           console.log('limit', limit)
  //           console.log('page', page)

  //   return this.usersService.getAllUsers();
  // }
//   @Get()
// getUsers() {
//   return this.usersService.getAllUsers();
// }
@Get()
getAllUsers() {
  return this.usersService.getAllUsers();
}
     @Get(':isMarried')
  getUsers(@Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit: number, 
          @Query('page',new DefaultValuePipe(1), ParseIntPipe) page: number,
          @Param() param: GetUserParamDto) {
            console.log('limit', limit)
            console.log('page', page)
            console.log(param)

    return this.usersService.getAllUsers();
  }
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(Number(id)); //string to number conversion
  }
  // @Get(':id')
  // getUserById(@Param('id', ParseIntPipe) id: any) {
  //   // console.log('ID:', id); // Log the ID to verify it's being parsed correctly
  //   // console.log(typeof id, id)
  //   return this.usersService.getUserById(Number(id)); //string to number conversion
  // }

  // @Post()
  // createUser() {
  //   // return 'You made the request to create a user';
  //   const user = { id: 5, name: 'Marry', age: 28 , email:'s@gmail.com', gender:'female'};
  //   const usersService = new UsersService();
  //   usersService.createUser(user);
  //   return 'A new User has been created with the following details:';
  // }
   @Post()
  // createUser(@Body(new ValidationPipe()) user: CreateUserDto) {
    createUser(@Body() user: CreateUserDto) {// new ValidationPipe() main on the main.ts that why we remove here or validation pipe globally
      console.log('user', user)
    return 'A new user has been create successfully'
  }
  @Patch()
  updateUser(@Body() user: UpdateUserDto){
    console.log(user)
    return 'User updated successfully'
  }
}
