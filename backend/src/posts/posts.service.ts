import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/category.entity';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    private minioClientService: MinioClientService,
  ) {}

  async create(thumbnail: Express.Multer.File, createPostDto: CreatePostDto) {
    try {
      const findCategory = await this.categoriesRepository.findOne({
        where: {
          id: createPostDto.categoryId,
        },
      });
      if (!findCategory) throw new BadRequestException('Category not found');

      const picUrl = await this.minioClientService.upload(thumbnail);

      const post = new Post();
      post.title = createPostDto.title;
      post.body = createPostDto.body;
      post.thumbnail = picUrl;
      post.category = findCategory;

      const createdPost = await this.postsRepository.save(post);

      return {
        message: 'Successfully create new post',
        data: createdPost,
      };
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  async findAll() {
    const posts = await this.postsRepository.find();
    return {
      message: 'successfully retrieve all posts',
      data: posts,
    };
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });
    return {
      message: 'successfully retrive post',
      data: post,
    };
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
