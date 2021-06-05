package com.modimoa.backend.repo;

import com.modimoa.backend.domain.Product;

import java.util.List;
import java.util.Optional;

public interface ProductRepository {
    Product save(Product product);
    Optional<Product> findById(Long pro_id);
    Optional<Product> findByName(String pro_name);
    List<Product> findAll();
}
