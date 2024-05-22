package br.com.masterclass.superpecas.exceptions;

public class CarroNaoEncontradoException extends RuntimeException {
    public CarroNaoEncontradoException(String message) {
        super(message);
    }
}
