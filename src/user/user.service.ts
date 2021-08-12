import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserRO } from './interfaces';
import * as bcrypt from 'bcrypt';
import { Command, Console, createSpinner } from 'nestjs-console';

@Injectable()
@Console()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>
  ) {}

  async findByCredentials({email, password}: LoginDto): Promise<User> {
    const user = await this.UserRepository.findOne({email});
    if (! user) {
      return null;
    }
    
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }

  generateToken(user: User): string {
    return ''
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
