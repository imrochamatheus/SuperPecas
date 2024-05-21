package br.com.masterclass.superpecas.exceptions;

public class PecaNaoEncontradaException extends RuntimeException {
    public PecaNaoEncontradaException(String message) {
        super(message);
    }
}
