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
import java.util.Optional;

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
    public List<Mybag> findAll(String accessToken) {
        Optional<User> user = Optional.of(userRepository.findByAccessToken(accessToken)).get();
        if(!user.isPresent()){
            // 403 유저 없음!
        }
        return mybagRepository.findByUser(user.get());
    }

    // 새 물품 추가
    public void plusItemOrCreateCount(String accessToken, Long productId) {
        Optional <User> user = Optional.of(userRepository.findByAccessToken(accessToken).get());
        if(!user.isPresent()){
            //403
        }
        Mybag mybag = mybagRepository.findByUserAndProductId(user.get(), productId)
                .orElseGet(() -> mybagRepository
                        .save(new Mybag(user.get(), productId, 0, 1)));
        mybag.updateCount(1);
    }

    // 물품 삭제
    public void deleteItem(String accessToken, Long productId) {
        Optional <User> user = Optional.of(userRepository.findByAccessToken(accessToken).get());
        if(!user.isPresent()){
            //403
        }
        mybagRepository.deleteByUserAndProductId(user.get(), productId);
    }

    // 물품 개수 변경
    public void changeItemCount(String accessToken, Long productId, int count) {

        Optional <User> user = Optional.of(userRepository.findByAccessToken(accessToken).get());
        if(!user.isPresent()){
            //403
        }
        Mybag mybag = mybagRepository.findByUserAndProductId(user.get(), productId).get();
        mybag.updateCount(count);
        if (mybag.getCount() == 0) mybagRepository.deleteByUserAndProductId(user.get(), productId);
    }

    // 물품 상태 변경
    public void changeItemStatus(String accessToken, Long productId, int status) {
        Optional <User> user = Optional.of(userRepository.findByAccessToken(accessToken).get());
        if(!user.isPresent()){
            //403
        }
        Mybag mybag = mybagRepository.findByUserAndProductId(user.get(), productId).get();
        mybag.updateStatus(status);
    }


    //앞으로 절약할 가격 계산
    public Map getPrice(String accessToken) {

        Map result = new HashMap<String, Integer>();

        Optional<User> user = Optional.of(userRepository.findByAccessToken(accessToken)).get();
        if(!user.isPresent()){
            //403 사람없음 에러
        }

        int originalPriceBeforeBuy = 0;
        int salePriceBeforeBuy = 0;
        int originalPriceAfterBuy = 0;
        int salePriceAfterBuy = 0;

        for (Mybag mb : mybagRepository.findByUser(user.get())) {
            Product product = productRepository.findById(mb.getProductId()).get();
            if (mb.getStatus() == 1) {
                originalPriceBeforeBuy += product.getOriginalPrice()*mb.getCount();
                salePriceBeforeBuy += product.getSalePrice()*mb.getCount();
            } else if (mb.getStatus() == 2) {
                originalPriceAfterBuy += product.getOriginalPrice()*mb.getCount();
                salePriceAfterBuy += product.getSalePrice()*mb.getCount();
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