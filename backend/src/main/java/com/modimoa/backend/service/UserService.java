package com.modimoa.backend.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import com.modimoa.backend.domain.User;
import com.modimoa.backend.errorhandling.ErrorCode;
import com.modimoa.backend.errorhandling.MemberConflictException;
import com.modimoa.backend.errorhandling.ObjectNotFoundException;
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

    public void signUp(String userImage, String userEmail, String oauthCookie) {
        String result = "";

        Optional <User> user = userRepository.findByUserEmail(userEmail);

         if(user.isPresent()){
             throw new MemberConflictException("Member Conflict", ErrorCode.MEMBER_CONFLICT_ERROR);
        }else{
            user.orElseGet(() ->userRepository.save(new User(userEmail,userImage,oauthCookie,"new","new")));
        }
    }


    public String login(String userEmail) throws NoSuchAlgorithmException {
        String result ="";

        Optional <User> user = Optional.of(userRepository.findByUserEmail(userEmail).get());

        String userId=user.get().getUserEmail();

        String accessToken = EncryptionUtils.encryptSHA256(userEmail+userId+"access");
        String refreshToken= EncryptionUtils.encryptSHA256(userEmail+userId+"refresh");

        if(user.isPresent()){
            user.get().updateTokens(accessToken,refreshToken);
        }else{
            throw new ObjectNotFoundException("Object Not Found", ErrorCode.OBJECT_NOTFOUND_ERROR);
        }

        return accessToken;
    }


    // Dao를 통해 모든 물품을 가져와서 반환하는 list형 함수
    public List<User> getAllUsers(){
        return userRepository.findAll();
    };


    public void logout(String token) {

        Optional <User> user = Optional.of(userRepository.findByOauthToken(token).get());

        if(user.isPresent()){
            String accessToken="";
            String refreshToken="";
            user.get().updateTokens(accessToken,refreshToken);

        }else{
            throw new ObjectNotFoundException("Object Not Found", ErrorCode.OBJECT_NOTFOUND_ERROR);
        }

    }

    public void withdrawal(String token) {

        Optional <User> user = Optional.of(userRepository.findByAccessToken(token).get());

        if(user.isPresent()){
            userRepository.deleteByAccessToken(token);

        }else{
            throw new ObjectNotFoundException("Object Not Found", ErrorCode.OBJECT_NOTFOUND_ERROR);
        }

    }


    public Map getUserInfo(String token) {
        Map result= new HashMap<String,String>();

        Optional <User> user = Optional.of(userRepository.findByAccessToken(token).get());

        if(user.isPresent()){
            result.put("user_email", user.get().getUserEmail());
            result.put("user_image", user.get().getUserImage());

        }else{
            throw new ObjectNotFoundException("Object Not Found", ErrorCode.OBJECT_NOTFOUND_ERROR);
        }
        return result;

    }

}
