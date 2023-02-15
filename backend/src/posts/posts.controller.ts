import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AdminAuthGuard } from 'src/auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto, UpdatePostDto } from './dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AdminAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  @ApiConsumes('multipart/form-data')
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
        ],
      }),
    )
    thumbnail: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create(thumbnail, createPostDto);
  }

  @Get()
  findAll(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit?: number,
    @Query('next', new DefaultValuePipe(null)) nextCursor?: string,
    @Query('prev', new DefaultValuePipe(null)) prevCursor?: string,
    @Query('category', new DefaultValuePipe(null)) category?: string,
    @Query('order', new DefaultValuePipe('desc')) order?: string,
    @Query('q', new DefaultValuePipe(null)) search?: string,
  ) {
    return this.postsService.findAll({
      limit,
      nextCursor,
      prevCursor,
      category,
      order,
      search,
    });
  }

  @Get('offset')
  findAllOffset(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit?: number,
    @Query('p', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('category', new DefaultValuePipe(null)) category?: string,
  ) {
    return this.postsService.findAllOffset({
      limit,
      page,
      category,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor('thumbnail'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
        ],
        fileIsRequired: false,
      }),
    )
    thumbnail: Express.Multer.File,
  ) {
    return this.postsService.update(id, updatePostDto, thumbnail);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
