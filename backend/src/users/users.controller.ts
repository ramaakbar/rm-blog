import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UseInterceptors,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Request as ReqExpress } from 'express';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminAuthGuard, UserAuthGuard } from 'src/auth/guard';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AdminAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
        ],
      }),
    )
    picture: Express.Multer.File,
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(picture, createUserDto);
  }

  // @ApiQuery({ name: 'order', enum: 'sadas' | 'sadasd' })
  @Get()
  findAll(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit?: number,
    @Query('p', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('order', new DefaultValuePipe('desc')) order?: string,
  ) {
    return this.usersService.findAll({ limit, page, order });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(UserAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('picture'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: ReqExpress,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
        ],
        fileIsRequired: false,
      }),
    )
    picture: Express.Multer.File,
  ) {
    return this.usersService.update(id, updateUserDto, req, picture);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
