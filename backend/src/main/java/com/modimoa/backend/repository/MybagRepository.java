package com.modimoa.backend.repository;

import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MybagRepository extends JpaRepository<Mybag, Long> {

    long findByTwoId(Long productId, Long userId);
    void save(Optional<Mybag> mybag);
    void delete(Optional<Mybag> mybag);
}
