import { CardEntity } from 'src/cards/entities/card.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ManyToOne(() => CardEntity, (card) => card.comments, {
    onDelete: 'CASCADE',
  })
  card: CardEntity;
}
