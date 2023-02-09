import { ConfigService } from '@nestjs/config';
import { Category } from 'src/categories/category.entity';
import { Comment } from 'src/comments/comment.entity';
import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

const configService = new ConfigService();

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [User, Post, Comment, Category],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
