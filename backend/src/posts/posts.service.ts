import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/category.entity';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { buildPaginator, Order } from 'typeorm-cursor-pagination';
import { CreatePostDto, UpdatePostDto } from './dto';
import slugify from 'slugify';

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
      const category = await this.categoriesRepository.findOne({
        where: {
          id: createPostDto.categoryId,
        },
      });
      if (!category) throw new BadRequestException('Category not found');

      const picUrl = await this.minioClientService.upload(thumbnail);

      const post = new Post();
      post.title = createPostDto.title;
      post.slug = slugify(createPostDto.title, '-');
      post.body = createPostDto.body;
      post.thumbnail = picUrl;
      post.category = category;

      const createdPost = await this.postsRepository.save(post);

      return {
        message: 'Successfully create new post',
        data: createdPost,
      };
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  async findAll(query?: {
    limit: number;
    nextCursor: string;
    prevCursor: string;
    category: string;
    order: string;
    search: string;
  }) {
    const category = await this.categoriesRepository.findOneBy({
      name: query.category,
    });

    if (!category) throw new BadRequestException('Category not found');

    let queryBuilder = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .select([
        'post.id',
        'post.title',
        'post.slug',
        'post.body',
        'post.views',
        'post.likes',
        'post.thumbnail',
        'post.created_at',
        'post.updated_at',
        'category.id',
        'category.name',
      ]);

    if (query.category !== null)
      queryBuilder = queryBuilder.where('post.category = :category', {
        category: category.id,
      });

    if (query.search !== null)
      queryBuilder = queryBuilder.where('post.title like :title', {
        title: `%${query.search}%`,
      });

    const postCount = await queryBuilder.getCount();

    const paginator = buildPaginator({
      entity: Post,
      paginationKeys: ['created_at'],
      query: {
        limit: query.limit,
        order: Order[query.order.toUpperCase()],
        afterCursor: query.nextCursor,
        beforeCursor: query.prevCursor,
      },
    });

    const { data, cursor } = await paginator.paginate(queryBuilder);
    return {
      message: 'successfully retrieve all posts',
      pagination: {
        next_cursor: cursor.afterCursor,
        prev_cursor: cursor.beforeCursor,
        count: postCount,
      },
      data,
    };
  }

  async findAllOffset(query?: {
    limit: number;
    page: number;
    category: string;
  }) {
    const category = await this.categoriesRepository.findOneBy({
      name: query.category,
    });

    if (!category) throw new BadRequestException('Category not found');

    const postsCount = await this.postsRepository.count();

    if (!postsCount)
      return {
        message: 'succesffuly retreive, but no data',
        data: [],
      };

    const pageCount = Math.ceil(postsCount / query.limit);

    if (query.page > pageCount) throw new BadRequestException('Page not found');

    const posts = await this.postsRepository.find({
      order: {
        created_at: 'DESC',
      },
      skip: query.limit * (query.page - 1),
      take: query.limit,
    });

    return {
      message: 'successfully retrieve all posts',
      pagination: {
        total: postsCount,
        page_count: pageCount,
        current_page: query.page,
        perPage: query.limit,
        from: (query.page - 1) * query.limit + 1,
        to: (query.page - 1) * query.limit + posts.length,
      },
      data: posts,
    };
  }

  async findOne(id: string) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
      select: {
        category: {
          id: true,
          name: true,
        },
      },
      relations: {
        category: true,
      },
    });

    if (!post) throw new BadRequestException('Post not found');

    return {
      message: 'successfully retrieve post',
      data: post,
    };
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    thumbnail: Express.Multer.File,
  ) {
    try {
      const post = await this.postsRepository.findOne({
        where: {
          id,
        },
      });

      if (!post) throw new BadRequestException('Post not found');

      let thumbnailUrl = post.thumbnail;

      if (thumbnail) {
        await this.minioClientService.delete(thumbnailUrl);
        thumbnailUrl = await this.minioClientService.upload(thumbnail);
      }

      if (updatePostDto.title) {
        await this.postsRepository.update(id, {
          thumbnail: thumbnailUrl,
          slug: slugify(updatePostDto.title),
          ...updatePostDto,
        });
      } else {
        await this.postsRepository.update(id, {
          thumbnail: thumbnailUrl,
          ...updatePostDto,
        });
      }

      return {
        message: 'successfully update post',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const post = await this.postsRepository.findOne({
        where: {
          id,
        },
      });

      if (!post) throw new BadRequestException('Post not found');

      await this.postsRepository.delete(id);
      await this.minioClientService.delete(post.thumbnail);
      return {
        message: 'successfully delete post',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
