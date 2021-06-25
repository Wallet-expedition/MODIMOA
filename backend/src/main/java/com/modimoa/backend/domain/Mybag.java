package com.modimoa.backend.domain;

import javax.persistence.*;

@Entity
public class Mybag {

    public static final long serialVersionUID = -6184044926029805156L;

    @Id//primary key
    @Column(name="mybag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long mybag_id;

    @Column(name="user_id")
    private long user_id;

    @Column(name="product_id")
    private long product_id;

    protected Mybag(){}

    public Mybag(long user_id, long product_id){
        this.user_id = user_id;
        this.product_id = product_id;
    }

    @Override
    public String toString(){
        return String.format("Mybag[mybag_id=%d, user_id='%d', product_id='%d']", mybag_id, user_id, product_id);
    }

    public String getMybagId() {
        return mybag_id+"";
    }

}
