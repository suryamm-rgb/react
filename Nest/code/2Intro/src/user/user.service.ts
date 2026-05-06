import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Profile } from '../profile/entites/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
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
      relations: {
        profile: true,
      },
    });
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
  }

  async deleteUser(id: number) {
    // Find user with profile relation
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    // Delete user first
    await this.userRepository.delete(id);

    // Delete profile next
    if (user.profile) {
      await this.profileRepository.delete(user.profile.id);
    }

    return {
      deleted: true,
    };
  }
}
