package com.modimoa.backend.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="mart")
public class Mart implements Serializable {

    public static final long serialVersionUID = -6184044926029805156L;

    @Id//primary key
    @Column(name="Mart_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long mart_id;

    @Column(name="Mart_name")
    private String mart_name;

    @Column(name="Mart_category")
    private String mart_category;

    protected Mart(){}

    public Mart(String mart_name, String mart_category){
        this.mart_id = mart_id;
        this.mart_name = mart_name;
        this.mart_category = mart_category;
    }

    @Override
    public String toString(){
        return String.format("Mart[mart_id=%d, mart_name='%s', mart_category='%s']", mart_id, mart_name, mart_category);
    }
}
