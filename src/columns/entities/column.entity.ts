import { CardEntity } from 'src/cards/entities/card.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ColumnEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  avatar_url: string;

  @ManyToOne(() => UserEntity, (user) => user.columns, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'email' })
  user: UserEntity;

  @OneToMany(() => CardEntity, (columns) => columns.column)
  cards: CardEntity[];

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  url_video?: string;

  @Column({ nullable: true })
  rating?: number;
}
