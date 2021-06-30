package com.modimoa.backend.service;


import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.domain.User;
import com.modimoa.backend.repository.MybagRepository;
import com.modimoa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.IllegalFormatCodePointException;
import java.util.List;

@Service
@Transactional
public class MybagService {

    @Autowired
    private MybagRepository mybagRepository;

    @Autowired
    private UserRepository userRepository;

    // 모든 물품을 가져와서 반환
    public List<Mybag> findAll(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("무슨일이야..?"));
        return mybagRepository.findByUser(user);

    }

    public void plusOrCreateCount(Long userId, Long productId) {
        User user = userRepository.findById(userId).orElseThrow(IllegalArgumentException::new);
        Mybag mybag = mybagRepository.findByUserAndProductId(user, productId)
                .orElseGet(()->mybagRepository
                        .save(new Mybag(user, productId,1, 0, 1)));
        mybag.updateCount(1);
    }


/*
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

    //앞으로 절약할 가격 계산
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

    //이미 절약한 가격 계산
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
 */
}
