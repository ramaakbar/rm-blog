import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const passwordMatch = dto.password.match(dto.passwordConfirmation);

    if (!passwordMatch) throw new BadRequestException('Password do not match');

    const hashedPass = await argon.hash(dto.password);

    try {
      const { id, email, username } = await this.usersRepository.save({
        email: dto.email,
        username: dto.username,
        password: hashedPass,
        picture: 'https://randomuser.me/api/portraits/men/32.jpg',
      });

      return {
        message: 'successfully created account',
        data: {
          id,
          email,
          username,
        },
      };
    } catch (error) {
      if (error.errno === 1062)
        throw new BadRequestException('Credential Taken');
    }
  }

  async login(dto: LoginDto, res: Response) {
    const user = await this.usersRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new UnauthorizedException('Email not found');

    const checkPass = await argon.verify(user.password, dto.password);

    if (!checkPass) throw new UnauthorizedException('Wrong Credentials');

    const payload = { sub: user.id, email: user.email };

    const access_token = this.jwtService.sign(payload);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 300000,
    });

    return {
      message: 'successfully login',
      data: {
        access_token: access_token,
      },
    };
  }

  googleLogin(req, res: Response) {
    if (!req.user) res.redirect(process.env.AUTH_REDIRECT_FAIL);

    const payload = { sub: req.user.id, email: req.user.email };

    const access_token = this.jwtService.sign(payload);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 300000,
    });

    res.redirect(process.env.AUTH_REDIRECT_SUCCESS);
  }
}
