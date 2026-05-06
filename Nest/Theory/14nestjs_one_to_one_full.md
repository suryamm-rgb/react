# 📘 NestJS One-to-One Relationship (User & Profile)

------------------------------------------------------------------------

## 📌 What is One-to-One?

A **One-to-One relationship** means:

👉 One record in one table is linked to exactly one record in another
table.

### Example:

-   One User → One Profile
-   One Profile → One User

------------------------------------------------------------------------

## 🤔 Why to Use?

Use One-to-One when:

-   You want to **split large data**
-   Keep optional fields separate
-   Improve **readability & scalability**
-   Maintain clean database design

------------------------------------------------------------------------

## 📍 Where to Use?

Real-world examples:

-   User ↔ Profile\
-   User ↔ Address\
-   Employee ↔ ID Card\
-   Student ↔ Marksheet

------------------------------------------------------------------------

## 🧠 How it works in DB

-   `user` table has `profileId`
-   `profile` table has actual data
-   They are linked via **foreign key**

------------------------------------------------------------------------

# 🛠️ Full Implementation (All in One)

------------------------------------------------------------------------

## ✅ Profile DTO

``` ts
import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;
}
```

------------------------------------------------------------------------

## ✅ Profile Entity

``` ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
```

------------------------------------------------------------------------

## ✅ Profile Controller

``` ts
import { Controller, Post, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }
}
```

------------------------------------------------------------------------

## ✅ Profile Service

``` ts
import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  create(createProfileDto: CreateProfileDto) {
    return {
      message: 'Profile created successfully',
      data: createProfileDto,
    };
  }
}
```

------------------------------------------------------------------------

## ✅ Profile Module

``` ts
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
```

------------------------------------------------------------------------

## ✅ User DTO

``` ts
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProfileDto } from '../../profile/dto/create-profile.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isMarried?: boolean;

  profile?: CreateProfileDto;
}
```

------------------------------------------------------------------------

## ✅ User Entity

``` ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from '../../profile/entites/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ default: false })
  isMarried?: boolean;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
  })
  @JoinColumn()
  profile: Profile;
}
```

------------------------------------------------------------------------

## ✅ User Controller

``` ts
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(Number(id));
  }
}
```

------------------------------------------------------------------------

## ✅ User Module

``` ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from '../profile/entites/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

------------------------------------------------------------------------

## ✅ User Service

``` ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto) {
    userDto.profile = userDto.profile ?? {
      firstName: '',
      lastName: '',
      age: 0,
    };

    const user = this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find({
      relations: ['profile'],
    });
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
```

------------------------------------------------------------------------

# 🔥 Key Concepts

  Feature           Explanation
  ----------------- ----------------------
  `@OneToOne`       Defines relationship
  `@JoinColumn`     Creates foreign key
  `cascade: true`   Auto saves profile
  `relations`       Fetch related data

------------------------------------------------------------------------

# 🚀 Example API Request

``` json
{
  "name": "Surya",
  "email": "surya@gmail.com",
  "profile": {
    "firstName": "Surya",
    "lastName": "Gowda",
    "age": 24
  }
}
```

------------------------------------------------------------------------

# 🧠 Summary

-   One-to-One = One record ↔ One record\
-   Used for clean DB design\
-   Cascade helps auto-save\
-   JoinColumn defines ownership
