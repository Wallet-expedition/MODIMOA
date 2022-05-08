package com.modimoa.backend.dto;

import com.modimoa.backend.domain.BaseTimeEntity;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BaseResponseDto {
    private LocalDateTime createdDate;

    public void setBaseResponse(BaseTimeEntity entity) {
        this.createdDate = entity.getCreatedDate();
    }
}
