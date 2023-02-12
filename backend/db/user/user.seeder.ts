import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as argon from 'argon2';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);
    await repository.insert({
      email: 'akbar.6b@gmail.com',
      username: 'ramaakbar',
      picture:
        'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg',
      password: await argon.hash('password'),
    });
    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(10);
  }
}
