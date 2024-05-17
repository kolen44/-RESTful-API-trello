import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { CardEntity } from './cards/entities/card.entity';
import { ColumnsModule } from './columns/columns.module';
import { ColumnEntity } from './columns/entities/column.entity';
import { CommentsModule } from './comments/comments.module';
import { CommentEntity } from './comments/entities/comment.entity';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        entities: [UserEntity, ColumnEntity, CardEntity, CommentEntity],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ColumnsModule,
    CardsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
