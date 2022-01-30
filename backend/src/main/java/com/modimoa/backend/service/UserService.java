package com.modimoa.backend.service;

import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.domain.User;
import com.modimoa.backend.errorhandling.CustomException;
import com.modimoa.backend.repository.MybagRepository;
import com.modimoa.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.modimoa.backend.errorhandling.ErrorCode.MEMBER_CONFLICT_ERROR;
import static com.modimoa.backend.errorhandling.ErrorCode.OBJECT_NOTFOUND_ERROR;

@Transactional
@Service
public class UserService {

    private final UserRepository userRepository;
<<<<<<< HEAD

    @Autowired
    private MybagRepository mybagRepository;
=======
  
    @Autowired
    private MybagRepository mybagRepository;


>>>>>>> Backend-unitTest
    public UserService(UserRepository userRepository) {this.userRepository = userRepository;
    }
    public String signUp(String userImage, String userEmail, String oauthCookie) {
        Optional <User> user = userRepository.findByUserEmail(userEmail);
         if(user.isPresent()){
             throw new CustomException(MEMBER_CONFLICT_ERROR);
         }else{
            user.orElseGet(() ->userRepository.save(new User(userEmail,userImage,oauthCookie,"new")));
            return "새로운 유저 생성";
        }

    }


    public String login(String userEmail){

        Optional <User> user = userRepository.findByUserEmail(userEmail);
        user.orElseThrow(()->new CustomException(OBJECT_NOTFOUND_ERROR));

        LocalTime time = LocalTime.now();
        String hourPlusMinute = String.valueOf(time.getHour()+ time.getMinute());
        String accessToken = EncryptionUtils.encryptSHA256(userEmail+hourPlusMinute+"access");
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
