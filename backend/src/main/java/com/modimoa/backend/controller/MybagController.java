package com.modimoa.backend.controller;

import com.modimoa.backend.domain.Product;
import com.modimoa.backend.service.MybagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mybag")
public class MybagController {

    @Autowired
    private MybagService mybagService = new MybagService();

    // 장바구니에서 모든 물건 조회하는 기능
    @GetMapping("")
    public String getAllMybagProducts(){

        String result = "";

        for(Product pr: mybagService.getAllMybagProducts()){
            result += pr + "</br>";
        }
        return result;
    }

    // 장바구니에 새 물건 추가하는 기능
    @PostMapping("/{productId}")
    public String addMybagProductByProductId(Long productId){
        // 기능 작성
        return null;
    }

    // 장바구니에서 물건 삭제하는 기능
    @DeleteMapping("/{productId}")
    public String removeMybagProductByProductId(Long productId){
        // 기능 작성
        return null;
    }

    // 장바구니에서 구매 여부 변경하는 기능
    @PatchMapping("/{productId}")
    public String updateMybagProductByProductId(Long productId){
        // 기능 작성
        return null;
    }
}
