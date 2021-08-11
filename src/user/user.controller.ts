import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.dto';
import { UserRO } from './interfaces';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  findMe(@Req() req) {
    return req.user;
  }

  @Post('users/login')
  async login(@Body('user') loginDto: LoginDto): Promise<UserRO> {
    const _user = await this.userService.findByCredentials(loginDto);

    if (! _user) {
        throw new HttpException('User not found', 401);
    }

    const token = await this.userService.generateToken(_user);
    const {name, email} = _user;
    const user = {name, email, token};
    return {user};
  }
}
