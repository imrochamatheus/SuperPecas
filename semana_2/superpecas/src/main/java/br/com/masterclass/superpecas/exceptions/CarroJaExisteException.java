package br.com.masterclass.superpecas.exceptions;

public class CarroJaExisteException extends RuntimeException{
    public CarroJaExisteException (String message) {
        super(message);
    }
}
