package com.modimoa.backend.service;


import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.dto.MybagProductResponseDto;
import com.modimoa.backend.domain.Product;
import com.modimoa.backend.domain.User;
import com.modimoa.backend.errorhandling.CustomException;
import com.modimoa.backend.repository.MybagRepository;
import com.modimoa.backend.repository.ProductRepository;
import com.modimoa.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static com.modimoa.backend.errorhandling.ErrorCode.OBJECT_NOTFOUND_ERROR;

@Service
@AllArgsConstructor
@Transactional
public class MybagService {

    private final MybagRepository mybagRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public List<MybagProductResponseDto> findAll(String accessToken) {
        User user = userRepository.findByAccessToken(accessToken).orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
        List<Mybag> mybagList = mybagRepository.findByUser(user);
        List<MybagProductResponseDto> productList = new ArrayList<>();
        for (Mybag mybag : mybagList) {
            MybagProductResponseDto mybagProduct = MybagProductResponseDto.builder()
                    .product(productRepository.findById(mybag.getProductId()))
                    .id(mybag.getMybagId())
                    .count(mybag.getCount())
                    .status(mybag.getStatus()).build();
            productList.add(mybagProduct);
        }
        return productList;
    }

    public String plusItemOrCreateCount(String accessToken, Long productId) {
        User user = userRepository.findByAccessToken(accessToken)
                .orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
        Mybag mybag = mybagRepository.findByUserAndProductIdAndStatus(user, productId, 0)
                .orElseGet(() -> mybagRepository
                        .save(new Mybag(user, productId, 0, 0)));
        mybag.updateCount(1);

        return user.getUserEmail();
    }

    public String deleteItem(String accessToken, Long mybagId) {
        User user = userRepository.findByAccessToken(accessToken)
                .orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
        mybagRepository.deleteByMybagId(mybagId);

        return user.getUserEmail();
    }

    public String changeItemCount(String accessToken, Long mybagId, int count) {
        User user = userRepository.findByAccessToken(accessToken)
                .orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
        Mybag mybag = mybagRepository.findByMybagId(mybagId)
                .orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
        mybag.setCount(count);
        if (mybag.getCount() == 0) mybagRepository.deleteByMybagId(mybagId);

        return user.getUserEmail();
    }

    public String changeItemStatus(String accessToken, Long mybagId, int status) {
        User user = userRepository.findByAccessToken(accessToken)
                .orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
        Mybag mybag = mybagRepository.findByMybagId(mybagId)
                .orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
        mybag.updateStatus(status);

        return user.getUserEmail();
    }

    public Map<String, Integer> getPrice(String accessToken) {
        Map<String, Integer> result = new HashMap<>();
        Optional<User> user = userRepository.findByAccessToken(accessToken);
        user.orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
        int originalPriceBeforeBuy = 0;
        int salePriceBeforeBuy = 0;
        int originalPriceAfterBuy = 0;
        int salePriceAfterBuy = 0;
        for (Mybag mb : mybagRepository.findByUser(user.get())) {
            Optional<Product> product = productRepository.findById(mb.getProductId());
            product.orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
            if (mb.getStatus() == 0) {
                originalPriceBeforeBuy += product.get().getOriginalPrice() * mb.getCount();
                salePriceBeforeBuy += product.get().getSalePrice() * mb.getCount();
            } else if (mb.getStatus() == 1) {
                originalPriceAfterBuy += product.get().getOriginalPrice() * mb.getCount();
                salePriceAfterBuy += product.get().getSalePrice() * mb.getCount();
            }
        }
        result.put("originalPriceBeforeBuy", originalPriceBeforeBuy);
        result.put("salePriceBeforeBuy", salePriceBeforeBuy);
        result.put("savedPriceBeforeBuy", originalPriceBeforeBuy - salePriceAfterBuy);
        result.put("originalPriceAfterBuy", originalPriceAfterBuy);
        result.put("salePriceAfterBuy", salePriceAfterBuy);
        result.put("savedPriceAfterBuy", originalPriceAfterBuy - salePriceAfterBuy);

        return result;
    }
}