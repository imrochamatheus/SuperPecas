package br.com.masterclass.superpecas.service.mapper;

import br.com.masterclass.superpecas.model.DTO.PecaDTO;
import br.com.masterclass.superpecas.model.Peca;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PecaMapper {

    @Autowired
    private ModelMapper modelMapper;

    public PecaDTO toDTO (Peca peca) {
        return this.modelMapper.map(peca, PecaDTO.class);
    }

    public Peca toModel (PecaDTO dto) {
        return this.modelMapper.map(dto, Peca.class);
    }
}
