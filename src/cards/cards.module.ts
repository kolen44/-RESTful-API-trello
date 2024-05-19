// src/cards/cards.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsModule } from 'src/columns/columns.module'; // Import ColumnsModule
import { CardsService } from './cards.service';
import { CardEntity } from './entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity]), ColumnsModule],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
