import { Controller, Get, Query } from '@nestjs/common';
import { Gpt3Service } from './gpt3.service';

@Controller('gpt3')
export class Gpt3Controller {
  constructor(private readonly gpt3Service: Gpt3Service) {}

  @Get()
  async generateArticle(
    @Query('category') category: string,
  ): Promise<{ body: string }> {
    return this.gpt3Service.generateArticle(category);
  }
}
