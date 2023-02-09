import { Category } from 'src/categories/category.entity';
import { Comment } from 'src/comments/comment.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column('text')
  body: string;

  @Column('double')
  views: number;

  @Column()
  likes: number;

  @Column()
  thumbnail: number;

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Comment, (comment) => comment.post, {
    eager: true,
  })
  comments: Comment[];
}
