import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Post('search')
  async queryValue(@Body('audio') audio: any, @Body('text') text: string) {

    if (audio == null)
      throw new BadRequestException()

    const result: any[] = await this.appService.getAudio(audio, text);

    const decodedResult = result.map((encodedAudio: string) => {
        return Buffer.from(encodedAudio, 'base64');
      }
    )
    
    return decodedResult;
  }

  @Post('query')
  async uploadAudio(@Body('audio') audio: any, @Body('text') text: string) {

    if (audio == null)
      throw new BadRequestException();

    const status = await this.appService.insertAudio(audio, text);

    return status;
  }
}
