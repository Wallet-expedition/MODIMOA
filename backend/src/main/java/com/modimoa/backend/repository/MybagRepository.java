package com.modimoa.backend.repository;

import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MybagRepository extends JpaRepository<Mybag, Long> {
}
