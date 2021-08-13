package com.modimoa.backend.errorhandling;

import lombok.Getter;

@Getter
public class MemberConflictException extends RuntimeException{
    private ErrorCode errorCode;

    public MemberConflictException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }
}
