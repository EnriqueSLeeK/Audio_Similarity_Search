import { BadRequestException, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Post()
  async queryValue(audio: any, text: string) {

    if (audio == null)
      throw new BadRequestException()

    const result: any[] = await this.appService.getAudio(audio, text);

    const decodedResult = result.map((encodedAudio: string) => {
        return Buffer.from(encodedAudio, 'base64');
      }
    )
    
    return decodedResult;
  }

  @Post()
  async uploadAudio(audio: any, text: string) {

    if (audio == null)
      throw new BadRequestException();

    const status = await this.appService.insertAudio(audio, text);

    return status;
  }
}
