package br.com.masterclass.superpecas.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopKFabricantesDTO {
    private String fabricante;
    private Long quantidadeModelos;

}
