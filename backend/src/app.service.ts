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

  // client: any = weaviate.client(
  //   {
  //       scheme: 'http',
  //       host: 'localhost:8080'
  //   }
  // )

  constructor () {}    

  encodeAudio(audio: any): string {
    const encodedAudio: string = Buffer.from(audio).toString('base64');

    return encodedAudio;
  }

  async insertAudio(audio: any, text: string): Promise<any>{

    const preparedAudio = this.encodeAudio(audio);

    const res = await this.client.data
      .creator()
      .withClassName('AudioTable')
      .withProperties(
        {
          audio: preparedAudio,
          text: text
        }
      )
      .do();

    return res;
  }

  async getAudio(audio: any, text: string): Promise<any> {
    const queryAudio = this.encodeAudio(audio);

    const queryRes = await this.client.graphql
      .get()
      .withClassName('AudioTable')
      .withNearAudio(
        {
          audio: queryAudio,
        }
      ).withNearAudio(
        {
          text: text,
        }
      )
      .do();

    return queryRes;
  }

}
