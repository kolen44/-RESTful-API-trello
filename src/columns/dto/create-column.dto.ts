import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Минимальный размер текста 5 букв' })
  text: string;
}
