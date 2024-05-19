// comments.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from 'src/cards/cards.module';
import { CardEntity } from 'src/cards/entities/card.entity';
import { ColumnsModule } from 'src/columns/columns.module'; // Import ColumnsModule
import { ColumnEntity } from 'src/columns/entities/column.entity';
import { CommentsService } from './comments.service';
import { CommentEntity } from './entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardEntity, CommentEntity, ColumnEntity]),
    ColumnsModule, // Add ColumnsModule to the imports array
    CardsModule,
  ],
  providers: [CommentsService],
})
export class CommentsModule {}
