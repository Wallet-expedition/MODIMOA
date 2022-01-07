package com.modimoa.backend.controller;

import com.modimoa.backend.domain.Product;
import com.modimoa.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/product")
public class ProductController {

	@Autowired
	private ProductService productService = new ProductService();

	// 전체 물품 가져오는 기능
	@GetMapping("")
	public Page<Product> getAllProducts(Pageable pageable) {
		return productService.getAllProducts(pageable);
	}

	// 특정 id 물건 가져오는 기능
	@GetMapping("/{id}")
	public Optional<Product> getFilteredProduct(@PathVariable Long id) {
		return productService.getProductById(id);
	}

	// 특정 마트 물건 가져오는 기능
	@GetMapping("pickmart/{mart}/{q}")
	public Page<Product> getFilteredProduct(@PathVariable String mart, @PathVariable String q, Pageable pageable) {
		return productService.getFilteredProduct(mart, q, pageable);
	}
}
