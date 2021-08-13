package com.modimoa.backend.errorhandling;

import lombok.Getter;

@Getter
public class ObjectNotFoundException extends RuntimeException{
    private ErrorCode errorCode;

    public ObjectNotFoundException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }
}
