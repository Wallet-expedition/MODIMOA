package com.modimoa.backend.service;

import com.modimoa.backend.domain.Product;
import com.modimoa.backend.repository.MybagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MybagService {

    @Autowired
    MybagRepository mybagRepository;

    // Dao를 통해 모든 물품을 가져와서 반환하는 list형 함수
    public List<Product> getAllMybagProducts() {
        return mybagRepository.findAll();
    }
}
