package com.modimoa.backend.repository;

import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MybagRepository extends JpaRepository<Mybag, Long> {

	Optional<Mybag> findByUserAndProductId(User user, Long productId);

	void deleteByUserAndProductId(User user, Long productId);

	List<Mybag> findByUser(User user);

	void deleteByUser(User user);
}
