import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthUserLoginInputDTO } from './dto/login/auth.user.login.input.dto';
import { AuthUserLoginOutputDTO } from './dto/login/auth.user.login.output.dto';
import { AuthUserRegisterInputDTO } from './dto/register/auth.user.register.input.dto';
import { AuthUserRegisterOutputDTO } from './dto/register/auth.user.register.output.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../typeOrm/users';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  hashPassword,
  generateAccessToken,
  generateRefreshToken,
} from './utils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) public userRepo: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async login(abc: AuthUserLoginInputDTO): Promise<AuthUserLoginOutputDTO> {
    const { email, password } = abc;
    // Tìm user theo emil trong database
    const user: Users = await this.userRepo.findOne({
      where: { Email: email },
    });
    // Nếu không có thì quăng ra lỗi
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Kiểm tra password từ request có hợp lệ với password của email hay không
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.Password,
    );
    // Nếu không hợp lệ quăng ra lỗi
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }
    // tạo payload
    const payload: object = { sub: email, password: password };
    // trả về 2 token
    return {
      accessToken: await generateAccessToken(this.jwtService, payload),
      refreshToken: await generateRefreshToken(this.jwtService, payload),
    };
  }

  async register(
    xyz: AuthUserRegisterInputDTO,
  ): Promise<AuthUserRegisterOutputDTO> {
    const { email, phoneNumber, password, passwordConfirm } = xyz;

    if (password.trim() !== passwordConfirm.trim()) {
      throw new BadRequestException('Passwords do not match');
    }

    const existingUser: Users = await this.userRepo.findOne({
      where: { Email: email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const passwordAfterHash: string = await hashPassword(password);
    const newUser: Users = this.userRepo.create({
      Email: email,
      PhoneNumber: phoneNumber,
      Password: passwordAfterHash,
    });
    await this.userRepo.save(newUser);

    return {
      success: true,
      message: 'Registration successful',
    };
  }

  async refreshToken(refreshToken: string): Promise<string> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        ignoreExpiration: false,
      });
      return await generateAccessToken(this.jwtService, payload);
    } catch (error) {
      throw new UnauthorizedException(error.message());
    }
  }
}
