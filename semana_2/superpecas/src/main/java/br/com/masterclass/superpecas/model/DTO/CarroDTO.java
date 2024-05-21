package br.com.masterclass.superpecas.model.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CarroDTO {
    private Long id;
    private String modelo;
    private String codigo;
    private String fabricante;

    public CarroDTO () {}
}

