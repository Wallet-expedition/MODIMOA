package com.modimoa.backend.controller;

import com.modimoa.backend.domain.Mart;
import com.modimoa.backend.domain.Product;
import com.modimoa.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService = new ProductService();


    // 모든 물건 가져오는 기능
    @GetMapping("")
    public Page<Product> getAllProducts(Pageable pageable){
        return productService.getAllProducts(pageable);
    }

    // 특정 마트 물건 가져오는 기능
    @GetMapping("/{id}")
    public Optional<Product> getFilteredProduct(@PathVariable Long id){
        return productService.getProductById(id);
    }

    // 특정 마트 물건 가져오는 기능
    @GetMapping("{mart}/{q}")
    public Page<Product> getFilteredProduct(@PathVariable String mart, @PathVariable String q, Pageable pageable){
        return productService.getFilteredProduct(mart, q, pageable);
    }

    // 정렬기준
        // 할인된가격순(salePrice)
        // 이름순(productName)
    // 필터링
        // 이름(q)
        // 마트(mart)

}
