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
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
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
@ApiTags('crud-trello')
@ApiBearerAuth() // Add Bearer token for the whole controller
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly columnService: ColumnsService,
    private readonly cardService: CardsService,
    private readonly commentService: CommentsService,
  ) {}

  @Post('/reg')
  @ApiTags('user')
  @ApiBody({ type: CreateUserDto })
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiTags('user')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  findOne(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Post('/login')
  @ApiTags('user')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.userService.login(req.user);
  }

  @Delete(':id')
  @ApiTags('user')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  async deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @Patch(':id')
  @ApiTags('user')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiTags('columns')
  @Post('columns')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateColumnDto })
  async createColumn(@Body() data: CreateColumnDto, @Req() request) {
    return this.columnService.createColumn(data, request.user);
  }

  @Post('columns/:columnId/cards')
  @ApiTags('cards')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'columnId', type: Number, description: 'ID of the column' })
  @ApiBody({ type: CreateCardDto })
  async createCard(
    @Param('columnId') columnId: number,
    @Body() data: CreateCardDto,
  ) {
    return this.cardService.createCard(data, columnId);
  }

  @Post('columns/:columnId/cards/:cardId/comments')
  @ApiTags('comments')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'columnId', type: Number, description: 'ID of the column' })
  @ApiParam({ name: 'cardId', type: Number, description: 'ID of the card' })
  @ApiBody({ type: CreateColumnDto })
  async createComment(
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
    @Body() data: CreateColumnDto,
  ) {
    return this.commentService.createComment(data, columnId, cardId);
  }

  @Get(':userId/columns/:id')
  @ApiTags('columns')
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the column' })
  async findColumn(@Param('userId') userId: number, @Param('id') id: number) {
    return this.columnService.findOne(userId, id);
  }

  @Get(':userId/columns/:columnId/cards/:id')
  @ApiTags('cards')
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' })
  @ApiParam({ name: 'columnId', type: Number, description: 'ID of the column' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the card' })
  async findCard(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
    @Param('id') id: number,
  ) {
    return this.cardService.findOne(userId, columnId, id);
  }

  @Get(':userId/columns/:columnId/cards/:cardId/comments/:commentId')
  @ApiTags('comments')
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' })
  @ApiParam({ name: 'columnId', type: Number, description: 'ID of the column' })
  @ApiParam({ name: 'cardId', type: Number, description: 'ID of the card' })
  @ApiParam({
    name: 'commentId',
    type: Number,
    description: 'ID of the comment',
  })
  async findComment(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
    @Param('commentId') commentId: number,
  ) {
    return this.commentService.findComment(userId, columnId, cardId, commentId);
  }

  @Patch('columns/:id')
  @ApiTags('columns')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'ID of the column' })
  @ApiBody({ type: UpdateColumnDto })
  async updateColumn(
    @Param('id') id: number,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnService.updateColumn(id, updateColumnDto);
  }

  @Patch('columns/:columnId/cards/:cardId')
  @ApiTags('cards')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'columnId', type: Number, description: 'ID of the column' })
  @ApiParam({ name: 'cardId', type: Number, description: 'ID of the card' })
  @ApiBody({ type: UpdateCardDto })
  async updateCard(
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardService.updateCard(columnId, cardId, updateCardDto);
  }

  @Patch('columns/:columnId/cards/:cardId/comments/:commentId')
  @ApiTags('comments')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'columnId', type: Number, description: 'ID of the column' })
  @ApiParam({ name: 'cardId', type: Number, description: 'ID of the card' })
  @ApiParam({
    name: 'commentId',
    type: Number,
    description: 'ID of the comment',
  })
  @ApiBody({ type: UpdateCommentDto })
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
  @ApiTags('comments')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'columnId', type: Number, description: 'ID of the column' })
  @ApiParam({ name: 'cardId', type: Number, description: 'ID of the card' })
  @ApiParam({
    name: 'commentId',
    type: Number,
    description: 'ID of the comment',
  })
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
  @ApiTags('columns')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'ID of the column' })
  async deleteColumn(@Param('id') id: number) {
    return this.columnService.deleteColumn(id);
  }

  @Delete('columns/:columnId/cards/:id')
  @ApiTags('cards')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'columnId', type: Number, description: 'ID of the column' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the card' })
  async deleteCard(
    @Param('columnId') columnId: number,
    @Param('id') id: number,
  ) {
    return this.cardService.deleteCard(columnId, id);
  }
}
