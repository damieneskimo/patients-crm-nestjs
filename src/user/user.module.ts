import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConsoleModule } from 'nestjs-console';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConsoleModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
