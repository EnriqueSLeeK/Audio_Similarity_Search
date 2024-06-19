import { Injectable } from '@nestjs/common';
import weaviate from "weaviate-ts-client"

@Injectable()
export class AppService {

  client: any = weaviate.client(
    {
      scheme: process.env.SCHEME,
      host: process.env.HOST
    }
  )

  constructor () {}    

  async insertAudio(audio: any, text: string): Promise<any>{

    const b64 = audio.toString('base64');
    const res = await this.client.data
      .creator()
      .withClassName('AudioTable')
      .withProperties(
        {
          audio: b64,
        }
      )
      .do();

    return res;
  }

  async getAudio(audio: any, text: string): Promise<any> {

    const queryRes = await this.client.graphql
      .get()
      .withClassName('AudioTable')
      .withFields(['audio'])
      .withNearAudio(
        {
          audio: audio.toString('base64'),
        }
      )
      .withLimit(3)
      .do();

    return queryRes;
  }

}
