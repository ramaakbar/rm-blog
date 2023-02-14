import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsString()
  @IsNotEmpty()
  role: UserRole;
}
