import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Request as ReqExpress } from 'express';
import { JwtAuthGuard, UserAuthGuard } from 'src/auth/guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  create(
    @Param('id') id: string,
    @Request() req: ReqExpress,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(id, req, createCommentDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.commentsService.findAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req: ReqExpress,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, req, updateCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: ReqExpress) {
    return this.commentsService.remove(id, req);
  }
}
