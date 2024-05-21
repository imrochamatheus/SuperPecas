package br.com.masterclass.superpecas.model.DTO;

import lombok.Data;

@Data
public class PecaDTO {
    private Long id;
    private String nome;
    private Long carroId;
    private String descricao;
    private String numeroSerie;
    private String fabricante;
    private String modeloCarro;

    public PecaDTO () {}
}
