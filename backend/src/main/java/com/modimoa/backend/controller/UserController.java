package com.modimoa.backend.controller;


import com.modimoa.backend.domain.User;
import com.modimoa.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

	private static final UserService userService = new UserService();

	// 테스트용 사용자 모두 가져오는 api
	@GetMapping("")
	public String getAllUsers(@RequestHeader HttpHeaders requestHeader) {

		String cookie = requestHeader.toSingleValueMap().get("authorization");
		String result = "";

		for (User u : userService.getAllUsers()) {

			result += u + "</br>";
		}
		return result + cookie;
	}

	// 회원가입 기능
	@PostMapping("/new")
	public void addUserByToken(@RequestHeader HttpHeaders requestHeader, @RequestBody HashMap<String, String> map) {
		String userImage = map.get("user_image");
		String userEmail = map.get("user_email");

		String oauthCookie = requestHeader.toSingleValueMap().get("authorization");
		;

		userService.signUp(userImage, userEmail, oauthCookie);
	}

	// 로그인 기능, HttpHeaders로 사용자 토큰 받음
	@PostMapping("/login")
	public void loginUserByToken(HttpServletResponse response, @RequestBody HashMap<String, String> map) throws NoSuchAlgorithmException {
		String userEmail = map.get("user_email");

		//쿠키 유저내 검색 있으면 토큰 만들어서 반환, 없으면 실패 반환
		String accessToken = userService.login(userEmail);

		Cookie rCookie = new Cookie("accessToken", accessToken);
		rCookie.setPath("/");
		rCookie.setMaxAge(60 * 60 * 24 * 15);
		response.addCookie(rCookie);
	}

	// 회원탈퇴 기능, 사용자 정보 토큰으로 받을지 정해야함6
	@DeleteMapping("/withdrawal")
	public void withdrawal(@RequestHeader HttpHeaders requestHeader) {

		String withdrawal = requestHeader.toSingleValueMap().get("authorization");

		userService.withdrawal(withdrawal);
	}


	// 로그아웃 기능, 사용자 정보 넘기는 방식에 따라 수정 필요
	@PostMapping("/logout")
	public void logoutUserByToken(@RequestHeader HttpHeaders requestHeader) {

		String logoutCookie = requestHeader.toSingleValueMap().get("authorization");

		userService.logout(logoutCookie);

	}

	// 로그인 상태인지 확인 및 유저 정보 반환
	@PostMapping("/info")
	public Map getUserInfo(@RequestHeader HttpHeaders requestHeader) {

		String infoCookie = requestHeader.toSingleValueMap().get("authorization");

		Map result = userService.getUserInfo(infoCookie);

		return result;
	}


}
