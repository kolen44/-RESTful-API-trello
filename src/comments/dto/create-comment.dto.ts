import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Новый комментарий' })
  @MinLength(5, { message: 'Минимальный размер текста 5 букв' })
  text: string;
}
