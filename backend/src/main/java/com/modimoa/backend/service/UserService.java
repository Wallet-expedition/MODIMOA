package com.modimoa.backend.service;

import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.domain.User;
import com.modimoa.backend.errorhandling.CustomException;
import com.modimoa.backend.repository.MybagRepository;
import com.modimoa.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

@Service
@AllArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final MybagRepository mybagRepository;

    public void signUp(String userImage, String userEmail, String oauthCookie) {
        if (userRepository.findByUserEmail(userEmail).isPresent()) {
            throw new CustomException(MEMBER_CONFLICT_ERROR);
        }
        userRepository.save(new User(userEmail,userImage,oauthCookie,"new"));
    }

    public String login(String userEmail){
        User user = userRepository.findByUserEmail(userEmail).orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
        LocalTime time = LocalTime.now();
        String hourPlusMinute = String.valueOf(time.getHour()+ time.getMinute());
        String accessToken = EncryptionUtils.encryptSHA256(userEmail+hourPlusMinute+"access");
        user.updateTokens(accessToken);

        return accessToken;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public String logout(String token) {
        User user = userRepository.findByAccessToken(token).orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
        user.updateTokens("");

        return user.getUserEmail();
    }

    public String withdrawal(String token) {
        User user = userRepository.findByAccessToken(token).orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
        mybagRepository.deleteByUser(user);
        userRepository.deleteByAccessToken(token);
        return user.getUserEmail();
    }

    public Map<String, String> getUserInfo(String token) {
        Map<String, String> userInfo= new HashMap<>();
        User user = userRepository.findByAccessToken(token).orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
        userInfo.put("user_email", user.getUserEmail());
        userInfo.put("user_image", user.getUserImage());
        return userInfo;
    }
}
