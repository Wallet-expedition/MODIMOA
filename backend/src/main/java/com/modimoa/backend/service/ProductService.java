package com.modimoa.backend.service;

import com.modimoa.backend.domain.*;
import com.modimoa.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    // Dao를 통해 모든 물품을 가져와서 반환하는 page형 함수
    public Page<Product> getAllProducts(Pageable pageable){
        return productRepository.findAll(pageable);
    }

    // 검색 쿼리 q에 따라 물품을 페이지네이션해서 반환하는 page형 함수
    public Page<Product> getFilteredProduct(Mart mart, String q, Pageable pageable) {
        return productRepository
                .findByMartNameAndProductNameContaining(mart, q, pageable);
    }


}