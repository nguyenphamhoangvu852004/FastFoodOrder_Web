import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthUserRegisterInputDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;
}
