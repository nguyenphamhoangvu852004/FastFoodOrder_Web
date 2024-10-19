import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../typeOrm/users';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) public userRepo: Repository<Users>) {}

  create(requestBody: any) {
    const user = this.userRepo.create(requestBody);
    return this.userRepo.save(user);
  }

  getAllUser() {
    return this.userRepo.find();
  }

  findUserById(id: number) {
    return this.userRepo.findOne({ where: { UserID: id } });
  }
}
