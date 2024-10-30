import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../typeOrm/users';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UserResponseDto } from './dto/response.user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) public userRepo: Repository<Users>) {}

  // Tạo người dùng mới
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const user = this.userRepo.create(createUserDto);
      await this.userRepo.save(user);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  getAllUser() {
    return this.userRepo.find();
  }

  // findUserById(id: number) {
  //   return this.userRepo.findOne({ where: { UserID: id } });
  // }
}
