package com.modimoa.backend.controller;

import com.modimoa.backend.model.Mart;
import com.modimoa.backend.repo.MartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MartController {

    private final MartRepository repository;

    @Autowired
    public MartController(MartRepository repository){
        this.repository = repository;
    }

    @GetMapping("/findall-mart")
    @ResponseBody
    public String findAll(){

        String result = "";

        for(Mart mrt: repository.findAll()){
            result += mrt + "</br>";
        }
        return result;
    }
}
