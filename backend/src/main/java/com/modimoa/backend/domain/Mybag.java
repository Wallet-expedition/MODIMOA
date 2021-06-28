package com.modimoa.backend.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
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

    @Column(name="count")
    private int count;
/*
    @OneToOne(mappedBy="mybag")
    private User user;
*/
    protected Mybag(){}

    public Mybag(long user_id, long product_id, int count){
        this.user_id = user_id;
        this.product_id = product_id;
        this.count = count;
    }


    @Override
    public String toString(){
        return String.format("Mybag[mybag_id=%d, user_id='%d', product_id='%d']", mybag_id, user_id, product_id);
    }

    public long getMybagId() {
        return mybag_id;
    }

}
