package com.modimoa.backend.repo;

import com.modimoa.backend.model.newProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface newProductRepository extends JpaRepository<newProduct, Long> {
}
