import { ColumnEntity } from 'src/columns/entities/column.entity';
import {
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  telephone_number: string;

  @Column()
  password: string;

  @Column()
  fio: string;

  @Column({ nullable: true })
  tg_id?: string = '';

  @Column({ nullable: true })
  site_url?: string = '';

  @Column({ nullable: true })
  company_name?: string = '';

  @Column({ nullable: true })
  description?: string = '';

  @Column({ nullable: true })
  payments?: string = '';

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  avatar_url?: string = '';

  @Column({ nullable: true })
  activity?: number;

  @Column({ nullable: true })
  role?: string = '';

  @OneToMany(() => ColumnEntity, (column) => column.user)
  columns: ColumnEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
