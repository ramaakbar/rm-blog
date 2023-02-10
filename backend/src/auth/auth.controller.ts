import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request as RequestEx, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtAuthGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post()
  login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }

  @Get('logout')
  async logout(
    @Req() req: RequestEx,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (req.cookies && 'access_token' in req.cookies) {
      res.cookie('access_token', '', { expires: new Date() });
      return {
        message: 'Successfuly logout',
      };
    }
    return {
      message: 'No content',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req: RequestEx) {
    return req.user;
  }
}
