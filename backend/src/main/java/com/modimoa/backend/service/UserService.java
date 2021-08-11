package com.modimoa.backend.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import com.modimoa.backend.domain.User;
import com.modimoa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Transactional
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String signUp(String userImage, String userEmail, String oauthCookie) {
        String result = "";

        Optional <User> user = userRepository.findByUserEmail(userEmail);


         if(user.isPresent()){

             //예외처리(409)
            result = userEmail+"은 이미 존재합니다.";
        }else{
            user.orElseGet(() ->userRepository.save(new User(userEmail,userImage,oauthCookie,"new","new")));
            result = "success";
        }
        return  result;
    }


    public String login(String userEmail) throws NoSuchAlgorithmException {
        String result ="";

        Optional <User> user = Optional.of(userRepository.findByUserEmail(userEmail).get());

        String userId=user.get().getUserEmail();

        String accessToken = EncryptionUtils.encryptSHA256(userEmail+userId+"access");
        String refreshToken= EncryptionUtils.encryptSHA256(userEmail+userId+"refresh");

        if(user.isPresent()){
            user.get().updateTokens(accessToken,refreshToken);
            result = user.get().getUserEmail()+"로 로그인 되었습니다."+" access: "+accessToken+" refresh: "+refreshToken;
        }else{
            //예외처리(유저 존재하지 않음403 forbidden)
            result = "로그인에 실패하셨습니다.";
        }

        return accessToken;
    }


    // Dao를 통해 모든 물품을 가져와서 반환하는 list형 함수
    public List<User> getAllUsers(){
        return userRepository.findAll();
    };


    public void logout(String token) {
        String result ="";

        Optional <User> user = Optional.of(userRepository.findByOauthToken(token).get());

        if(user.isPresent()){
            String accessToken="";
            String refreshToken="";
            user.get().updateTokens(accessToken,refreshToken);

        }else{
            //예외처리(403 forbidden)
        }

    }

    public void withdrawal(String token) {

        Optional <User> user = Optional.of(userRepository.findByAccessToken(token).get());

        if(user.isPresent()){
            userRepository.deleteByAccessToken(token);

        }else{
            //예외처리 403forbidden
        }

    }


    public Map getUserInfo(String token) {
        Map result= new HashMap<String,String>();

        Optional <User> user = Optional.of(userRepository.findByAccessToken(token).get());

        if(user.isPresent()){
            result.put("user_email", user.get().getUserEmail());
            result.put("user_image", user.get().getUserImage());

        }else{
            //예외처리 403forbidden
        }
        return result;

    }

}
