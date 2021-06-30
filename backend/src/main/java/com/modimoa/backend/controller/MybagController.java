package com.modimoa.backend.controller;

import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.service.MybagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


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

    // 장바구니에 새 물건 추가하는 기능, 기존에 물건이 있으면 개수 증가
    @PostMapping("/{productId}")
    public String addItem(@PathVariable Long productId){
        Long userId = 2L;
        mybagService.plusOrCreateCount(userId, productId);

        return "redirect:/api/mybag";
    }


/*
    // 장바구니에서 물건 삭제하는 기능
    @DeleteMapping("/{productId}")
    public String delete(@PathVariable Long productId, Long userId){
        long mybagId = mybagService.findItemId(productId, userId);
        MybagService.delete(mybagId);
        return "redirect:/api/mybag";
    }

    // 장바구니에서 구매 여부 변경하는 기능
    @PatchMapping("/{productId}")
    public String updateStatus(@PathVariable Long productId, Long userId, int status){
        long mybagId = mybagService.findItemId(productId, userId);
        MybagService.updateStatus(mybagId, status);
        return "redirect:/api/mybag";
    }
 */
}
