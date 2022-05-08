package com.modimoa.backend.controller;

import com.modimoa.backend.domain.Product;
import com.modimoa.backend.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

	private final ProductService productService;

	// 전체 물품 가져오는 기능 
	@GetMapping("")
	public ResponseEntity<Page<Product>> getAllProducts(Pageable pageable) {
		return new ResponseEntity<>(productService.getAllProducts(pageable), HttpStatus.OK);
	}

	// 특정 id 물건 가져오는 기능
	@GetMapping("/{id}")
	public ResponseEntity<Product> getFilteredProduct(@PathVariable Long id) {
		return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
	}

	// 특정 마트 물건 가져오는 기능
	@GetMapping("pickmart/{mart}")
	public ResponseEntity<Page<Product>> getFilteredProduct(@PathVariable String mart, @RequestParam("q") String q, Pageable pageable) {
		return new ResponseEntity<>(productService.getFilteredProduct(mart, q, pageable), HttpStatus.OK);
	}
}
