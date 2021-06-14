package com.modimoa.backend.service;

import com.modimoa.backend.domain.Product;
import com.modimoa.backend.domain.User;
import com.modimoa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    // Dao를 통해 모든 물품을 가져와서 반환하는 list형 함수
    public List<User> getAllUsers(){
        return userRepository.findAll();
    };

    // Dao를 통해 특정 id 물품을 가져와서 반환하는 Product형 함수
    public User getUserByUserId(Long userId) {
        return userRepository
                .findById(userId)
                .orElse(new User("newperson@.com", "blah.com"));
    }

}
