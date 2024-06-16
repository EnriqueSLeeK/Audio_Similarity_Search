package br.org.usp.topicosdb.audio.adapter.service.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import javax.sound.sampled.AudioInputStream;

@Getter
@Builder
public class AudioDTO {

    @JsonProperty("id_audio")
    private String idAudio;

    @JsonProperty("nome_audio")
    private String nomeAudio;

    private AudioInputStream audioInputStream;
}