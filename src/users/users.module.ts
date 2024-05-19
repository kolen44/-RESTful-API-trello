import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from 'src/cards/cards.module';
import { CardsService } from 'src/cards/cards.service';
import { CardEntity } from 'src/cards/entities/card.entity';
import { ColumnsModule } from 'src/columns/columns.module';
import { ColumnsService } from 'src/columns/columns.service';
import { ColumnEntity } from 'src/columns/entities/column.entity';
import { CommentsModule } from 'src/comments/comments.module';
import { CommentsService } from 'src/comments/comments.service';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { JwtStrategy } from 'src/strategy/jwt.strategies';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ColumnEntity,
      CardEntity,
      CommentEntity,
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
    ColumnsModule,
    CardsModule,
    CommentsModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    LocalStrategy,
    JwtStrategy,
    ColumnsService,
    CardsService,
    CommentsService,
  ],
})
export class UsersModule {}
