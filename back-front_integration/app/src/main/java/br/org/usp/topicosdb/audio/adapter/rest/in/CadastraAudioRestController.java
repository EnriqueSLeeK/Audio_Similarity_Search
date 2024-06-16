package br.org.usp.topicosdb.audio.adapter.rest.in;

import br.org.usp.topicosdb.audio.adapter.service.AudioService;
import br.org.usp.topicosdb.audio.adapter.service.model.AudioDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("audio/")
@Slf4j
public class CadastraAudioRestController {

    private final AudioService audioService;

    @PostMapping("grava/")
    public ResponseEntity<String> cadastraAudio(@RequestBody final String mensagem) {
        log.info("solicitação de cadastro de audio");

        audioService.cadastraAudio(AudioDTO.builder().build());
        log.info("solicitação de cadastro de audio concluída com sucesso");
        return ResponseEntity.ok("cadastro com sucesso");
    }
}