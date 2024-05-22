package br.com.masterclass.superpecas.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Carros")
public class Carro {
    @Id
    @Column(name = "CarroID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NomeModelo")
    private String modelo;

    @Column(name = "Fabricante")
    private String fabricante;

    @Column(name = "CodigoUnico")
    private String codigo;
}
