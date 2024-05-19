import { CardEntity } from 'src/cards/entities/card.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => CardEntity, (card) => card.comments, {
    onDelete: 'CASCADE',
  })
  card: CardEntity;
}
