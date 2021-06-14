package com.modimoa.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class MainController {

    @RequestMapping("products")
    public String callproduct(){
        return "products";
    }

  /*
    @RequestMapping("user")
    public String calluser(){
        return "user";
    }

    @RequestMapping("mybag")
    public String callmybag(){
        return "mybag";
    }
*/
}
