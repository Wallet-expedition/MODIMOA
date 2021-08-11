package com.modimoa.backend.errorhandling;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ErrorCode {
    INVALID_QUERY_ERROR(400,"QUERY-ERR-400","INVALID QUERY ERROR"),
    OBJECT_NOTFOUND_ERROR(403,"NOTFOUND-ERR-403","OBJECT NOTFOUND ERROR"),
    MEMBER_CONFLICT_ERROR(409,"MEMBER-ERR-400","MEMBER CONFLICT ERROR")
    ;

    private int status;
    private String errorCode;

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    private String message;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
