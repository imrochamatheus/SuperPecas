package br.com.masterclass.superpecas.repository;

import br.com.masterclass.superpecas.model.Carro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CarrosRepository extends
        JpaRepository<Carro, Long>{

    @Query("SELECT c FROM Carro c WHERE LOWER(c.modelo) LIKE LOWER(CONCAT('%', :modelo, '%'))")
    public Page<Carro> findByModelo(String modelo, Pageable page);

}