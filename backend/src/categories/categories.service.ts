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
      throw new BadRequestException(error);
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
      const updatedCategory = await this.categoriesRepository.save({
        id,
        name: updateCategoryDto.name,
      });
      return {
        message: 'Category has succesfully updated',
        data: updatedCategory,
      };
    } catch (error) {
      if (error.errno === 1062)
        throw new BadRequestException('Category name is already used');
      throw new BadRequestException(error);
    }
  }
}
