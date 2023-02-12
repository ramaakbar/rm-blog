import { Category } from 'src/categories/category.entity';
import { Comment } from 'src/comments/comment.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  body: string;

  @Column('double', {
    default: 0,
  })
  views: number;

  @Column('double', { default: 0 })
  likes: number;

  @Column({ nullable: true })
  thumbnail: string;

  @ManyToOne(() => Category, (category) => category.posts)
  category: Category;

  @OneToMany(() => Comment, (comment) => comment.post, {
    eager: true,
  })
  comments: Comment[];
}
