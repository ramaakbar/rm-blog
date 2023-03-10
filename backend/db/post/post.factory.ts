import { setSeederFactory } from 'typeorm-extension';
import { Post } from 'src/posts/post.entity';
import slugify from 'slugify';

export default setSeederFactory(Post, async (faker) => {
  const post = new Post();
  const title = faker.random.words(4);
  post.title = title;
  post.slug = slugify(title, '-');
  post.body = faker.lorem.paragraphs(3);
  post.thumbnail = faker.image.image(600, 600, true);
  const date = faker.date.between(
    '2022-01-01T00:00:00.000Z',
    '2023-01-31T00:00:00.000Z',
  );
  post.created_at = date;
  post.updated_at = date;
  return post;
});
