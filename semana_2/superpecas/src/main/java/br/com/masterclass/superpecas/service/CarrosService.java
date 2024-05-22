package br.com.masterclass.superpecas.service;

import br.com.masterclass.superpecas.exceptions.CarroJaExisteException;
import br.com.masterclass.superpecas.exceptions.CarroNaoEncontradoException;
import br.com.masterclass.superpecas.exceptions.ExistePecaAssociadaException;
import br.com.masterclass.superpecas.model.DTO.CarroDTO;
import br.com.masterclass.superpecas.model.DTO.TopKFabricantesDTO;
import br.com.masterclass.superpecas.model.Peca;
import br.com.masterclass.superpecas.service.mapper.CarroMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.masterclass.superpecas.model.Carro;
import br.com.masterclass.superpecas.repository.CarrosRepository;

import java.beans.PropertyDescriptor;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class CarrosService {


    private CarrosRepository carrosRepository;
    private PecasService pecasService;
    private CarroMapper carroMapper;

    @Autowired
    public CarrosService(CarrosRepository carrosRepository, CarroMapper carroMapper, PecasService pecasService){
        this.carrosRepository = carrosRepository;
        this.pecasService = pecasService;
        this.carroMapper = carroMapper;
    }

    private String[] getNullPropertyNames(Object source) {
        BeanWrapper src = new BeanWrapperImpl(source);
        PropertyDescriptor[] descriptor = src.getPropertyDescriptors();

        return Arrays.stream(descriptor)
                .map(java.beans.PropertyDescriptor::getName)
                .filter(propertyName -> src.getPropertyValue(propertyName) == null)
                .toArray(String[]::new);
    }

    public List<CarroDTO> listarTodos () {
        List<Carro> listaCarros = this.carrosRepository.findAll();

        return listaCarros.stream().map(this.carroMapper::toDTO).toList();
    }

    public CarroDTO buscarPorId(Long id){
        Optional<Carro> optionalCarro = this.carrosRepository.findById(id);

        if(optionalCarro.isEmpty()) {
                throw new CarroNaoEncontradoException("Nenhum carro com id " + id + " encontrado!");
        }
        return this.carroMapper.toDTO(optionalCarro.get());
    }

    public Page<CarroDTO> listarTodosPaginado(int page, int size) {
            Pageable pageable = PageRequest.of(page, size);

        return this.carrosRepository
                .findAll(pageable).map(this.carroMapper::toDTO);
    }

    public Page<CarroDTO> listarTodosPaginado(String termo, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return this.carrosRepository
                .findByTerm(termo, pageable).map(this.carroMapper::toDTO);
    }

    public List<TopKFabricantesDTO> listarTop10Fabricantes() {
        return this.carrosRepository.getTopKFabricantes();
    }

    public List<String> listarTodosFabricantes () {
         return this.carrosRepository.findAllFabricantes();
    }

    public CarroDTO adicionarCarro(CarroDTO dadosCarro) {
        Optional<Carro> carroExiste = this.carrosRepository
                .findByModeloOrCodigo(dadosCarro.getModelo(), dadosCarro.getCodigo());

        if(carroExiste.isPresent()) {
            throw new CarroJaExisteException("Já existe um carro cadastrado com este modelo ou código");
        }

            Carro carroModel = this.carroMapper.toModel(dadosCarro);
            Carro novoCarro = this.carrosRepository.save(carroModel);
            return this.carroMapper.toDTO(novoCarro);
    }

    public CarroDTO editarCarro(Long carroID, CarroDTO dto) {
        Carro carroExiste = this.carrosRepository.findById(carroID)
                .orElseThrow(() -> new CarroNaoEncontradoException("Não existe carro com o id informado!"));

        Optional<Carro> existeCarroMesmoNome = this.carrosRepository
                .findByModeloOrCodigo(dto.getModelo(), dto.getCodigo());

        if(existeCarroMesmoNome.isPresent()) {
            throw new CarroJaExisteException("Já existe um carro com este modelo ou código!");
        }

        BeanUtils.copyProperties(dto, carroExiste, this.getNullPropertyNames(dto));
        Carro carroAtualizado = this.carrosRepository.save(carroExiste);

        return this.carroMapper.toDTO(carroAtualizado);
    }

    public void excluirCarro(Long carroId) {
        Carro carroExiste = this.carrosRepository.findById(carroId)
                .orElseThrow(() -> new CarroNaoEncontradoException("Não existe carro com o id " + carroId));

        List<Peca> pecasAssociadas = this.pecasService.listarPecasPorCarroId(carroExiste.getId());

        if (pecasAssociadas.isEmpty()) {
            this.carrosRepository.deleteById(carroExiste.getId());
        } else {
            throw new ExistePecaAssociadaException("Existem peças associadas a este carro!");
        }
    }
}
