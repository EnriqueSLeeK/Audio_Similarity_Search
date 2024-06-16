package br.org.usp.topicosdb.audio.adapter.service.mapper;

import br.org.usp.topicosdb.audio.adapter.service.model.AudioDTO;
import br.org.usp.topicosdb.audio.domain.model.AudioModel;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValueMappingStrategy;

@Mapper(componentModel = "spring",
        nullValueMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface AudioDTOMapper {

    AudioDTO paraDTO(AudioModel audioModel);

    AudioModel paraModel(AudioDTO audioDTO);
}