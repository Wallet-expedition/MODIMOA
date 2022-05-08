package com.modimoa.backend.dto;

import com.modimoa.backend.domain.Mart;
import com.modimoa.backend.domain.Product;
import com.modimoa.backend.domain.SaleCategory;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ProductResponseDto extends BaseResponseDto {
    private long productId;
    private Mart martName;
    private String productName;
    private String productImage;
    private Integer originalPrice;
    private Integer salePrice;
    private LocalDate saleStartDay;
    private LocalDate saleEndDay;
    private SaleCategory saleCategory;
    private String giftName;
    private String giftImage;
    private Integer giftPrice;

    public static ProductResponseDto fromEntity(Product entity) {
        ProductResponseDto dto = new ProductResponseDto();
        dto.productId = entity.getProductId();
        dto.martName = entity.getMartName();
        dto.productName = entity.getProductName();
        dto.productImage = entity.getProductImage();
        dto.originalPrice = entity.getOriginalPrice();
        dto.salePrice = entity.getSalePrice();
        dto.saleStartDay = entity.getSaleStartDay();
        dto.saleEndDay = entity.getSaleEndDay();
        dto.saleCategory = entity.getSaleCategory();
        dto.giftName = entity.getGiftName();
        dto.giftImage = entity.getGiftImage();
        dto.giftPrice = entity.getGiftPrice();
        dto.setBaseResponse(entity);
        return dto;
    }
}
