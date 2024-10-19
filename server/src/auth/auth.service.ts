import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';

const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
  },
  {
    id: 2,
    username: 'admin2',
    password: 'admin2',
  },
  {
    id: 3,
    username: 'admin3',
    password: 'admin3',
  },
];

@Injectable()
export class AuthService {
  validateUser({ username, password }: AuthPayloadDto) {
    const findUser = mockUsers.find((user) => user.username === username);
    if (findUser) return null;

    if (password === findUser.password) {
    }
  }
  login(){

  }

  register(){

  }
}
