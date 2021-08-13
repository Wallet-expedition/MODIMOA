package com.modimoa.backend.service;

import com.modimoa.backend.domain.User;
import com.modimoa.backend.errorhandling.ErrorCode;
import com.modimoa.backend.errorhandling.MemberConflictException;
import com.modimoa.backend.errorhandling.ObjectNotFoundException;
import com.modimoa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        Optional <User> user = userRepository.findByUserEmail(userEmail);
         if(user.isPresent()){
             throw new MemberConflictException("Member Conflict", ErrorCode.MEMBER_CONFLICT_ERROR);
        }else{
            user.orElseGet(() ->userRepository.save(new User(userEmail,userImage,oauthCookie,"new")));
        }
    }


    public String login(String userEmail) throws NoSuchAlgorithmException {

        Optional <User> user = userRepository.findByUserEmail(userEmail);
        user.orElseThrow(()->new ObjectNotFoundException("Object Not Found", ErrorCode.OBJECT_NOTFOUND_ERROR));

        String userId=user.get().getUserEmail();
        String accessToken = EncryptionUtils.encryptSHA256(userEmail+userId+"access");
        user.get().updateTokens(accessToken);

        return accessToken;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public void logout(String token) {

        Optional <User> user = userRepository.findByOauthToken(token);
        user.orElseThrow(()->new ObjectNotFoundException("Object Not Found", ErrorCode.OBJECT_NOTFOUND_ERROR));

        String accessToken="";
        user.get().updateTokens(accessToken);
    }

    public void withdrawal(String token) {

        Optional <User> user = userRepository.findByAccessToken(token);
        user.orElseThrow(()->new ObjectNotFoundException("Object Not Found", ErrorCode.OBJECT_NOTFOUND_ERROR));
        userRepository.deleteByAccessToken(token);
    }

    public Map<String, String> getUserInfo(String token) {
        Map<String, String> userInfo= new HashMap<>();

        Optional <User> user = userRepository.findByAccessToken(token);
        user.orElseThrow(()->new ObjectNotFoundException("Object Not Found", ErrorCode.OBJECT_NOTFOUND_ERROR));
        userInfo.put("user_email", user.get().getUserEmail());
        userInfo.put("user_image", user.get().getUserImage());
        return userInfo;

    }

}
