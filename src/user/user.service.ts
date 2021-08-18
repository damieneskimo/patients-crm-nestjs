import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Command, Console, createSpinner } from 'nestjs-console';

@Injectable()
@Console()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.UserRepository.findOne({email});
  }

  @Command({
    command: 'create-admin-user',
    description: 'Create an admin user',
    options: [
        {
            flags: '-n, --name <name>',
            required: true
        },
        {
            flags: '-e, --email <email>',
            required: true
        },
        {
            flags: '-p, --password <password>',
            required: true
        }
    ]
  })
  async createAdminUser(options: CreateUserDto): Promise<void> {    
    const spin = createSpinner();
    spin.start('creating user...');

    const user = new User();
    Object.assign(user, options);
    user.role = 'admin';

    const admin = await this.UserRepository.save(user);
    
    if (admin) {
      spin.succeed('Admin user created successfully!');
    } else {
      spin.fail('Something went wrong when creating the admin user.')
    }
  }
}
