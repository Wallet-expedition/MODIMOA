package com.modimoa.backend.dto;

import com.modimoa.backend.domain.Mybag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MybagSaveReqDto {

    private long userId;
    private long productId;
    private int count;

    @Builder
    public MybagSaveReqDto(long userId, long productId, int count){
        this.userId = userId;
        this.productId = productId;
        this.count = count;
    }

    public Mybag toEntity(){
        return Mybag.builder()
                .userId(userId)
                .productId(productId)
                .count(count)
                .build();
    }
}
