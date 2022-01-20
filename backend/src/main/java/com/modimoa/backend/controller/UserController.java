package com.modimoa.backend.controller;


import com.modimoa.backend.domain.User;
import com.modimoa.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"https://modimoa.kro.kr", "http://110.34.75.163:3000", "http://localhost:3000", "http://127.0.0.1:3000/"}, allowCredentials = "true")
@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserService userService;

	// 테스트용 사용자 모두 가져오는 api
	@GetMapping("")
	public ResponseEntity<String> getAllUsers(@RequestHeader HttpHeaders requestHeader) {

		String cookie = requestHeader.toSingleValueMap().get("authorization");
		String result = "";

		for (User u : userService.getAllUsers()) {
			result += u + "</br>";
		}
		return new ResponseEntity<>(result + cookie, HttpStatus.OK);
	}

	// 회원가입 기능
	@PostMapping("/new")
	public ResponseEntity<String> addUserByToken(@RequestHeader HttpHeaders requestHeader, @RequestBody HashMap<String, String> map) {
		String userImage = map.get("user_image");
		String userEmail = map.get("user_email");

		String oauthCookie = requestHeader.toSingleValueMap().get("authorization");
		userService.signUp(userImage, userEmail, oauthCookie);

		return new ResponseEntity<>(userEmail + " 회원가입 되었습니다.", HttpStatus.CREATED);
	}

	// 로그인 기능, HttpHeaders로 사용자 토큰 받음
	@PostMapping("/login")
	public ResponseEntity<String> loginUserByToken(HttpServletResponse response, @RequestBody HashMap<String, String> map) throws NoSuchAlgorithmException {
		String userEmail = map.get("user_email");

		//쿠키 유저내 검색 있으면 토큰 만들어서 반환, 없으면 실패 반환
		String accessToken = userService.login(userEmail);

		ResponseCookie cookie = ResponseCookie.from("accessToken", accessToken)
				.path("/")
				.secure(true)
				.sameSite("None")
				.httpOnly(false)
				.maxAge(60 * 60 * 24 * 15)
				.domain("localhost")
				.build();
		response.setHeader("Set-Cookie", cookie.toString());

		return new ResponseEntity<>(userEmail + " 로그인 되었습니다.", HttpStatus.OK);
	}

	// 회원탈퇴 기능
	@DeleteMapping("/withdrawal")
	public ResponseEntity<String> withdrawal(@RequestHeader HttpHeaders requestHeader) {

		String withdrawal = requestHeader.toSingleValueMap().get("authorization");
		String userEmail = userService.withdrawal(withdrawal);

		return new ResponseEntity<>(userEmail + " 회원 탈퇴 되었습니다.", HttpStatus.OK);
	}


	// 로그아웃 기능
	@PostMapping("/logout")
	public ResponseEntity<String> logoutUserByToken(@RequestHeader HttpHeaders requestHeader) {

		String logoutCookie = requestHeader.toSingleValueMap().get("authorization");
		String userEmail = userService.logout(logoutCookie);

		return new ResponseEntity<>(userEmail+" 로그아웃 되었습니다.", HttpStatus.OK);
	}

	// 로그인 상태인지 확인 및 유저 정보 반환
	@PostMapping("/info")
	public ResponseEntity<Map> getUserInfo(@RequestHeader HttpHeaders requestHeader) {

		String infoCookie = requestHeader.toSingleValueMap().get("authorization");
		Map result = userService.getUserInfo(infoCookie);

		return new ResponseEntity<>(result, HttpStatus.OK);
	}


}
