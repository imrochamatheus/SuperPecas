package br.com.masterclass.superpecas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.masterclass.superpecas.model.Carro;
import br.com.masterclass.superpecas.repository.CarrosRepository;

import java.util.List;

@Service
public class CarrosService {
    private CarrosRepository carrosRepository;

    @Autowired
    public CarrosService(CarrosRepository carrosRepository){
        this.carrosRepository = carrosRepository;
    }

    public List<Carro> listarTodos () {
        return this.carrosRepository.findAll();
    }
}
