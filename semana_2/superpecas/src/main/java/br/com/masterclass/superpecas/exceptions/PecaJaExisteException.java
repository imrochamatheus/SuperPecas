package br.com.masterclass.superpecas.exceptions;

public class PecaJaExisteException extends RuntimeException{
    public PecaJaExisteException(String message) {
        super(message);
    }
}
