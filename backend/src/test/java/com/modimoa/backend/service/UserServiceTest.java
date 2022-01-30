package com.modimoa.backend.service;


import com.modimoa.backend.domain.User;
import com.modimoa.backend.errorhandling.CustomException;
import com.modimoa.backend.repository.UserRepository;
import org.junit.Test;
import org.mockito.Mockito;

import java.security.NoSuchAlgorithmException;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static junit.framework.TestCase.*;


public class UserServiceTest {

    @Test(expected = CustomException.class)
    public void signUpTest존재_할때(){
        //setUp
        UserRepository repo = Mockito.mock(UserRepository.class);
        Mockito.when(repo.findByUserEmail("userEmail"))
                .thenReturn(Optional.of((new User("userEmail", "userImage", "oauthToken", "accessToken"))));
        UserService userService = new UserService(repo);

        //when
        String activeSignUp = userService.signUp("userImage","userEmail","oauthCookie");

        //then
        assertEquals("이미 존재하는 유저입니다.",activeSignUp);
    }
    @Test
    public void signUpTest존재_안할때(){
        //setUp
        UserRepository repo = Mockito.mock(UserRepository.class);
        Mockito.when(repo.findByUserEmail("UserEamil"))
                .thenReturn(null);
        UserService userService = new UserService(repo);

        //when
        String activeSignUp = userService.signUp("userImage","userEmail","oauthCookie");

        //then
        assertEquals("새로운 유저 생성",activeSignUp);
    }

    @Test(expected = CustomException.class)
    public void loginTest존재_안할때() throws NoSuchAlgorithmException {
        //setUp
        UserRepository repo = Mockito.mock(UserRepository.class);
        Mockito.when(repo.findByUserEmail("userEmail"))
                .thenReturn(Optional.empty());
        UserService userService = new UserService(repo);

        //when
        String activateLogin = userService.login("userEmail");

        LocalTime time = LocalTime.now();
        String hourPlusMinute = String.valueOf(time.getHour()+ time.getMinute());
        String expectAccessToken = EncryptionUtils.encryptSHA256("userEmail"+hourPlusMinute+"access");

        //then
        assertEquals(expectAccessToken,activateLogin);
    }

    @Test
    public void loginTest존재_할때() throws NoSuchAlgorithmException {
        //setUp
        UserRepository repo = Mockito.mock(UserRepository.class);
        Mockito.when(repo.findByUserEmail("userEmail"))
                .thenReturn(Optional.of((new User("userEmail", "userImage", "oauthToken", "accessToken"))));
        UserService userService = new UserService(repo);

        //when
        String activateLogin = userService.login("userEmail");

        LocalTime time = LocalTime.now();
        String hourPlusMinute = String.valueOf(time.getHour()+ time.getMinute());
        String expectAccessToken = EncryptionUtils.encryptSHA256("userEmail"+hourPlusMinute+"access");

        //then
        assertEquals(expectAccessToken,activateLogin);
    }

    @Test
    public void getAllUsersTest(){
        UserRepository repo = Mockito.mock(UserRepository.class);
        Mockito.when(repo.findAll())
                .thenReturn(Collections.singletonList(new User("userEmail", "userImage", "accessToken", "oauthToken")));
        UserService userService = new UserService(repo);

        //when
        List<User> userList = userService.getAllUsers();

        //then
        assertEquals("userEmail",userList.get(0).getUserEmail());
    }

    @Test(expected = CustomException.class)
    public void logoutTest존재_안할때(){
        //setUp
        UserRepository repo = Mockito.mock(UserRepository.class);
        Mockito.when(repo.findByAccessToken("accessToken"))
                .thenReturn(Optional.empty());
        UserService userService = new UserService(repo);

        //when
        String activateLogin = userService.logout("accessToken");


        //then
        assertEquals(Optional.empty(),activateLogin);
    }

    @Test
    public void logoutTest존재_할때(){
        //setUp
        UserRepository repo = Mockito.mock(UserRepository.class);
        Mockito.when(repo.findByAccessToken("accessToken"))
                .thenReturn(Optional.of((new User("userEmail", "userImage", "oauthToken", "accessToken"))));
        UserService userService = new UserService(repo);

        //when
        String activateLogin = userService.logout("accessToken");


        //then
        assertEquals("userEmail",activateLogin);
    }

    @Test(expected = CustomException.class)
    public void withdrawalTest존재_안할때(){
        //setUp
        UserRepository repo = Mockito.mock(UserRepository.class);
        Mockito.when(repo.findByAccessToken("accessToken"))
                .thenReturn(Optional.empty());
        UserService userService = new UserService(repo);

        //when
        String activateLogin = userService.withdrawal("accessToken");


        //then
        assertEquals(Optional.empty(),activateLogin);
    }

    @Test
    public void withdrawal존재_할때() throws NoSuchAlgorithmException {
        //setUp
        UserRepository repo = Mockito.mock(UserRepository.class);
        Mockito.when(repo.findByAccessToken("accessToken"))
                .thenReturn(Optional.of((new User("userEmail", "userImage", "oauthToken", "accessToken"))));
        UserService userService = new UserService(repo);

        //when
        String activateLogin = userService.withdrawal("accessToken");


        //then
        assertEquals("userEmail",activateLogin);
    }

    @Test(expected = CustomException.class)
    public void getUserInfoTest존재_안할때(){
        //setUp
        UserRepository repo = Mockito.mock(UserRepository.class);
        Mockito.when(repo.findByAccessToken("accessToken"))
                .thenReturn(Optional.empty());
        UserService userService = new UserService(repo);

        //when
        Map<String, String> activateLogin = userService.getUserInfo("accessToken");


        //then
        assertEquals("userEmail",activateLogin.get("user_email"));
        assertEquals("userImage",activateLogin.get("user_image"));

    }

    @Test
    public void getUserInfo존재_할때() throws NoSuchAlgorithmException {
        //setUp
        UserRepository repo = Mockito.mock(UserRepository.class);
        Mockito.when(repo.findByAccessToken("accessToken"))
                .thenReturn(Optional.of((new User("userEmail", "userImage", "oauthToken", "accessToken"))));
        UserService userService = new UserService(repo);

        //when
        Map<String, String> activateLogin = userService.getUserInfo("accessToken");


        //then
        assertEquals("userEmail",activateLogin.get("user_email"));
        assertEquals("userImage",activateLogin.get("user_image"));

    }







}
