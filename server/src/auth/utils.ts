// utils.ts
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// Hàm hash mật khẩu
export const hashPassword = async (password: string): Promise<string> => {
  const saltRound = 10;
  return await bcrypt.hash(password, saltRound);
};

// Hàm tạo access token
export const generateAccessToken = async (
  jwtService: JwtService,
  payload: any,
): Promise<string> => {
  return jwtService.signAsync(payload, {
    secret: 'at-secret',
    expiresIn: 60 * 15, // 15 phút
  });
};

// Hàm tạo refresh token
export const generateRefreshToken = async (
  jwtService: JwtService,
  payload: any,
): Promise<string> => {
  return jwtService.signAsync(payload, {
    secret: 'rt-secret',
    expiresIn: 60 * 60 * 24 * 7, // 7 ngày
  });
};
