package br.com.masterclass.superpecas.service;

import br.com.masterclass.superpecas.exceptions.PecaJaExisteException;
import br.com.masterclass.superpecas.exceptions.PecaNaoEncontradaException;
import br.com.masterclass.superpecas.model.DTO.PecaDTO;
import br.com.masterclass.superpecas.model.DTO.TopKCarrosPecasDTO;
import br.com.masterclass.superpecas.model.Peca;
import br.com.masterclass.superpecas.repository.PecasRepository;
import br.com.masterclass.superpecas.service.mapper.PecaMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.beans.PropertyDescriptor;
import java.util.Arrays;
import java.util.List;

@Service
public class PecasService {

    private PecasRepository pecasRepository;
    private PecaMapper pecaMapper;

    @Autowired
    public PecasService (PecasRepository pecasRepository, PecaMapper pecaMapper) {
        this.pecasRepository = pecasRepository;
        this.pecaMapper = pecaMapper;
    }

    private String[] getNullPropertyNames(Object source) {
        BeanWrapper src = new BeanWrapperImpl(source);
        PropertyDescriptor[] descriptor = src.getPropertyDescriptors();

        return Arrays.stream(descriptor)
                .map(java.beans.PropertyDescriptor::getName)
                .filter(propertyName -> src.getPropertyValue(propertyName) == null)
                .toArray(String[]::new);
    }

    public List<Peca> listarPecasPorCarroId (Long carroId) {
        return this.pecasRepository.findByCarroId(carroId);
    }

    public PecaDTO buscarPorId(Long id) {
        Peca peca = this.pecasRepository.findById(id)
                .orElseThrow(() -> new PecaNaoEncontradaException("Nenhuma peça encontrada com o id " + id));

        return this.pecaMapper.toDTO(peca);
    }

    public List<PecaDTO> listasTodas () {
        return this.pecasRepository.findAll()
                .stream().map(this.pecaMapper::toDTO).toList();
    }

    public Page<Peca> listaTodosPaginado (int page, int size) {
        Pageable pageRequest = PageRequest.of(page, size);
        return this.pecasRepository.findAll(pageRequest);
    }

    public Page<Peca> listaTodosPaginadoPorTermo(String termo, int page, int size) {
        Pageable pageRequest = PageRequest.of(page, size);
        return this.pecasRepository.findBySearchTerm(termo, pageRequest);
    }

    public List<TopKCarrosPecasDTO> buscarCarrosComMaisPecas () {
        return this.pecasRepository.findTopKCarrosPecas();
    }

    public PecaDTO editarPeca (Long id, PecaDTO dto) {
        Peca pecaExiste = this.pecasRepository.findById(id)
                .orElseThrow(() -> new PecaNaoEncontradaException("Nenhuma peça encontrada para o id " + id));

        List<Peca> listaPecas = this.pecasRepository
                .findByNomeOrNumeroSerie(dto.getNome(), dto.getNumeroSerie());

        if(!listaPecas.isEmpty()) {
           throw new PecaJaExisteException("Já existe peça com nome ou número de série fornecidos");
        }

        BeanUtils.copyProperties(dto, pecaExiste, this.getNullPropertyNames(dto));
        Peca pecaAtualizada = this.pecasRepository.save(pecaExiste);

        return this.pecaMapper.toDTO(pecaAtualizada);
    }

    public void excluirPeca (Long id) {
        this.pecasRepository.findById(id)
                .orElseThrow(() -> new PecaNaoEncontradaException("Não existe peça com o id informado!"));

        this.pecasRepository.deleteById(id);
    }
}
