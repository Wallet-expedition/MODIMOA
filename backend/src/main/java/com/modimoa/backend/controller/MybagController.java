package com.modimoa.backend.controller;

import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.domain.Product;
import com.modimoa.backend.service.MybagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/mybag")
public class MybagController {

    @Autowired
    private MybagService mybagService = new MybagService();

    // 장바구니에서 모든 물건 조회하는 기능
    @GetMapping("")
    public String getAllMybagProducts(){
        Long userId = 4L;
        String result = "";
        int sumMoney = MybagService.sumMoney(userId);
        for(Mybag mb: mybagService.getAllMybagProducts()){
            result += mb + "</br>";
        }
        return result;
    }

    // 장바구니에 새 물건 추가하는 기능, 기존에 물건이 있으면 개수 증가
    @PostMapping("/{productId}")
    public String addMybagProductByProductId(Long productId, Long userId){

        //String userId = (String) session.getAttribute("user_id");
        long mybagId = mybagService.findByTwoId(productId, userId);
        int count = mybagService.countMybag(mybagId);

        if (count == 0) {
            mybagService.create(productId, userId);
        } else {
            mybagService.changeProductNum(mybagId, 1);
        }

        return "redirect:/api/mybag";
    }

    // 장바구니에서 물건 삭제하는 기능
    @DeleteMapping("/{productId}")
    public String removeMybagProductByProductId(Long productId, Long userId){
        long mybagId = mybagService.findByTwoId(productId, userId);
        MybagService.delete(mybagId);
        return "redirect:/api/mybag";
    }

    // 장바구니에서 구매 여부 변경하는 기능
    @PatchMapping("/{productId}")
    public String updateMybagProductByProductId(Long productId, Long userId, int status){
        long mybagId = mybagService.findByTwoId(productId, userId);
        MybagService.changePurchaseStatus(mybagId, status);
        return "redirect:/api/mybag";
    }
}
