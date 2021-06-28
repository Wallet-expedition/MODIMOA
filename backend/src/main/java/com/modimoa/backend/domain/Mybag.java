package com.modimoa.backend.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Mybag {

    public static final long serialVersionUID = -6184044926029805156L;

    @Id//primary key
    @Column(name="mybag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long mybagId;

    @Column(name="user_id")
    private long userId;

    @Column(name="product_id")
    private long productId;

    @Column(name="count")
    private int count;

    @Column(name="status")
    private int status;
/*
    @OneToOne(mappedBy="mybag")
    private User user;
*/
    @Builder
    public Mybag(long userId, long productId, int count, int status){
        this.userId = userId;
        this.productId = productId;
        this.count = count;
        this.status = status;
    }

    public void updateCount(int count){
        this.count += count;
    }

    //구매전 1, 구매후 2, 기간만료 3으로 임시 설정
    public void updateStatus(int i) {
        this.status = status;
    }
/*
    @Override
    public String toString(){
        return String.format("Mybag[mybag_id=%d, user_id='%d', product_id='%d', count='%d']", mybagId, userId, productId, count);
    }
*/
    public long getMybagId() {
        return mybagId;
    }


}
