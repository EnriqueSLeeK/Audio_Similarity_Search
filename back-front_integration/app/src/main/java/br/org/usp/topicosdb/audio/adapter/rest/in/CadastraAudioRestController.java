package br.org.usp.topicosdb.audio.adapter.rest.in;

import br.org.usp.topicosdb.audio.adapter.config.Handler;
import br.org.usp.topicosdb.audio.adapter.service.AudioService;
import br.org.usp.topicosdb.audio.adapter.service.model.AudioDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("audio/")
@Slf4j
public class CadastraAudioRestController {

    private final AudioService audioService;

    private final Handler handler;

    @PostMapping("grava/")
    public ResponseEntity<String> cadastraAudio(@RequestBody final String mensagem) {
        try {
            log.info("solicitação de cadastro de audio");
            var audioFile = handler.getContent(mensagem);
            var audioDTO = AudioDTO.builder()
                    .idAudio(UUID.randomUUID().toString())
                    .nomeAudio(mensagem)
                    .audio(audioFile)
                    .build();
            audioService.cadastraAudio(audioDTO);

            log.info("solicitação de cadastro de audio concluída com sucesso");
            return ResponseEntity.ok("cadastro com sucesso");

        } catch (Exception e) {
            log.error("falha no cadastro de audio", e);
            return ResponseEntity.badRequest().build();
        }
    }
}