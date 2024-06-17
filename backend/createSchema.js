"use strict";

import weaviate_ts_client_1 from "weaviate-ts-client"

var client = weaviate_ts_client_1.client({
    scheme: "http",
    host: "localhost:8080"
});
var schemaConfig = {
    "class": "AudioTable",
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
};
try {
    client.schema.classCreator().withClass(schemaConfig).do();
}
catch (error) {
    console.log("Schema already exists or failed to create one");
}
