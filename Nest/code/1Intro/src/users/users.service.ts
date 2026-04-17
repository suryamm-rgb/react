import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {

  constructor(@Inject(forwardRef(()=>AuthService))private readonly authService: AuthService){}// circular dependency

  users: { id: number; name: string; age: number ,  email: string, gender:string, isMarried: boolean, password: String}[] = [
    { id: 1, name: 'John', age: 30, email:"sur@gmail.com", gender: 'male',isMarried: true, password: 'test@123' },
    { id: 2, name: 'Jane', age: 25, email:"sury@gmail.com", gender: 'male',isMarried: true, password: 'test@123'  },
    { id: 3, name: 'Doe', age: 30 , email:"surya@gmail.com", gender: 'male',isMarried: false, password: 'test@123'  },
  ];
  getAllUsers() {
    if(this.authService.isAuthenticated){
      return this.users;
    }
   return 'You are not logged in'
  }
  getUserById(id: Number) {
    return this.users.find((user) => user.id === id);
  }
  createUser(user: { id: number; name: string; age: number, email: string, gender: string , isMarried: boolean, password: String}) {
    this.users.push(user);
  }
}
