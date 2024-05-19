import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Минимальный размер текста 5 букв' })
  text: string;
}
