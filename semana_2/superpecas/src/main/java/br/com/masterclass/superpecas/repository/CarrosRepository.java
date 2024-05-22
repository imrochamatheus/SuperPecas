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

    @Query("SELECT c FROM Carro c WHERE lower(c.modelo) like lower(concat('%', ?1,'%'))" +
            " OR lower(c.codigo) like lower(concat('%', ?1,'%'))" +
            " OR lower(c.fabricante) like lower(concat('%', ?1,'%'))")
    public Page<Carro> findByTerm(String termo, Pageable page);

    @Query("SELECT new br.com.masterclass.superpecas.model.DTO.TopKFabricantesDTO(c.fabricante, COUNT(c.modelo) as quantidadeModelo) FROM Carro" +
            " c GROUP BY fabricante ORDER BY quantidadeModelo DESC LIMIT 10")
    public List<TopKFabricantesDTO> getTopKFabricantes ();

    @Query("Select c.fabricante FROM Carro as c GROUP BY c.fabricante")
    public List<String> findAllFabricantes();

    public Optional<Carro> findByModeloOrCodigo(String modelo, String codigo);
}