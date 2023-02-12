import { User } from 'src/users/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import * as argon from 'argon2';

export default setSeederFactory(User, async (faker) => {
  const user = new User();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  user.email = faker.internet.email(firstName, lastName);
  user.username = faker.internet.userName(firstName, lastName);
  user.picture = faker.internet.avatar();
  user.password = await argon.hash('password');
  return user;
});
