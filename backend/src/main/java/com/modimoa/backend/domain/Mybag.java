package com.modimoa.backend.domain;

import javax.persistence.*;

@Entity
public class Mybag {

    public static final long serialVersionUID = -6184044926029805156L;

    @Id//primary key
    @Column(name="mybag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long mybag_id;

    /*
    @Column(name="product_name")
    private String product_name;

    @Column(name="original_price")
    private long original_price;

    protected Product(){}

    public Product(String product_name, long original_price){
        this.product_name = product_name;
        this.original_price = original_price;
    }

    @Override
    public String toString(){
        return String.format("Product[product_id=%d, product_name='%s', original_price='%d']", product_id, product_name, original_price);
    }

    public String getProductId() {
        return product_id+"";
    }

     */
}
