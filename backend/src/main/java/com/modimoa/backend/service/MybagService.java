package com.modimoa.backend.service;


import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.domain.Product;
import com.modimoa.backend.domain.User;
import com.modimoa.backend.repository.MybagRepository;
import com.modimoa.backend.repository.ProductRepository;
import com.modimoa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class MybagService {

    @Autowired
    private MybagRepository mybagRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    // 모든 물품을 가져와서 반환
    public List<Mybag> findAll(String userId) {
        User user = userRepository.findByAccessToken(userId).orElseThrow(() -> new IllegalArgumentException("무슨일이야..?"));
        return mybagRepository.findByUser(user);
    }

    // 새 물품 추가
    public void plusItemOrCreateCount(String accessToken, Long productId) {
        User user = userRepository.findByAccessToken(accessToken).orElseThrow(IllegalArgumentException::new);
        Mybag mybag = mybagRepository.findByUserAndProductId(user, productId)
                .orElseGet(() -> mybagRepository
                        .save(new Mybag(user, productId, 0, 1)));
        mybag.updateCount(1);
    }

    // 물품 삭제
    public void deleteItem(String accessToken, Long productId) {
        User user = userRepository.findByAccessToken(accessToken).orElseThrow(IllegalArgumentException::new);
        mybagRepository.deleteByUserAndProductId(user, productId);
    }

    // 물품 개수 변경
    public void changeItemCount(String accessToken, Long productId, int count) {

        User user = userRepository.findByAccessToken(accessToken).orElseThrow(IllegalArgumentException::new);
        Mybag mybag = mybagRepository.findByUserAndProductId(user, productId).get();
        mybag.updateCount(count);
        if (mybag.getCount() == 0) mybagRepository.deleteByUserAndProductId(user, productId);
    }

    // 물품 상태 변경
    public void changeItemStatus(String accessToken, Long productId, int status) {
        User user = userRepository.findByAccessToken(accessToken).orElseThrow(IllegalArgumentException::new);
        Mybag mybag = mybagRepository.findByUserAndProductId(user, productId).get();
        mybag.updateStatus(status);
    }


    //앞으로 절약할 가격 계산
    public Map getPrice(String accessToken) {

        Map result = new HashMap<String, Integer>();

        User user = userRepository.findByAccessToken(accessToken).orElseThrow(() -> new IllegalArgumentException("무슨일이야..?"));

        int originalPriceBeforeBuy = 0;
        int salePriceBeforeBuy = 0;
        int originalPriceAfterBuy = 0;
        int salePriceAfterBuy = 0;

        for (Mybag mb : mybagRepository.findByUser(user)) {
            Product product = productRepository.findById(mb.getProductId()).orElseThrow(() -> new IllegalArgumentException("무슨일이야..?"));
            if (mb.getStatus() == 1) {
                originalPriceBeforeBuy += product.getOriginalPrice();
                salePriceBeforeBuy += product.getSalePrice();
            } else if (mb.getStatus() == 2) {
                originalPriceAfterBuy += product.getOriginalPrice();
                salePriceAfterBuy += product.getSalePrice();
            }
        }

        result.put("originalPriceBeforeBuy", originalPriceBeforeBuy);
        result.put("salePriceBeforeBuy", salePriceBeforeBuy);
        result.put("paidPriceBeforeBuy", originalPriceBeforeBuy - salePriceAfterBuy);

        result.put("originalPriceAfterBuy", originalPriceAfterBuy);
        result.put("salePriceAfterBuy", salePriceAfterBuy);
        result.put("paidPriceAfterBuy", originalPriceAfterBuy - salePriceAfterBuy);

        return result;
    }

}