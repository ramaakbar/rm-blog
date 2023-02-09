import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

const configService = new ConfigService();

config();
export const jwtConstants = {
  secret: configService.get('JWT_SECRET'),
};
