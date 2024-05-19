import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnsService } from 'src/columns/columns.service';
import { ColumnEntity } from 'src/columns/entities/column.entity';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
    private readonly columnService: ColumnsService,
  ) {}

  async createCard(createCardDto: CreateCardDto, columnId: number) {
    const existCard = await this.cardRepository.findOne({
      where: { text: createCardDto.text },
    });
    if (existCard)
      throw new BadRequestException(
        'Существует проверка на уникальные карточки у пользователя и она не пройдена',
      );
    const existColumn: ColumnEntity =
      await this.columnService.findMyColumn(columnId);
    if (!existColumn)
      throw new NotFoundException('Не найдено колонки с таким айди');
    const card = new CardEntity();
    card.text = createCardDto.text;
    card.column = existColumn;
    await this.cardRepository.save(card);
    return 'Карточка успешно сохранена в базу данных';
  }

  async findOne(userId: number, columnId: number, id: number) {
    const column = await this.columnService.findOne(userId, columnId);
    const existCard = await this.cardRepository.findOne({
      where: { id, column: { id: column.id } },
      relations: ['column'],
    });
    if (!existCard) throw new BadRequestException('Данной карточки не найдено');
    return existCard;
  }

  async findMyCard(id: number, column: ColumnEntity): Promise<CardEntity> {
    const existCard = await this.cardRepository.findOne({
      where: { id, column: { id: column.id } },
      relations: ['column'],
    });
    if (!existCard) throw new BadRequestException('Данной карточки не найдено');
    return existCard;
  }

  async updateCard(
    columnId: number,
    cardId: number,
    updateCardDto: UpdateCardDto,
  ) {
    const column: ColumnEntity =
      await this.columnService.findMyColumn(columnId);
    if (!column) throw new NotFoundException('Колонки с таким айди не найдено');
    const card: CardEntity = await this.cardRepository.findOne({
      where: { id: cardId, column: { id: column.id } },
      relations: ['column'],
    });
    if (!card)
      return new UnauthorizedException(
        'Проверьте айди карточки, так как сервер не может ее найти',
      );
    await this.cardRepository.update(card.id, updateCardDto);
    return 'Карточка успешно изменена';
  }

  async deleteCard(columnId: number, id: number) {
    const column: ColumnEntity =
      await this.columnService.findMyColumn(columnId);
    if (!column) throw new NotFoundException('Данной колонки не найдено');
    const card: CardEntity = await this.cardRepository.findOne({
      where: { id, column: { id: column.id } },
      relations: ['column'],
    });
    if (!card)
      throw new UnauthorizedException(
        'Проверьте айди карточки, так как сервер не может ее найти',
      );
    return this.cardRepository.delete(card.id);
  }
}
