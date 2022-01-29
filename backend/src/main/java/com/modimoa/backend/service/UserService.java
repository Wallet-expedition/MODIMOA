package com.modimoa.backend.service;

import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.domain.User;
import com.modimoa.backend.errorhandling.CustomException;
import com.modimoa.backend.repository.MybagRepository;
import com.modimoa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.modimoa.backend.errorhandling.ErrorCode.MEMBER_CONFLICT_ERROR;
import static com.modimoa.backend.errorhandling.ErrorCode.OBJECT_NOTFOUND_ERROR;

@Transactional
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MybagRepository mybagRepository;

    public void signUp(String userImage, String userEmail, String oauthCookie) {
        Optional <User> user = userRepository.findByUserEmail(userEmail);
         if(user.isPresent()){
             throw new CustomException(MEMBER_CONFLICT_ERROR);
        }else{
            user.orElseGet(() ->userRepository.save(new User(userEmail,userImage,oauthCookie,"new")));
        }
    }


    public String login(String userEmail) throws NoSuchAlgorithmException {

        Optional <User> user = userRepository.findByUserEmail(userEmail);
        user.orElseThrow(()->new CustomException(OBJECT_NOTFOUND_ERROR));

        String userId=user.get().getUserEmail();
        String accessToken = EncryptionUtils.encryptSHA256(userEmail+userId+"access");
        user.get().updateTokens(accessToken);

        return accessToken;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public String logout(String token) {

        Optional <User> user = userRepository.findByAccessToken(token);
        user.orElseThrow(()->new CustomException(OBJECT_NOTFOUND_ERROR));
        user.get().updateTokens("");

        return user.get().getUserEmail();
    }

    public String withdrawal(String token) {

        Optional <User> user = userRepository.findByAccessToken(token);
        user.orElseThrow(()->new CustomException(OBJECT_NOTFOUND_ERROR));
        mybagRepository.deleteByUser(user.get());
        userRepository.deleteByAccessToken(token);
        return user.get().getUserEmail();
    }

    public Map<String, String> getUserInfo(String token) {
        Map<String, String> userInfo= new HashMap<>();

        Optional <User> user = userRepository.findByAccessToken(token);
        user.orElseThrow(()->new CustomException(OBJECT_NOTFOUND_ERROR));
        userInfo.put("user_email", user.get().getUserEmail());
        userInfo.put("user_image", user.get().getUserImage());
        return userInfo;

    }

}
