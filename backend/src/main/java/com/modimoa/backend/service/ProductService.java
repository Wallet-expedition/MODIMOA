package com.modimoa.backend.service;

import com.modimoa.backend.domain.Product;
import com.modimoa.backend.repo.ProductRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    // product 추가
    public Long add(Product product){

        productRepository.save(product);
        return product.getPro_id();
    }

    // id로 한 product 조회
    public Optional<Product> findOne(Long pro_id){
        return productRepository.findById(pro_id);
    }

}
