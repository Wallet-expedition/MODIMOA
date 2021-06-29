package com.modimoa.backend.controller;

import com.modimoa.backend.config.auth.dto.SessionUser;
import com.modimoa.backend.repository.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@Controller
public class indexController {


    private final HttpSession httpSession;

    @GetMapping("/")
    public String index(Model model, @LoginUser SessionUser user){



        if(user != null){
            model.addAttribute("userName",user.getUser_name());
        }

        return "index";
    }
}
