package com.modimoa.backend.controller;

import com.modimoa.backend.domain.Product;
import com.modimoa.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = {"https://modimoa.kro.kr", "http://110.34.75.163:3000", "http://localhost:3000", "http://127.0.0.1:3000/"})
@RestController
@RequestMapping("/api/product")
public class ProductController {

	@Autowired
	private ProductService productService;

	// 전체 물품 가져오는 기능
	@GetMapping("")
	public ResponseEntity<Page<Product>> getAllProducts(Pageable pageable) {
		return new ResponseEntity<>(productService.getAllProducts(pageable), HttpStatus.OK);
	}

	// 특정 id 물건 가져오는 기능
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Product>> getFilteredProduct(@PathVariable Long id) {
		return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
	}

	// 특정 마트 물건 가져오는 기능
	@GetMapping("pickmart/{mart}/{q}")
	public ResponseEntity<Page<Product>> getFilteredProduct(@PathVariable String mart, @PathVariable String q, Pageable pageable) {
		return new ResponseEntity<>(productService.getFilteredProduct(mart, q, pageable), HttpStatus.OK);
	}
}
