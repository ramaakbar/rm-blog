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
  const date = faker.date.between(
    '2022-01-01T00:00:00.000Z',
    '2023-01-31T00:00:00.000Z',
  );
  user.created_at = date;
  user.updated_at = date;
  return user;
});
