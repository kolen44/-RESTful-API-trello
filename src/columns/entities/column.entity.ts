import { CardEntity } from 'src/cards/entities/card.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ColumnEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => UserEntity, (user) => user.columns, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToMany(() => CardEntity, (card) => card.column)
  cards: CardEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
