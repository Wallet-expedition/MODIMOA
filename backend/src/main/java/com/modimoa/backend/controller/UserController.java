package com.modimoa.backend.controller;

import com.modimoa.backend.domain.User;
import com.modimoa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final UserRepository repository;

    @Autowired
    public UserController(UserRepository repository){
        this.repository = repository;
    }

    @GetMapping("/save-user")
    public String process(){
        repository.save(new User("11111", "ssdd"));
        repository.save(new User("2222", "yyjytre"));
        return "Done";
    }

    @GetMapping("/findall-user")
    @ResponseBody
    public String findAll(){

        String result = "";

        for(User usr: repository.findAll()){
            result += usr + "</br>";
        }
        return result;
    }
}
