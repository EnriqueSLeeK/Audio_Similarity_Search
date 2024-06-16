package br.org.usp.topicosdb.audio.domain.usecase;

import br.org.usp.topicosdb.audio.domain.model.AudioModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class AudioUseCase {

    public AudioModel buscaAudio(AudioModel audioModel) {
        log.info("buscando audios na base de dados");
        return AudioModel.builder()
                .idAudio("id_audio_encontrado")
                .nomeAudio("nome_audio_encontrado")
                .audio("audio_encontrado")
                .build();
        // integrar com parte do Lee
//        var audioModelRetorno = integracaoPort.busca(audioModel);
//        return audioModelRetorno;
    }

    public void cadastrarAudio(AudioModel audioModel) {
        log.info(String.format("inserindo audio [%s] na base de dados", audioModel.getNomeAudio()));
        // integrar com parte do Lee
//        audioDatabasePort.cadastraAudio(audioModel);
    }
}
