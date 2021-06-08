package com.modimoa.backend.controller;

import com.modimoa.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }
}

