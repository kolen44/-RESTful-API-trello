import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty({ message: 'Текст не должен быть пустым' })
  @IsString({ message: 'Текст должен быть типом string...' })
  @MinLength(5, { message: 'Минимальная длина должна быть 5 символов' })
  text: string;
}
