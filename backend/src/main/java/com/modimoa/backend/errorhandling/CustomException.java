package com.modimoa.backend.errorhandling;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException{
	private final ErrorCode errorCode;
}
