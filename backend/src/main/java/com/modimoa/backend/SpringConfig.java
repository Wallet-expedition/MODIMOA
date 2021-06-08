package com.modimoa.backend;

import com.modimoa.backend.repo.JpaProductRepository;
import com.modimoa.backend.repo.MemoryProductRepository;
import com.modimoa.backend.repo.ProductRepository;
import com.modimoa.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;
import javax.swing.text.html.parser.Entity;

@Configuration
public class SpringConfig {

    private EntityManager em;

    @Autowired
    public SpringConfig(EntityManager em){
        this.em = em;
    }


    @Bean
    public ProductService productService(){
        return new ProductService(productRepository());
    }

    @Bean
    public ProductRepository productRepository(){
        //return new MemoryProductRepository();
        return new JpaProductRepository(em);
    }

}
