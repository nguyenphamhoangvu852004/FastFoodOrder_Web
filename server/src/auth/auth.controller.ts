import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserLoginInputDTO } from './dto/login/auth.user.login.input.dto';
import { ResponseData } from '../globalResponse/globalResponse';
import { HttpMessage, HttpStatus } from '../globalResponse/globalEnumResponse';
import { AuthUserLoginOutputDTO } from './dto/login/auth.user.login.output.dto';
import { AuthUserRegisterInputDTO } from './dto/register/auth.user.register.input.dto';
import { AuthUserRegisterOutputDTO } from './dto/register/auth.user.register.output.dto';

@Controller('auth')
export class AuthController {
  // private authService: AuthService;
  // constructor(authService: AuthService) {
  //   this.authService = authService;
  // }
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginData: AuthUserLoginInputDTO,
  ): Promise<ResponseData<AuthUserLoginOutputDTO>> {
    try {
      return new ResponseData(
        await this.authService.login(loginData),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (err) {
      return new ResponseData(
        err.message(),
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post('register')
  async register(
    @Body() registerData: AuthUserRegisterInputDTO,
  ): Promise<ResponseData<AuthUserRegisterOutputDTO>> {
    try {
      return new ResponseData(
        await this.authService.register(registerData),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (err) {
      return new ResponseData(
        err.message(),
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post('token')
  async refreshToken(@Body() refreshToken: string) {
    if (!refreshToken) {
      return new UnauthorizedException('Refresh token is required');
    } else {
      return this.authService.refreshToken(refreshToken);
    }
  }

  // @Post('logout')
  // async logout() {
  //   return this.authService.logout();
  // }
  //
  // @Post('refresh')
  // async refreshTokens() {
  //   return this.authService.refreshTokens();
  // }
}
