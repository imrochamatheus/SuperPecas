package br.com.masterclass.superpecas.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Carros")
public class Carro {
    @Id
    @Column(name = "CarroID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "NomeModelo")
    private String modelo;

    @Column(name = "Fabricante")
    private String fabricante;

    @Column(name = "CodigoUnico")
    private String codigo;

    public Carro () {}

    public Carro(long id, String modelo, String fabricante, String codigo) {
        this.id = id;
        this.modelo = modelo;
        this.codigo = codigo;
        this.fabricante = fabricante;
    }
}
