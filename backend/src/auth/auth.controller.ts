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
import { ApiTags } from '@nestjs/swagger';
import { Request as RequestEx, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { GoogleOAuthGuard, JwtAuthGuard } from './guard';

@ApiTags('auth')
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

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  googleLogin() {
    return {};
  }

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  googleRedirect(
    @Request() req: RequestEx,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.googleLogin(req, res);
  }

  @Post('logout')
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
    if (!req.user) {
      return {
        isLoggedIn: false,
        data: {},
      };
    }
    return {
      isLoggedIn: true,
      data: req.user,
    };
  }
}
