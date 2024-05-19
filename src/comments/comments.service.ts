import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsService } from 'src/cards/cards.service';
import { CardEntity } from 'src/cards/entities/card.entity';
import { ColumnsService } from 'src/columns/columns.service';
import { ColumnEntity } from 'src/columns/entities/column.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
    private readonly columnService: ColumnsService,
    private readonly cardService: CardsService,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    columnId: number,
    cardId: number,
  ) {
    const column: ColumnEntity =
      await this.columnService.findMyColumn(columnId);
    if (!column) throw new NotFoundException('Колонки с таким айди не найдено');
    const card: CardEntity = await this.cardService.findMyCard(cardId, column);
    const comment = new CommentEntity();
    comment.text = createCommentDto.text;
    comment.card = card;
    await this.commentRepository.save(comment);
    return 'Комментарий успешно сохранена в базу данных';
  }

  async updateComment(
    columnId: number,
    cardId: number,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    const column: ColumnEntity =
      await this.columnService.findMyColumn(columnId);

    const card: any = await this.cardService.findMyCard(cardId, column);
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, card: { id: card.id } },
      relations: ['card'],
    });
    if (!comment)
      throw new NotFoundException('Комментарий с таким айди не найден');
    return this.commentRepository.update(comment.id, updateCommentDto);
  }

  async findComment(
    userId: number,
    columnId: number,
    cardId: number,
    commentId: number,
  ) {
    const column: ColumnEntity = await this.columnService.findOne(
      userId,
      columnId,
    );
    if (!column) throw new NotFoundException('Колонки с таким айди не найдено');
    const card = await this.cardService.findOne(userId, columnId, cardId);
    if (!card)
      throw new NotFoundException('Такой карточки в этой колонке не найдено');
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, card: { id: card.id } },
      relations: ['card'],
    });
    if (!comment)
      throw new NotFoundException('Комментарий с таким айди не найден');
    return comment;
  }

  async deleteComment(
    userId,
    columnId: number,
    cardId: number,
    commentId: number,
  ) {
    const card: any = await this.cardService.findOne(userId, columnId, cardId);
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, card: { id: card.id } },
      relations: ['card'],
    });
    if (!comment)
      throw new NotFoundException('Комментарий с таким айди не найден');
    return this.commentRepository.delete(comment.id);
  }
}
