package br.com.masterclass.superpecas.exceptions;

import br.com.masterclass.superpecas.model.DTO.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler extends RuntimeException {

    @ExceptionHandler(value = {CarroNaoEncontradoException.class})
    protected ResponseEntity<Object> handleCarroNotFoundException(CarroNaoEncontradoException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(
                exception.getMessage(),
                null
        ));
    }

    @ExceptionHandler(value ={ CarroJaExisteException.class })
    protected ResponseEntity<Object> handleCarroJaExisteException(CarroJaExisteException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<>(
                exception.getMessage(),
                null
        ));
    }

    @ExceptionHandler(value = {ExistePecaAssociadaException .class})
    protected  ResponseEntity<Object> handleExistePecaAssociadaException (ExistePecaAssociadaException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<>(
                exception.getMessage(),
                null
        ));
    }
}
