import { ColumnEntity } from 'src/columns/entities/column.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CardEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => ColumnEntity, (column) => column.cards, {
    onDelete: 'CASCADE',
  })
  column: ColumnEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.card)
  comments: CommentEntity[];
}
