package com.modimoa.backend.repo;

import com.modimoa.backend.model.Mart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MartRepository extends JpaRepository<Mart, Long> {
}
