import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { ColumnEntity } from './entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, UserEntity])],
  controllers: [ColumnsController],
  providers: [ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
