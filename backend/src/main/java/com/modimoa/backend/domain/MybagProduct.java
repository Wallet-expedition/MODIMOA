package com.modimoa.backend.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Optional;

@NoArgsConstructor
@Getter
@Setter
public class MybagProduct {

	private Optional<Product> product;
	private int count;
	private int status;

	@Builder
	public MybagProduct(Optional<Product> product, int count, int status) {
		this.product = product;
		this.count = count;
		this.status = status;
	}
}
