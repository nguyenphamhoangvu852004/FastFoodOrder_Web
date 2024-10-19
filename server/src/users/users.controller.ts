import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from '../typeOrm/users';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  async getAllUser(): Promise<ResponseData<Users[]>> {
    try {
      const list = this.usersService.getAllUser();
      if ((await list).length > 0) {
        return new ResponseData<Users[]>(
          await this.usersService.getAllUser(),
          HttpStatus.SUCCESS_CODE,
          HttpMessage.SUCCESS_MESS,
        );
      } else {
        throw new Error();
      }
    } catch (error) {
      return new ResponseData<Users[]>(
        await error,
        HttpStatus.ERROR_CODE,
        HttpMessage.ERROR_MESS,
      );
    }
  }
  @Post('')
  async createUser(@Body() requestBody: Users): Promise<ResponseData<Users>> {
    try {
      const soLuongHienTai = (await this.usersService.getAllUser()).length;
      const entitySauKhiThem = await this.usersService.create(requestBody);
      if (soLuongHienTai < (await this.usersService.getAllUser()).length)
        return new ResponseData<Users>(
          entitySauKhiThem,
          HttpStatus.SUCCESS_CODE,
          HttpMessage.SUCCESS_MESS,
        );
    } catch (error) {
      return new ResponseData<Users>(
        await error,
        HttpStatus.ERROR_CODE,
        HttpMessage.ERROR_MESS,
      );
    }
  }
  // @Get(':id')
  // async getUserById(@Body() requestBody: number): Promise<ResponseData<Users>> {
  //   try {
  //     return new ResponseData<Users>(
  //       await this.usersService.findUserById(requestBody),
  //       HttpStatus.SUCCESS_CODE,
  //       HttpMessage.SUCCESS_MESS,
  //     );
  //   } catch (error) {
  //     return new ResponseData<Users>(
  //       await error,
  //       HttpStatus.ERROR_CODE,
  //       HttpMessage.ERROR_MESS,
  //     );
  //   }
  // }
}
