import { BadRequestException, Body, Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Post('search')
  @UseInterceptors(FileInterceptor('audio'))
  async queryValue(@UploadedFile() audio: any) {

    if (!audio)
      throw new BadRequestException();

    const result: any = await this.appService.getAudio(audio.buffer, "");
    return result;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('audio'))
  async uploadAudio(@UploadedFile() audio: any, @Body('text') text: string) {

    if (!audio)
      throw new BadRequestException();

    await this.appService.insertAudio(audio.buffer, text);

    return "ok";
  }
}
