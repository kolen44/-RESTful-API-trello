import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(10, { message: 'Минимальная длина 10 символов' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Минимальная длина 5 символов' })
  password: string;
}
