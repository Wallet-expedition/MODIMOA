package com.modimoa.backend.domain;

public enum SaleCategory {
    OnePlusOne("1+1"),
    TwoPlusOne("2+1"),
    ThreePlusOne("3+1"),
    Gift("증정"),
    Discount("가격"),
    FlatPrice("균일가");

    private String krname;

    SaleCategory(String krname){
        this.krname = krname;
    }

    public String getKrname(){
        return krname;
    }
}
