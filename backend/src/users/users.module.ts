import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MinioClientModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
