package com.modimoa.backend.domain;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name="product")
public class Product {

    @Id//primary key
    @Column(name="product_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long pro_id;

    @Column(name="mart_id")
    private Long mart_id;//외래키

    @Column(name="product_name")
    private String pro_name;

    @Column(name="product_image")
    private String pro_image;

    @Column(name="original_price")
    private Long pro_OP;

    @Column(name="sale_price")
    private Long pro_SP;

    @Column(name="sale_start_day")
    private Date pro_SSD;

    @Column(name="sale_end_day")
    private Date pro_SED;

    @Column(name="sale_category")
    private String pro_SC;

    @Column(name="gift_name")
    private String gift_name;

    @Column(name="gift_image")
    private String gift_image;

    @Column(name="created_date")
    private Date pro_CD;

    @Column(name="modified_date")
    private Date pro_MD;

    public Long getPro_id() {
        return pro_id;
    }

    public void setPro_id(Long pro_id) {
        this.pro_id = pro_id;
    }

    public Long getMart_id() {
        return mart_id;
    }

    public void setMart_id(Long mart_id) {
        this.mart_id = mart_id;
    }

    public String getPro_name() {
        return pro_name;
    }

    public void setPro_name(String pro_name) {
        this.pro_name = pro_name;
    }

    public String getPro_image() {
        return pro_image;
    }

    public void setPro_image(String pro_image) {
        this.pro_image = pro_image;
    }

    public Long getPro_OP() {
        return pro_OP;
    }

    public void setPro_OP(Long pro_OP) {
        this.pro_OP = pro_OP;
    }

    public Long getPro_SP() {
        return pro_SP;
    }

    public void setPro_SP(Long pro_SP) {
        this.pro_SP = pro_SP;
    }

    public Date getPro_SSD() {
        return pro_SSD;
    }

    public void setPro_SSD(Date pro_SSD) {
        this.pro_SSD = pro_SSD;
    }

    public Date getPro_SED() {
        return pro_SED;
    }

    public void setPro_SED(Date pro_SED) {
        this.pro_SED = pro_SED;
    }

    public String getPro_SC() {
        return pro_SC;
    }

    public void setPro_SC(String pro_SC) {
        this.pro_SC = pro_SC;
    }

    public String getGift_name() {
        return gift_name;
    }

    public void setGift_name(String gift_name) {
        this.gift_name = gift_name;
    }

    public String getGift_image() {
        return gift_image;
    }

    public void setGift_image(String gift_image) {
        this.gift_image = gift_image;
    }

    public Date getPro_CD() {
        return pro_CD;
    }

    public void setPro_CD(Date pro_CD) {
        this.pro_CD = pro_CD;
    }

    public Date getPro_MD() {
        return pro_MD;
    }

    public void setPro_MD(Date pro_MD) {
        this.pro_MD = pro_MD;
    }
}
