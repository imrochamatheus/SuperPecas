package br.com.masterclass.superpecas.repository;

import br.com.masterclass.superpecas.model.Carro;
import br.com.masterclass.superpecas.model.DTO.TopKFabricantesDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CarrosRepository extends
        JpaRepository<Carro, Long>{

    @Query(nativeQuery = true, value = "SELECT c FROM Carro c WHERE lower(c.modelo) LIKE lower(CONCAT('%', ?1, '%'))")
    public Page<Carro> findByModelo(String termo, Pageable page);

    @Query("SELECT new br.com.masterclass.superpecas.model.DTO.TopKFabricantesDTO(c.fabricante, COUNT(c.modelo) as quantidadeModelo) FROM Carro" +
            " c GROUP BY fabricante ORDER BY quantidadeModelo DESC LIMIT 10")
    public List<TopKFabricantesDTO> getTopKFabricantes ();

    public Optional<Carro> findByModeloOrCodigo(String modelo, String codigo);
}