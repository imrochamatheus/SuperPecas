package br.com.masterclass.superpecas.service;

import br.com.masterclass.superpecas.repository.PecasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PecasService {

    private PecasRepository pecasRepository;

    @Autowired
    public PecasService (PecasRepository pecasRepository) {
        this.pecasRepository = pecasRepository;
    }
}
