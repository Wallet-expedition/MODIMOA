package com.modimoa.backend.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Product extends BaseTimeEntity implements Serializable {

    public static final long serialVersionUID = -6184044926029805156L;

    @Id//primary key
    @Column(name="product_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long productId;

    @Column(name="mart_name")
    @Enumerated(EnumType.STRING)
    private Mart martName;

    @Column(name="product_name")
    private String productName;

    @Column(name="original_price")
    private long originalPrice;

    public Product(){}

    public Product(Mart martName, String productName, long originalPrice){
        this.martName = martName;
        this.productName = productName;
        this.originalPrice = originalPrice;
    }

    @Override
    public String toString(){
        return String.format("%d: %s에서 %s을 %d원에 팝니다", productId, martName, productName, originalPrice);
    }

    public long getProductId() {
        return productId;
    }
}
