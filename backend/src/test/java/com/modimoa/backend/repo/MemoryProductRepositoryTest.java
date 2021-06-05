package com.modimoa.backend.repo;

import com.modimoa.backend.domain.Product;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

public class MemoryProductRepositoryTest {

    MemoryProductRepository repository = new MemoryProductRepository();

    @AfterEach
    public void afterEach(){
        repository.clearStore();
    }

    @Test
    public void save(){
        Product product = new Product();
        product.setPro_name("청양핫바");

        repository.save(product);

        Product result = repository.findById(product.getPro_id()).get();
        assertThat(product).isEqualTo(result);
    }

    @Test
    public void findByName(){
        Product product1 = new Product();
        product1.setPro_name("spring1");
        repository.save(product1);

        Product product2 = new Product();
        product2.setPro_name("spring2");
        repository.save(product2);

        Product result = repository.findByName("spring1").get();

        assertThat(result).isEqualTo(product1);
    }

    @Test
    public void findAll(){
        Product product1 = new Product();
        product1.setPro_name("spring1");
        repository.save(product1);

        Product product2 = new Product();
        product2.setPro_name("spring2");
        repository.save(product2);

        List<Product> result = repository.findAll();

        assertThat(result.size()).isEqualTo(2);
    }
}
