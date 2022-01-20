package com.modimoa.backend.controller;

import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.domain.MybagProduct;
import com.modimoa.backend.domain.Product;
import com.modimoa.backend.service.MybagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = {"https://modimoa.kro.kr", "http://110.34.75.163:3000", "http://localhost:3000", "http://127.0.0.1:3000/"}, allowCredentials = "true")
@RestController
@RequestMapping(value = "/api/mybag")
public class MybagController {

	@Autowired
	private MybagService mybagService;

	// 장바구니에서 user의 물건 조회하는 기능
	@GetMapping("")
	public ResponseEntity<List<MybagProduct>> findAll(@RequestHeader HttpHeaders requestHeader) {
		String accessToken = requestHeader.toSingleValueMap().get("authorization");
		return new ResponseEntity<>(mybagService.findAll(accessToken), HttpStatus.OK);
	}

	// 장바구니에서 user의 물건 가격 알려주는 기능
	@GetMapping("/prices")
	public ResponseEntity<Map<String, Integer>> getPrice(@RequestHeader HttpHeaders requestHeader) {
		String accessToken = requestHeader.toSingleValueMap().get("authorization");
		return new ResponseEntity<>(mybagService.getPrice(accessToken), HttpStatus.OK);
	}

	// 장바구니에 새 물건 추가하는 기능, 기존에 물건이 있으면 개수 증가
	@PostMapping("/{productId}")
	public ResponseEntity<String> addItem(@PathVariable Long productId, @RequestHeader HttpHeaders requestHeader) {
		String accessToken = requestHeader.toSingleValueMap().get("authorization");
		String userEmail = mybagService.plusItemOrCreateCount(accessToken, productId);

		return new ResponseEntity<>(userEmail + " 장바구니에 상품 추가됨", HttpStatus.CREATED);
	}

	// 장바구니 물건에서 물건 삭제하는 기능 (0으로 수량 변경하는 것과 동일)
	@DeleteMapping("/delete/{productId}")
	public ResponseEntity<String> deleteItem(@PathVariable Long productId, @RequestHeader HttpHeaders requestHeader) {
		String accessToken = requestHeader.toSingleValueMap().get("authorization");
		String userEmail = mybagService.deleteItem(accessToken, productId);
		return new ResponseEntity<>(userEmail + " 장바구니에서 상품 삭제됨", HttpStatus.OK);
	}

	// 장바구니 물건 수량 변경하는 기능, 단 0이면 삭제
	@PostMapping("/changecnt/{productId}")
	public ResponseEntity<String> changeItemCount(@PathVariable Long productId, @RequestHeader HttpHeaders requestHeader, @RequestBody Map<String, Integer> body) {
		String accessToken = requestHeader.toSingleValueMap().get("authorization");
		int count = body.get("count");
		String userEmail = mybagService.changeItemCount(accessToken, productId, count);

		return new ResponseEntity<>(userEmail + " 장바구니 상품 개수가 변경됨", HttpStatus.OK);
	}

	// 장바구니에서 구매 여부 변경하는 기능
	@PatchMapping("/changestat/{productId}")
	public ResponseEntity<String> changeItemStatus(@PathVariable Long productId, @RequestHeader HttpHeaders requestHeader, @RequestBody Map<String, Integer> body) {
		String accessToken = requestHeader.toSingleValueMap().get("authorization");
		int status = body.get("status");
		String userEmail = mybagService.changeItemStatus(accessToken, productId, status);

		return new ResponseEntity<>( userEmail + " 장바구니 상품 구매 상태가 변경됨", HttpStatus.OK);
	}

}
