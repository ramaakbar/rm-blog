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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
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

  async login(dto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new UnauthorizedException('Email not found');

    const checkPass = await argon.verify(user.password, dto.password);

    if (!checkPass) throw new UnauthorizedException('Wrong Credentials');

    const payload = { sub: user.id, email: user.email };

    return {
      message: 'successfully login',
      data: {
        access_token: this.jwtService.sign(payload),
      },
    };
  }
}
