import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { Post } from 'src/posts/post.entity';

@Injectable()
export class Gpt3Service {
  private configuration: Configuration;
  private openai: OpenAIApi;

  constructor(private configService: ConfigService) {
    this.configuration = new Configuration({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  async generateArticle(category: string): Promise<Pick<Post, 'body'>> {
    const prompt = `Generate an article about ${category}.`;

    try {
      const completions = await this.openai.createCompletion({
        model: 'text-davinci-002',
        prompt: prompt,
        max_tokens: 2048,
        n: 1,
      });

      const text = completions.data.choices[0].text.trim();
      console.log({ text });

      const paragraphs = text.split(/\n\n+/);
      const body = paragraphs.join('');

      return { body };
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }
}
