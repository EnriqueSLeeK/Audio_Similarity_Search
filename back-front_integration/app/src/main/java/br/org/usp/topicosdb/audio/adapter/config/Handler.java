package br.org.usp.topicosdb.audio.adapter.config;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URL;

@Component
public class Handler {
    private final String path = "https://github.com/EnriqueSLeeK/Audio_Similarity_Search/raw/main/back-front_integration/app/src/main/resources/";

    public Object getContent(String mensagem) throws IOException {
        return new URL(path + mensagem).openConnection().getContent();
    }
}
