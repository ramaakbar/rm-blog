import { BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';

export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { displayName, emails, photos } = profile;

    const user = await this.usersRepository.findOneBy({
      email: emails[0].value,
    });

    if (user) return user;

    const name = displayName.split(' ');
    const username = faker.internet.userName(name[0], name[1]);
    const hashedPass = await argon.hash(randomUUID());

    try {
      const newUser = await this.usersRepository.save({
        email: emails[0].value,
        username: username,
        password: hashedPass,
        picture: photos[0].value,
      });

      delete newUser.password;
      return newUser;
    } catch (error) {
      throw new BadRequestException('Credential Taken');
    }
  }
}
