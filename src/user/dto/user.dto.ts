import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginDto extends PickType(CreateUserDto, ['email', 'password']) {}
