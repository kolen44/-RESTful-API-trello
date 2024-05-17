import { ColumnEntity } from 'src/columns/entities/column.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ManyToOne, OneToMany } from 'typeorm';

export class CardEntity {
  @ManyToOne(() => ColumnEntity, (column) => column.cards, {
    onDelete: 'CASCADE',
  })
  column: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.card)
  comments: CommentEntity[];
}
