import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'typeorm-cursor-pagination';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import * as argon from 'argon2';
import { MinioClientService } from 'src/minio-client/minio-client.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private minioClientService: MinioClientService,
  ) {}

  async create(picture: Express.Multer.File, createUserDto: CreateUserDto) {
    const hashedPass = await argon.hash(createUserDto.password);
    try {
      const picUrl = await this.minioClientService.upload(picture);

      const {
        id,
        email,
        username,
        picture: profilePicture,
      } = await this.usersRepository.save({
        email: createUserDto.email,
        username: createUserDto.username,
        password: hashedPass,
        picture: picUrl,
      });

      return {
        message: 'successfully create user',
        data: {
          id,
          email,
          username,
          profilePicture,
        },
      };
    } catch (error) {
      if (error.errno === 1062)
        throw new BadRequestException('Credential Taken');
    }
  }

  async findAll(query?: { limit: number; page: number; order: string }) {
    const usersCount = await this.usersRepository.count();

    if (!usersCount)
      return {
        message: 'successfuly retrive, but no data',
        data: [],
      };

    const pageCount = Math.ceil(usersCount / query.limit);

    if (query.page > pageCount) throw new BadRequestException('Page not found');

    const users = await this.usersRepository.find({
      select: {
        id: true,
        email: true,
        username: true,
        picture: true,
        role: true,
      },
      order: {
        created_at: Order[query.order.toUpperCase()],
      },
      skip: query.limit * (query.page - 1),
      take: query.limit,
    });
    return {
      message: 'successfully retrieve all users',
      pagination: {
        total: usersCount,
        page_count: pageCount,
        current_page: query.page,
        perPage: query.limit,
        from: (query.page - 1) * query.limit + 1,
        to: (query.page - 1) * query.limit + users.length,
      },
      data: users,
    };
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        picture: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) throw new BadRequestException('User not found');

    return {
      message: 'successfully retrieve user',
      data: user,
    };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    picture: Express.Multer.File,
  ) {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) throw new BadRequestException('User not found');

      let pictureUrl = user.picture;
      if (picture) {
        await this.minioClientService.delete(pictureUrl);
        pictureUrl = await this.minioClientService.upload(picture);
      }

      if (updateUserDto.password)
        updateUserDto.password = await argon.hash(updateUserDto.password);

      await this.usersRepository.update(id, {
        picture: pictureUrl,
        ...updateUserDto,
      });

      return {
        message: 'successfully update user data',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) throw new BadRequestException('User not found');

      await this.usersRepository.delete(id);

      await this.minioClientService.delete(user.picture);

      return {
        message: 'successfully delete user',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
