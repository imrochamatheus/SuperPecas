package br.com.masterclass.superpecas.service.mapper;

import br.com.masterclass.superpecas.model.Carro;
import br.com.masterclass.superpecas.model.DTO.CarroDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarroMapper {

    @Autowired
    private ModelMapper modelMapper;

    public CarroDTO toDTO (Carro carro) {
        return this.modelMapper.map(carro, CarroDTO.class);
    }

    public Carro toModel (CarroDTO dto) {
        return this.modelMapper.map(dto, Carro.class);
    }
}
