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
    description: 'Create an admin user'
  })
  async createAdminUser(): Promise<void> {
    const spin = createSpinner();
    spin.start('creating user...');

    // simulate a long task of 1 seconds
    // const files = await new Promise((done) => setTimeout(() => done(['fileA', 'fileB']), 1000));

    spin.succeed('Admin user created successfully!');
  }
}
