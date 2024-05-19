import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @ApiProperty({ default: 'test@gmail.com' })
  @MinLength(10, { message: 'Минимальная длина 10 символов' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'qwerty1234' })
  @MinLength(5, { message: 'Минимальная длина 5 символов' })
  password: string;
}
