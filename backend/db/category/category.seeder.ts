import { Category } from 'src/categories/category.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class CategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Category);
    await repository.insert({
      name: 'Technology',
    });
    await repository.insert({
      name: 'Lifestyle',
    });
    await repository.insert({
      name: 'Business',
    });
    await repository.insert({
      name: 'Travel',
    });
    await repository.insert({
      name: 'Health and Fitness',
    });
    await repository.insert({
      name: 'Art and Culture',
    });
    await repository.insert({
      name: 'Sports',
    });
  }
}
