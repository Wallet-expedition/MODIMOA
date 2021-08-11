package com.modimoa.backend.errorhandling;

import jdk.nashorn.internal.objects.annotations.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidQueryException.class)
    public ResponseEntity<ErrorResponse> handleInvalidQueryException(InvalidQueryException ex){
        log.error("handleInvalidQueryException",ex);
        System.out.println("errorcode::::::"+ex.getErrorCode());
        System.out.println("status::::::"+ex.getErrorCode().getStatus());

        ErrorResponse response = new ErrorResponse(ex.getErrorCode());

        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }
}
