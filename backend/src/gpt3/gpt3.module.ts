import { Module } from '@nestjs/common';
import { Gpt3Controller } from './gpt3.controller';
import { Gpt3Service } from './gpt3.service';

@Module({
  controllers: [Gpt3Controller],
  providers: [Gpt3Service],
})
export class Gpt3Module {}
