package com.modimoa.backend.service;

import com.modimoa.backend.domain.Mart;
import com.modimoa.backend.domain.Product;
import com.modimoa.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    // Dao를 통해 모든 물품을 가져와서 반환하는 list형 함수
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    // Dao를 통해 특정 id 물품을 가져와서 반환하는 Product형 함수
    public Product getProductByProductId(Long productId) {
        return productRepository
                .findById(productId)
                .orElse(new Product(Mart.CU, "newthing", 100));
    }
}
