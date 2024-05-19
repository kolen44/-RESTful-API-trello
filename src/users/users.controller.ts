import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CardsService } from 'src/cards/cards.service';
import { CreateCardDto } from 'src/cards/dto/create-card.dto';
import { UpdateCardDto } from 'src/cards/dto/update-card.dto';
import { ColumnsService } from 'src/columns/columns.service';
import { CreateColumnDto } from 'src/columns/dto/create-column.dto';
import { UpdateColumnDto } from 'src/columns/dto/update-column.dto';
import { CommentsService } from 'src/comments/comments.service';
import { UpdateCommentDto } from 'src/comments/dto/update-comment.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly columnService: ColumnsService,
    private readonly cardService: CardsService,
    private readonly commentService: CommentsService,
  ) {}

  @Post('/reg')
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.userService.login(req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Post('columns')
  @UseGuards(JwtAuthGuard)
  async createColumn(@Body() data: { text: string }, @Req() request) {
    return this.columnService.createColumn(data, request.user);
  }

  @Post('columns/:columnId/cards')
  @UseGuards(JwtAuthGuard)
  async createCard(
    @Param('columnId') columnId: number,
    @Body() data: CreateCardDto,
  ) {
    return this.cardService.createCard(data, columnId);
  }

  @Post('columns/:columnId/cards/:cardId/comments')
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
    @Body() data: CreateColumnDto,
  ) {
    return this.commentService.createComment(data, columnId, cardId);
  }

  @Get(':userId/columns/:id')
  async findColumn(@Param('userId') userId: number, @Param('id') id: number) {
    return this.columnService.findOne(userId, id);
  }

  @Get(':userId/columns/:columnId/cards/:id')
  async findCard(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
    @Param('id') id: number,
  ) {
    return this.cardService.findOne(userId, columnId, id);
  }

  @Get(':userId/columns/:columnId/cards/:cardId/comments/:commentId')
  async findComment(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
    @Param('commentId') commentId: number,
  ) {
    return this.commentService.findComment(userId, columnId, cardId, commentId);
  }

  @Patch('columns/:id')
  @UseGuards(JwtAuthGuard)
  async updateColumn(
    @Param('id') id: number,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnService.updateColumn(id, updateColumnDto);
  }

  @Patch('columns/:columnId/cards/:cardId')
  @UseGuards(JwtAuthGuard)
  async updateCard(
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardService.updateCard(columnId, cardId, updateCardDto);
  }

  @Patch('columns/:columnId/cards/:cardId/comments/:commentId')
  @UseGuards(JwtAuthGuard)
  async updateComment(
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(
      columnId,
      cardId,
      commentId,
      updateCommentDto,
    );
  }

  @Delete('columns/:columnId/cards/:cardId/comments/:commentId')
  @UseGuards(JwtAuthGuard)
  async deleteComment(
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
    @Param('commentId') commentId: number,
    @Req() req,
  ) {
    return this.commentService.deleteComment(
      req.user.id,
      columnId,
      cardId,
      commentId,
    );
  }

  @Delete('columns/:id')
  @UseGuards(JwtAuthGuard)
  async deleteColumn(@Param('id') id: number) {
    return this.columnService.deleteColumn(id);
  }

  @Delete('columns/:columnId/cards/:id')
  @UseGuards(JwtAuthGuard)
  async deleteCard(
    @Param('columnId') columnId: number,
    @Param('id') id: number,
  ) {
    return this.cardService.deleteCard(columnId, id);
  }
}
