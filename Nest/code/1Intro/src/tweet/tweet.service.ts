import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class TweetService {
    constructor(private readonly userService: UsersService){}
    tweets:{text:String, date: Date, userId: Number}[]=
[
        {text: 'some tweet', date: new Date('2024-11-12'), userId:1},
        {text: 'some ', date: new Date('2024-11-13'), userId:2},
        {text: 'some twee', date: new Date('2024-11-12'), userId:3},
]
   GetTweets(userId: number) {
  const user = this.userService.getUserById(userId);

  if (!user) {
    throw new Error('User not found'); 
  }

  const tweets = this.tweets.filter((t) => t.userId === userId);
  return tweets.map((t) => ({
    text: t.text,
    date: t.date,
    name: user.name,
    email: user.email
  }));
}
    }

