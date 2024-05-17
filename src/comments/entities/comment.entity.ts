import { CardEntity } from 'src/cards/entities/card.entity';
import { ManyToOne } from 'typeorm';

export class CommentEntity {
  @ManyToOne(() => CardEntity, (card) => card.comments, {
    onDelete: 'CASCADE',
  })
  card: CardEntity;
}
