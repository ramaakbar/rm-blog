import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Category } from 'src/categories/category.entity';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category]), MinioClientModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
