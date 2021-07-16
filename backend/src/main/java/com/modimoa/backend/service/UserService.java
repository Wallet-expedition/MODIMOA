package com.modimoa.backend.service;

import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.domain.User;
import com.modimoa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String signUp(String userImage, String userEmail, Cookie[] oauthCookie) {
        String result = "";

        boolean flag =false;
       Optional <User> user = userRepository.findByUserEmail(userEmail);
//               .orElseGet(() -> userRepository
//                       .save(new User(userEmail, userImage, oauthCookie[0].getValue()))));
        if(user.isPresent()){
            result = userEmail+"은 이미 존재합니다.";
        }else{
            user.orElseGet(() ->userRepository.save(new User(userEmail,userImage,oauthCookie[0].getValue())));
            result = userEmail+"로 회원가입 되었습니다.";
        }
        
        return  result;
    }

    // Dao를 통해 모든 물품을 가져와서 반환하는 list형 함수
    public List<User> getAllUsers(){
        return userRepository.findAll();
    };

}
