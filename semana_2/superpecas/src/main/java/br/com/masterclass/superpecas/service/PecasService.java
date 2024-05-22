package br.com.masterclass.superpecas.service;

import br.com.masterclass.superpecas.model.Peca;
import br.com.masterclass.superpecas.repository.PecasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PecasService {

    private PecasRepository pecasRepository;

    @Autowired
    public PecasService (PecasRepository pecasRepository) {
        this.pecasRepository = pecasRepository;
    }

    public List<Peca> listarPecasPorCarroId (Long carroId) {
        return this.pecasRepository.findByCarroId(carroId);
    }
}
