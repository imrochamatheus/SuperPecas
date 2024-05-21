package br.com.masterclass.superpecas.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Pecas")
public class Peca {
    @Id
    @Column(name = "PecaID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "Nome")
    private String nome;

    @Column(name = "NumeroSerie")
    private String numeroSerie;

    @Column(name = "Descricao")
    private String descricao;

    @Column(name = "Fabricante")
    private String fabricante;

    @Column(name = "ModeloCarro")
    private String modeloCarro;

    @Column(name = "CarroID")
    private long carroId;

    public Peca () {}

    public Peca(Long id,
                String nome,
                Long carroId,
                String descricao,
                String fabricante,
                String modeloCarro,
                String numeroSerie) {
        this.id = id;
        this.nome = nome;
        this.carroId = carroId;
        this.descricao = descricao;
        this.fabricante = fabricante;
        this.modeloCarro = modeloCarro;
        this.numeroSerie = numeroSerie;
    }
}
