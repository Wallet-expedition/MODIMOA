package com.modimoa.backend.service;

import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.domain.User;
import com.modimoa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String signUp(String userImage, String userEmail, Cookie[] oauthCookie) {
        String result = "";


        User user = userRepository.findByUserEmail(userEmail)
                .orElseGet(() -> userRepository
                        .save(new User(userEmail,userImage,oauthCookie[0].getValue())));



        return  "hello";
    }

    // Dao를 통해 모든 물품을 가져와서 반환하는 list형 함수
    public List<User> getAllUsers(){
        return userRepository.findAll();
    };

}
