import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const createdCategory = await this.categoriesRepository.save({
        name: createCategoryDto.name,
      });
      return {
        message: 'Successfully create new category',
        data: {
          name: createdCategory.name,
        },
      };
    } catch (error) {
      if (error.errno === 1062)
        throw new BadRequestException('Category name is already used');
      throw new BadRequestException(error.response);
    }
  }

  async findAll() {
    const categories = await this.categoriesRepository.find();
    return {
      message: 'successfully retrieve all categories',
      data: categories,
    };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoriesRepository.findOneBy({ id });

      if (!category) throw new BadRequestException('Category not found');

      await this.categoriesRepository.update(id, updateCategoryDto);
      return {
        message: 'Category has succesfully updated',
      };
    } catch (error) {
      if (error.errno === 1062)
        throw new BadRequestException('Category name is already used');
      throw new BadRequestException(error.message);
    }
  }
}
