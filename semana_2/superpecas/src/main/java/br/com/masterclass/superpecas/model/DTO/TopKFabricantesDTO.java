package br.com.masterclass.superpecas.model.DTO;

import lombok.Data;

@Data
public class TopKFabricantesDTO {
    private String fabricante;
    private Long quantidadeModelos;

    public TopKFabricantesDTO() {}
}
