import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'typeorm-cursor-pagination';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
