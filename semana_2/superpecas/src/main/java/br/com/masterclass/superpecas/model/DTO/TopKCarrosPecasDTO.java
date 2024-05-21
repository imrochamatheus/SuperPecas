package br.com.masterclass.superpecas.model.DTO;

import lombok.Data;

@Data
public class TopKCarrosPecasDTO {
    private String modeloCarro;
    private Long quantidadePecas;

    public TopKCarrosPecasDTO () {}
}
