package com.modimoa.backend.errorhandling;

import lombok.Getter;

@Getter
public class InvalidQueryException extends RuntimeException{
    private ErrorCode errorCode;

    public InvalidQueryException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }
}
