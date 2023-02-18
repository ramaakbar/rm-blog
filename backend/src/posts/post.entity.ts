import { Category } from 'src/categories/category.entity';
import { Comment } from 'src/comments/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  slug: string;

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

  @OneToMany(() => Comment, (comment) => comment.post, {})
  comments: Comment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
