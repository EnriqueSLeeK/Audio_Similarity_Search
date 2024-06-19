import * as weaviate from "weaviate-client"
import { createReadStream, readFileSync, readdirSync } from 'node:fs'
import FormData from 'form-data';
import axios from 'axios';

const client = weaviate.weaviateV2.client(
  {
    scheme: 'http',
    host: 'localhost:8080',
  }
);

const filePath = './audio/Shoor_mode.wav'
const fileStream = createReadStream(filePath);

const formData = new FormData();
formData.append('audio', fileStream);
formData.append('text', "");


const upload_audio = await axios.post('http://localhost:3000/search', formData, {
    headers: {
      ...formData.getHeaders()
    }
});

console.log(upload_audio.data);



// Upload em serie
// const directory = './audio'

// const toBase64 = (filename) => {
//   const audio = readFileSync(filename);
//   return Buffer.from(audio).toString('base64');
// }

// const audioFiles = readdirSync(directory);

// const promises = audioFiles.map(async (audiofile) => {
//   const b64 = toBase64('./audio' + `/${audiofile}`);

//   await client.data.creator()
//     .withClassName('AudioTable')
//     .withProperties(
//       {
//         audio: b64,
//         text: audiofile
//       }
//     )
//     .do();
  
// })

// await Promise.all(promises);

// const schemaRes = await client.schema.getter().do();
// console.log(schemaRes);


// const queryFile = Buffer.from(readFileSync('audio')).toString('base64');

// const queryRes = await client.graphql.get()
//   .withClassName('BindExample')
//   .withFields(['audio'])
//   .withNearAudio({ audio: queryFile })
//   .do();

// const res = queryRes.data.Get.BindExample;
// let counter = 0
// res.forEach((elem) => {
//   writeFileSync(`./som/${counter}.wav`, elem.audio, 'base64');
//   counter += 1;
// });
