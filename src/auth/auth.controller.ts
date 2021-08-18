import { Body, Controller, Get, HttpException, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findMe(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('users/login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }
}
