import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Новая колонка' })
  @MinLength(5, { message: 'Минимальный размер текста 5 букв' })
  text: string;
}
