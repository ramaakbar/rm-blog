import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Post } from 'src/posts/post.entity';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,

    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(id: string, req: Request, createCommentDto: CreateCommentDto) {
    try {
      const post = await this.postsRepository.findOneBy({
        id,
      });

      if (!post) throw new BadRequestException('Post not found');

      const comment = await this.commentsRepository.save({
        user: req.user,
        post: post,
        ...createCommentDto,
      });

      return {
        message: 'successfully create comment',
        data: {
          id: comment.id,
          body: comment.body,
          postId: comment.post.id,
          userId: comment.user.id,
          createdAt: comment.created_at,
          updatedAt: comment.updated_at,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  async findAll(id: string) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) throw new BadRequestException('Post not found');

    const comments = await this.commentsRepository.find({
      where: {
        post: {
          id: post.id,
        },
      },
      select: {
        user: {
          id: true,
          email: true,
          username: true,
          picture: true,
        },
      },
      relations: {
        user: true,
      },
    });

    return {
      message: 'successfully retrieve comments',
      data: comments,
    };
  }

  async update(id: string, req, updateCommentDto: UpdateCommentDto) {
    try {
      const comment = await this.commentsRepository.findOne({
        where: {
          id,
        },
        select: {
          user: {
            id: true,
          },
        },
        relations: {
          user: true,
        },
      });
      console.log({
        userId: req.user.id,
        commentUser: req.user.id,
      });

      if (!comment) throw new BadRequestException('Comment not found');

      if (req.user.id !== comment.user.id && req.user.role !== 'admin')
        throw new ForbiddenException('error, not users comment');

      await this.commentsRepository.update(comment.id, {
        ...updateCommentDto,
      });

      return {
        message: 'successfully update comment',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string, req) {
    try {
      const comment = await this.commentsRepository.findOne({
        where: {
          id,
        },
        select: {
          user: {
            id: true,
          },
        },
        relations: {
          user: true,
        },
      });

      if (!comment) throw new BadRequestException('Comment not found');

      if (req.user.id !== comment.user.id && req.user.role !== 'admin')
        throw new ForbiddenException('error, not users comment');

      await this.commentsRepository.delete(id);

      return {
        message: 'successfully delete comment',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
