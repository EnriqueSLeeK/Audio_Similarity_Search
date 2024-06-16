package br.org.usp.topicosdb.audio.adapter.rest.in;

import br.org.usp.topicosdb.audio.adapter.config.Handler;
import br.org.usp.topicosdb.audio.adapter.service.AudioService;
import br.org.usp.topicosdb.audio.adapter.service.model.AudioDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sound.sampled.AudioSystem;
import java.net.URL;

@RestController
@RequiredArgsConstructor
@RequestMapping("audio/")
@Slf4j
public class BuscaAudioRestController {

    private final AudioService audioService;
    private final Handler handler;

    @GetMapping("busca/")
    public ResponseEntity<AudioDTO> buscaAudio(@RequestBody final String nomeArquivoAudio) {
        try {
            log.info("solicitação de busca por audio");
            var audioFile = handler.getContent(nomeArquivoAudio);
            var audioDTO = AudioDTO.builder().audio(audioFile).build();
            var audioRetornoDTO = audioService.buscaAudio(audioDTO);

            return ResponseEntity.ok(audioRetornoDTO);

        } catch (Exception e) {
            log.error("falha na busca de audio", e);
            return ResponseEntity.badRequest().build();
        }
    }
}
