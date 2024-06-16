package br.org.usp.topicosdb.audio.adapter.rest.in;

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

@RestController
@RequiredArgsConstructor
@RequestMapping("audio/")
@Slf4j
public class BuscaAudioRestController {

    private final AudioService audioService;

    @GetMapping("busca/")
    public ResponseEntity<AudioDTO> buscaAudio(@RequestBody final String mensagem) {
        try {
            log.info("solicitação de busca por audio");
            var inputStream = getClass().getClassLoader().getResourceAsStream(mensagem);
            var audioStream = AudioSystem.getAudioInputStream(inputStream);
            var audioDTO = AudioDTO.builder().audioInputStream(audioStream).build();
            var audioRetornoDTO = audioService.buscaAudio(audioDTO);

            return ResponseEntity.ok(audioRetornoDTO);

        } catch (Exception e) {
            log.error("falha na busca de audio", e);
            return ResponseEntity.badRequest().build();
        }
    }
}
