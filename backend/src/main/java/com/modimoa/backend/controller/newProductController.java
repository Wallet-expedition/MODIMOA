package com.modimoa.backend.controller;

import com.modimoa.backend.model.Mart;
import com.modimoa.backend.model.newProduct;
import com.modimoa.backend.repo.MartRepository;
import com.modimoa.backend.repo.newProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class newProductController {

    private final newProductRepository repository;

    @Autowired
    public newProductController(newProductRepository repository){
        this.repository = repository;
    }

    @GetMapping("/findall-product")
    @ResponseBody
    public String findAll(){

        String result = "";

        for(newProduct npr: repository.findAll()){
            result += npr + "</br>";
        }
        return result;
    }
}
