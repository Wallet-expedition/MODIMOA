package com.modimoa.backend.errorhandling;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    INVALID_QUERY_ERROR(400,"QUERY-ERR-400","INVALID QUERY ERROR"),
    OBJECT_NOTFOUND_ERROR(403,"NOTFOUND-ERR-403","OBJECT NOTFOUND ERROR"),
    MEMBER_CONFLICT_ERROR(409,"MEMBER-ERR-400","MEMBER CONFLICT ERROR")
    ;

    private int status;
    private String errorCode;
    private String message;
}
