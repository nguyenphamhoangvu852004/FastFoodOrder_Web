import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UserResponseDto } from './dto/response.user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  async getAllUser(): Promise<UserResponseDto[]> {
    return await this.usersService.getAllUser();
  }

  @Post('')
  async createUser(
    @Body() createUserDTO: CreateUserDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.create(createUserDTO);
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
