package br.org.usp.topicosdb.audio.domain.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import javax.sound.sampled.AudioInputStream;

@Getter
@Builder(toBuilder = true)
public class AudioModel {

    @NotNull
    @NotBlank
    private String idAudio;

    @NotNull
    @NotBlank
    private String nomeAudio;

    @NotNull
    private AudioInputStream audioInputStream;
}