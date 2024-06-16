
import weaviate from "weaviate-ts-client"

let client: any = weaviate.client(
	{
		scheme: process.env.scheme,
		host: process.env.host
	}
)

const schemaConfig ={
  "class": "BindExample",
  "vectorizer": "multi2vec-bind",
  "moduleConfig": {
    "multi2vec-bind": {
      "textFields": ["text"],
      "audioFields": ["audio"],
    }
  },
  "properties": [
    {
      "dataType": ["string"],
      "name": "text"
    },
    {
      "dataType": ["blob"],
      "name": "audio"
    },
  ],
  "weights": {
    "audioFields": [0.5],
    "textFields": [0.5]
  }
}

try {
	client.schema.classCreator().withClass(schemaConfig).do();
} catch (error) {
	console.log("Schema already exists or failed to create one");
}
