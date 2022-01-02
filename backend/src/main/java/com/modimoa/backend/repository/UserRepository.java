package com.modimoa.backend.repository;

import com.modimoa.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


	Optional<User> findByUserEmail(String userEmail);

	Optional<User> findByOauthToken(String token);

	void deleteByAccessToken(String token);

	Optional<User> findByAccessToken(String token);

}
