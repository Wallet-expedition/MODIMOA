package com.modimoa.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.net.InetAddress;
import java.net.UnknownHostException;

@Controller
@RequestMapping("/")
public class LoadBalancingController {
    @GetMapping("/")
    public String getUser(Model model) {

        String hostName, ipaddress;

        try {
            hostName = InetAddress.getLocalHost().getHostName();
            ipaddress = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            // TODO Auto-generated catch block
            hostName = new StringBuilder("Error : ").append(e.getLocalizedMessage()).toString();
            ipaddress = "";
        }

        model.addAttribute("hostname", hostName);
        model.addAttribute("ipaddress", ipaddress);

        return "index";
    }


}
