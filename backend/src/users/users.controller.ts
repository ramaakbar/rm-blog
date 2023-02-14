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
  Optional,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Patch(':id')
  @UseInterceptors(FileInterceptor('picture'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
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
    return this.usersService.update(id, updateUserDto, picture);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
