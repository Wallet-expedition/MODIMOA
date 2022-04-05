package com.modimoa.backend.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Getter
@RequiredArgsConstructor
public class Product extends BaseTimeEntity implements Serializable {

	public static final long serialVersionUID = -6184044926029805156L;

	@Id//primary key
	@Column(name = "product_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long productId;

	@Column(name = "mart_name")
	@Enumerated(EnumType.STRING)
	private Mart martName;

	@Column(name = "product_name")
	private String productName;

	@Column(name = "product_image")
	private String productImage;

	@Column(name = "original_price")
	private Integer originalPrice;

	@Column(name = "sale_price")
	private Integer salePrice;

	@Column(name = "sale_start_day")
	private LocalDate saleStartDay;

	@Column(name = "sale_end_day")
	private LocalDate saleEndDay;

	@Column(name = "sale_category")
	@Enumerated(EnumType.STRING)
	private SaleCategory saleCategory;

	@Column(name = "gift_name")
	private String giftName;

	@Column(name = "gift_image")
	private String giftImage;

	@Column(name = "gift_price")
	private Integer giftPrice;


	public Product(long productId, Mart martName, String productName, Integer originalPrice, SaleCategory saleCategory, Integer salePrice) {
		this.productId = productId;
		this.martName = martName;
		this.productName = productName;
		this.originalPrice = originalPrice;
		this.saleCategory = saleCategory;
		this.salePrice = salePrice;
	}

	@Override
	public String toString() {
		return String.format("%d번 %s 할인: %s에서 %s을 %d원에 팝니다", productId, saleCategory, martName, productName, originalPrice);
	}

	public long getProductId() {
		return productId;
	}

}
