package com.modimoa.backend.controller;

import com.modimoa.backend.domain.Product;
import com.modimoa.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository repository;

    @Autowired
    public ProductController(ProductRepository repository){
        this.repository = repository;
    }

    @GetMapping("/convenience-store")
    @ResponseBody
    public String findAll(){

        String result = "";

        for(Product pr: repository.findAll()){
            result += pr + "</br>";
        }
        return result;
    }
}
