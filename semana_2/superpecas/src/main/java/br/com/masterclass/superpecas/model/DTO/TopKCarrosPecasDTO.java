package br.com.masterclass.superpecas.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopKCarrosPecasDTO {
    private String modeloCarro;
    private Long quantidadePecas;
}
