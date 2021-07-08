package com.modimoa.backend.controller;

import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.service.MybagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping(value="/api/mybag", method={RequestMethod.GET, RequestMethod.POST})
public class MybagController {

    @Autowired
    private MybagService mybagService = new MybagService();

    // 장바구니에서 user의 물건 조회하는 기능
    @GetMapping("")
    public String findAll(){
        Long userId = 4L;
        String result = "";
        for(Mybag mb: mybagService.findAll(userId)){
            result += mb + "</br>";
        }
        return result;
    }

    // 장바구니에서 user의 물건 가격 알려주는 기능
    @GetMapping("")
    public Map getPrice(){
        Long userId = 2L;
        Map result = mybagService.getPrice(userId);

        return result;
    }

    // 장바구니에 새 물건 추가하는 기능, 기존에 물건이 있으면 개수 증가
    @PostMapping("/{productId}")
    public String addItem(@PathVariable Long productId){
        Long userId = 2L;
        mybagService.plusItemOrCreateCount(userId, productId);

        return "장바구니에 상품 추가됨";
    }

    // 장바구니에서 물건 삭제하는 기능
    @DeleteMapping("/delete/{productId}")
    public String deleteItem(@PathVariable Long productId){
        Long userId = 2L;
        mybagService.deleteItem(userId, productId);
        return "장바구니에서 상품 삭제됨";
    }

    // 장바구니 물건 수량 변경하는 기능, 단 0이면 삭제
    @PostMapping("/changecnt/{productId}")
    public String changeItemCount(@PathVariable Long productId){
        Long userId = 4L;
        int count = 1;
        mybagService.changeItemCount(userId, productId, count);

        return "장바구니 상품 개수가 변경됨";
    }

    // 장바구니에서 구매 여부 변경하는 기능
    @PatchMapping("/changestat/{productId}")
    public String changeItemStatus(@PathVariable Long productId){
        Long userId = 4L;
        int status = 1;
        mybagService.changeItemStatus(userId, productId, status);

        return "장바구니 상품 구매 상태가 변경됨";
    }

}
