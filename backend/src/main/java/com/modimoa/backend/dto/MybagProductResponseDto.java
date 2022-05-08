package com.modimoa.backend.dto;

import com.modimoa.backend.domain.Product;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class MybagProductResponseDto {

    private Optional<Product> product;
    private long id;
    private int count;
    private int status;

    @Builder
    public MybagProductResponseDto(Optional<Product> product, long id, int count, int status) {
        this.product = product;
        this.id = id;
        this.count = count;
        this.status = status;
    }
}
