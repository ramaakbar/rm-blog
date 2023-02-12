import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Post } from 'src/posts/post.entity';
import { Category } from 'src/categories/category.entity';
import { randomInt } from 'crypto';

export default class PostSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repositoryCategory = dataSource.getRepository(Category);
    const repositoryPost = dataSource.getRepository(Post);
    const postFactory = factoryManager.get(Post);

    const categories = await repositoryCategory.find();

    const posts = await Promise.all(
      Array(30)
        .fill('')
        .map(async () => {
          const randomCategories = await repositoryCategory.findOne({
            where: {
              id: randomInt(categories.length) + 1,
            },
          });
          const postMade = await postFactory.make({
            category: randomCategories,
          });
          return postMade;
        }),
    );
    await repositoryPost.save(posts);
  }
}
