package com.modimoa.backend.service;

import com.modimoa.backend.controller.MybagController;
import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.domain.Product;
import com.modimoa.backend.dto.MybagSaveReqDto;
import com.modimoa.backend.repository.MybagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MybagService {

    @Autowired
    static
    MybagRepository mybagRepository;


    // 장바구니 물품 생성
    public void save(Long userId, Long productId) {
        //Dto 사용해서 저장하도록 리팩토링
        Mybag mybag = new Mybag(userId, productId, 1, 1);
        mybagRepository.save(mybag);
    }

    // 장바구니 물품 수량 변경
    public void updateCount(long mybagId, int i) {
        Mybag mybag = mybagRepository.findById(mybagId)
                .orElseThrow(() -> new IllegalArgumentException("수량을 변경할 물품이 없습니다."));
        //엔티티 수량 i만큼 변경하기
        mybag.updateCount(i);
        mybagRepository.save(mybag);
    }

    // 장바구니 물품 삭제
    public static void delete(long mybagId) {
        Mybag mybag = mybagRepository.findById(mybagId)
                .orElseThrow(() -> new IllegalArgumentException("장바구니에서 삭제할 물품이 없습니다."));
        mybagRepository.delete(mybag);
    }

    // 장바구니 물품 구매 상태 변경
    public static void updateStatus(long mybagId, int i) {
        Mybag mybag = mybagRepository.findById(mybagId)
                .orElseThrow(() -> new IllegalArgumentException("구매상태를 변경할 물품이 없습니다."));
        mybag.updateStatus(i);
        mybagRepository.save(mybag);
    }

    //앞으로 절약할 가격 계산 메소드
    public static int expectedPrice(Long userId) {
        int expectedPrice = 0;
        for(Mybag mb: mybagRepository.findAll()){
            //money로 바꿔야함
            if(mb.getStatus()==1){
                expectedPrice += mb.getCount();
            }
        }
        return expectedPrice;
    }

    //이미 절약한 가격 계산 메소드
    public static int savedPrice(Long userId) {
        int savedPrice = 0;
        for(Mybag mb: mybagRepository.findAll()){
            //money로 바꿔야함
            if(mb.getStatus()==2){
                savedPrice += mb.getCount();
            }
        }
        return savedPrice;
    }

    // 모든 물품을 가져와서 반환하는 메소드
    public List<Mybag> findAll() {
        return mybagRepository.findAll();
    }

    // 장바구니에 담긴 특정 물품의 개수를 반환하는 메소드
    public int findCount(long mybagId) {
        Mybag mybag = mybagRepository.findById(mybagId)
                .orElseThrow(() -> new IllegalArgumentException("해당 id를 가진 물품이 없습니다."));
        return mybag.getCount();
    }

    // pid와 uid로 mid 찾아서 반환
    public long findItemId(Long productId, Long userId) {
        // 두 테이블 조인하는 방법 찾기
        // 없으면 0 반환하는 예외처리
        Mybag mybag = mybagRepository.findById(userId).orElseThrow(()
                -> new IllegalArgumentException("문제가 있습니다."));
        return mybag.getMybagId();
    }
}
