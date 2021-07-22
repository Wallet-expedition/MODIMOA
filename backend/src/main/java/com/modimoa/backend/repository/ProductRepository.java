package com.modimoa.backend.repository;

import com.modimoa.backend.domain.Mart;
import com.modimoa.backend.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByMartNameAndProductNameContaining(Mart mart, String q, Pageable pageable);
}
