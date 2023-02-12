import { setSeederFactory } from 'typeorm-extension';
import { Post } from 'src/posts/post.entity';

export default setSeederFactory(Post, async (faker) => {
  const post = new Post();
  post.title = faker.random.words(4);
  post.body = faker.lorem.paragraphs(3);
  post.thumbnail = faker.image.image(600, 600, true);
  return post;
});
