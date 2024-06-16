package br.org.usp.topicosdb.audio.adapter.service;

import br.org.usp.topicosdb.audio.adapter.service.mapper.AudioDTOMapper;
import br.org.usp.topicosdb.audio.adapter.service.model.AudioDTO;
import br.org.usp.topicosdb.audio.domain.usecase.AudioUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AudioService {

    private final AudioDTOMapper audioDTOMapper;

    private final AudioUseCase audioUseCase;

    public AudioDTO buscaAudio(AudioDTO audioDTO) {
        var audioBuscaModel = audioDTOMapper.paraModel(audioDTO);
        var audioRetornoModel = audioUseCase.buscaAudio(audioBuscaModel);
        return audioDTOMapper.paraDTO(audioRetornoModel);
    }

    public void cadastraAudio(AudioDTO audioDTO) {
        var produtoModel = audioDTOMapper.paraModel(audioDTO);
        audioUseCase.cadastrarAudio(produtoModel);
    }
}
