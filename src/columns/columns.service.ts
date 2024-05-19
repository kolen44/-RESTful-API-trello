import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnEntity } from './entities/column.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createColumn(createColumnDto: CreateColumnDto, user: UserEntity) {
    const existColumn = await this.columnRepository.findOne({
      where: { text: createColumnDto.text },
    });
    console.log(existColumn, createColumnDto.text);
    if (existColumn || createColumnDto.text.length === 0)
      throw new BadRequestException(
        'Существует проверка на уникальные column у пользователя и она не пройдена или длина текста равна нулю',
      );
    const column = new ColumnEntity();
    column.text = createColumnDto.text;
    column.user = user;
    await this.columnRepository.save(column);
    return 'Column Успешно сохранено в базу данных';
  }

  async findOne(userId: number, id: number): Promise<ColumnEntity> {
    const existColumn = await this.columnRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });
    if (!existColumn)
      throw new BadRequestException('Данной колонки не найдено');
    return existColumn;
  }

  public async findMyColumn(id: number): Promise<ColumnEntity> {
    const existColumn = await this.columnRepository.findOne({
      where: { id },
    });
    if (!existColumn)
      throw new BadRequestException('Данной колонки не найдено');
    return existColumn;
  }

  async updateColumn(id: number, updateColumnDto: UpdateColumnDto) {
    console.log('vchod');
    const column = await this.columnRepository.findOne({ where: { id } });
    console.log('vichod');
    if (!column)
      return new UnauthorizedException(
        'Проверьте айди колонки, так как сервер не может ее найти',
      );
    console.log(column);
    return this.columnRepository.update(column.id, updateColumnDto);
  }

  async deleteColumn(id: number) {
    const column = await this.columnRepository.findOne({ where: { id } });
    if (!column)
      return new UnauthorizedException(
        'Проверьте айди колонки, так как сервер не может ее найти',
      );
    return this.columnRepository.delete(column.id);
  }
}
