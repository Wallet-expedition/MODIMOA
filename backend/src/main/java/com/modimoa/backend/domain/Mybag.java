package com.modimoa.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@NoArgsConstructor
@Entity
@Getter
public class Mybag extends BaseTimeEntity {
    @Id
    @Column(name = "mybag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long mybagId;

    @Column(name = "product_id")
    private long productId;

    @Column(name = "count")
    private int count;

    @Column(name = "product_state")
    private int status;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Mybag(User user, long productId, int count, int status) {
        this.user = user;
        this.productId = productId;
        this.count = count;
        this.status = status;
    }

    public int getCount() {
        return count;
    }

    public void updateCount(int count) {
        this.count += count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    //구매전 1, 구매후 2, 기간만료 3으로 임시 설정
    public void updateStatus(int i) {
        this.status = i;
    }

    @Override
    public String toString() {
        return String.format("Mybag[mybag_id=%d, product_id='%d', count='%d']\n", mybagId, productId, count);
    }

}
