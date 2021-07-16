package com.modimoa.backend.controller;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.modimoa.backend.domain.User;
import com.modimoa.backend.service.UserService;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.spring.web.json.Json;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {


    @Autowired
    private UserService userService = new UserService();

    // 테스트용 사용자 모두 가져오는 api
    @GetMapping("")
    public String getAllUsers() {

        String result = "";

        for (User u : userService.getAllUsers()) {
            result += u + "</br>";
        }
        return result;
    }

    // 회원가입 기능, 사용자 정보 토큰으로 받을지 정해야함
    @PostMapping("/new")
    public String addUserByToken(HttpServletRequest request, @RequestBody HashMap<String, String> map) {
        String userImage = map.get("user_image");
        String userEmail = map.get("user_email");


        Cookie[] oauthCookie = request.getCookies();

        String result = userService.signUp(userImage, userEmail, oauthCookie);
        System.out.println("쿠키 :" + oauthCookie[0].getName() + " " + oauthCookie[0].getValue() + "userId" + userImage + "User_email" + userEmail);
        //추후 구현

        return result;
    }

    // 로그인 기능, 사용자 정보 넘기는 방식에 따라 수정 필요
    @PostMapping("/login")
    public String loginUserByToken(HttpServletRequest request) {

        // 쿠기 받기
        Cookie[] loginCookie = request.getCookies();

        //쿠키 유저내 검색 있으면 토큰 만들어서 반환, 없으면 실패 반환
        String result = userService.login(loginCookie[0].getValue());

        return result;
    }

    // 회원탈퇴 기능, 사용자 정보 토큰으로 받을지 정해야함
    @DeleteMapping("/withdrawal")
    public String withdrawal(HttpServletRequest request) {

        Cookie[] withdrawal = request.getCookies();

        String result = userService.withdrawal(withdrawal[0].getValue());
        //추후 구현
        return result;
    }


    // 로그아웃 기능, 사용자 정보 넘기는 방식에 따라 수정 필요
    // http method delete 아닐 수 있음, 수정 필요
    @PostMapping("/logout")
    public String logoutUserByToken(HttpServletRequest request) {

        Cookie[] logoutCookie = request.getCookies();

        String result = userService.logout(logoutCookie[0].getValue());
        //추후 구현
        return result;
    }

    // 로그인 상태인지 확인 및 유저 정보 반환
    @PostMapping("/Info")
    public Map getUserInfo(HttpServletRequest request) {

        Cookie[] infoCookie = request.getCookies();

        Map result = userService.getUserInfo(infoCookie[0].getValue());

        return result;
    }

}
