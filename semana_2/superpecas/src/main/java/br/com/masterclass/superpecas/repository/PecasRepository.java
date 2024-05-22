package br.com.masterclass.superpecas.repository;

import br.com.masterclass.superpecas.model.DTO.TopKCarrosPecasDTO;
import br.com.masterclass.superpecas.model.DTO.TopKFabricantesDTO;
import br.com.masterclass.superpecas.model.Peca;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PecasRepository extends JpaRepository<Peca, Long> {
    public List<Peca> findByCarroId(Long carroId);

    @Query("SELECT p FROM Peca p WHERE lower(p.nome) like lower(concat('%', ?1,'%'))" +
            " OR lower(p.numeroSerie) like lower(concat('%', ?1,'%'))" +
            " OR lower(p.fabricante) like lower(concat('%', ?1,'%'))" +
            " OR lower(p.modeloCarro) like lower(concat('%', ?1,'%'))")
    Page<Peca> findBySearchTerm(String termo, Pageable pageable);

    @Query("SELECT new br.com.masterclass.superpecas.model.DTO.TopKCarrosPecasDTO(p.modeloCarro as carro, COUNT(p.carroId) as quantidade)" +
            " FROM Peca p GROUP BY carro ORDER BY quantidade DESC LIMIT 10")
    public List<TopKCarrosPecasDTO> findTopKCarrosPecas ();

    List<Peca> findByNomeOrNumeroSerie (String nome, String numeroSerie);
}
