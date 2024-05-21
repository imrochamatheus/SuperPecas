package br.com.masterclass.superpecas.service;

import br.com.masterclass.superpecas.model.DTO.CarroDTO;
import br.com.masterclass.superpecas.service.mapper.CarroMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.masterclass.superpecas.model.Carro;
import br.com.masterclass.superpecas.repository.CarrosRepository;

import java.util.List;

@Service
public class CarrosService {


    private CarrosRepository carrosRepository;
    private CarroMapper carroMapper;

    @Autowired
    public CarrosService(CarrosRepository carrosRepository, CarroMapper carroMapper){
        this.carrosRepository = carrosRepository;
        this.carroMapper = carroMapper;
    }

    public List<CarroDTO> listarTodos () {
        List<Carro> listaCarros = this.carrosRepository.findAll();

        return listaCarros.stream().map(this.carroMapper::toDTO).toList();
    }
}
