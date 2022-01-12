package com.modimoa.backend.controller;

import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.service.MybagService;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("https://modimoa.kro.kr")
@RestController
@RequestMapping(value = "/api/mybag")
public class MybagController {

	private final MybagService mybagService;

	public MybagController(MybagService mybagService) {
		this.mybagService = mybagService;
	}

	// 장바구니에서 user의 물건 조회하는 기능
	@GetMapping("")
	public List<Mybag> findAll(@RequestHeader HttpHeaders requestHeader) {
		String accessToken = requestHeader.toSingleValueMap().get("authorization");
		return mybagService.findAll(accessToken);
	}

	// 장바구니에서 user의 물건 가격 알려주는 기능
	@GetMapping("/prices")
	public Map<String, Integer> getPrice(@RequestHeader HttpHeaders requestHeader) {
		String accessToken = requestHeader.toSingleValueMap().get("authorization");

		return mybagService.getPrice(accessToken);
	}

	// 장바구니에 새 물건 추가하는 기능, 기존에 물건이 있으면 개수 증가
	@PostMapping("/{productId}")
	public String addItem(@PathVariable Long productId, @RequestHeader HttpHeaders requestHeader) {
		String accessToken = requestHeader.toSingleValueMap().get("authorization");
		mybagService.plusItemOrCreateCount(accessToken, productId);

		return "장바구니에 상품 추가됨";
	}

	// 장바구니 물건에서 물건 삭제하는 기능 (0으로 수량 변경하는 것과 동일)
	@DeleteMapping("/delete/{productId}")
	public String deleteItem(@PathVariable Long productId, @RequestHeader HttpHeaders requestHeader) {
		String accessToken = requestHeader.toSingleValueMap().get("authorization");
		mybagService.deleteItem(accessToken, productId);
		return "장바구니에서 상품 삭제됨";
	}

	// 장바구니 물건 수량 변경하는 기능, 단 0이면 삭제
	@PostMapping("/changecnt/{productId}")
	public String changeItemCount(@PathVariable Long productId, @RequestHeader HttpHeaders requestHeader) {

		String accessToken = requestHeader.toSingleValueMap().get("authorization");
		int count = Integer.parseInt(requestHeader.toSingleValueMap().get("count"));
		mybagService.changeItemCount(accessToken, productId, count);

		return "장바구니 상품 개수가 변경됨";
	}

	// 장바구니에서 구매 여부 변경하는 기능
	@PatchMapping("/changestat/{productId}")
	public String changeItemStatus(@PathVariable Long productId, @RequestHeader HttpHeaders requestHeader) {
		String accessToken = requestHeader.toSingleValueMap().get("authorization");
		int status = Integer.parseInt(requestHeader.toSingleValueMap().get("status"));
		mybagService.changeItemStatus(accessToken, productId, status);

		return "장바구니 상품 구매 상태가 변경됨";
	}

}
