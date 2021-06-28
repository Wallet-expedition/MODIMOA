package com.modimoa.backend.service;

import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.domain.Product;
import com.modimoa.backend.repository.MybagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MybagService {

    @Autowired
    static
    MybagRepository mybagRepository;

    // 장바구니 물품 생성
    public void create(Long productId, Long userId) {
        Mybag mybag = new Mybag(userId, productId, 1);
        mybagRepository.save(mybag);
    }

    // pid와 uid로 mid 찾아서 반환
    public long findByTwoId(Long productId, Long userId) {
        return mybagRepository.findByTwoId(productId, userId);
    }

    // 장바구니 물품 수량 변경
    public void changeProductNum(long mybagId, int i) {
        Optional<Mybag> mybag = mybagRepository.findById(mybagId);
        //엔티티 수량 변경하기
        mybagRepository.save(mybag);
    }

    // 장바구니 물품 삭제
    public static void delete(long mybagId) {
        Optional<Mybag> mybag = mybagRepository.findById(mybagId);
        mybagRepository.delete(mybag);
    }

    // 장바구니 물품 구매 상태 변경
    public static void changePurchaseStatus(long mybagId, int i) {
        Optional<Mybag> mybag = mybagRepository.findById(mybagId);
        //엔티티 구매 상태 변경하기
        mybagRepository.save(mybag);
    }

    public static int sumMoney(Long userId) {
        return 0;
    }

    // Dao를 통해 모든 물품을 가져와서 반환하는 list형 함수
    public List<Mybag> getAllMybagProducts() {
        return mybagRepository.findAll();
    }

    public int countMybag(long mybagId) {
        Optional<Mybag> mybag = mybagRepository.findById(mybagId);
        if(mybag!=null){
            return 0;//mybag.count;
        }else return 0;
    }
}
