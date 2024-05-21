package br.com.masterclass.superpecas.controller;

import br.com.masterclass.superpecas.model.DTO.CarroDTO;
import br.com.masterclass.superpecas.model.Carro;
import br.com.masterclass.superpecas.service.CarrosService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carro")
public class CarrosController {

    @Autowired
    private CarrosService carrosService;

    @Autowired
    private ModelMapper modelMapper;

    private CarroDTO convertCarroToDTO (Carro carro) {
        return this.modelMapper.map(carro, CarroDTO.class);
    }

    private Carro convertDTOtoModel (CarroDTO carroDTO) {
        return this.modelMapper.map(carroDTO, Carro.class);
    }

    @GetMapping("/listaTodos")
    public ResponseEntity<List<CarroDTO>> listarTodos () {
        List<Carro> listaCarros = this.carrosService.listarTodos();
        List<CarroDTO> listaCarrosDTO = listaCarros.stream().map(this::convertCarroToDTO).toList();

        return new ResponseEntity<>(listaCarrosDTO, HttpStatus.OK);
    }
}
