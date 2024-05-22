package br.com.masterclass.superpecas.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Pecas")
public class Peca {
    @Id
    @Column(name = "PecaID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
}
