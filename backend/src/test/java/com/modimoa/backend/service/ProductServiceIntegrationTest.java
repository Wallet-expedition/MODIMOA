package com.modimoa.backend.service;

import com.modimoa.backend.domain.Product;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;


@SpringBootTest
@Transactional //테스트가 끝나면 롤백해준다
class ProductServiceIntegrationTest {

    @Autowired ProductService productService;
    @Autowired ProductRepository productRepository;

    //우리가 생성하는게 아니라 스프링 컨테이너한테 요청
    @Test
    @Commit
    void 상품추가(){
        Product product = new Product();
        product.setMart_id((long)6);
        product.setPro_name("spring");
        product.setPro_image("pro_image");
        product.setPro_OP((long)100);
        product.setPro_SP((long)100);
        product.setPro_SC("몰라..");

        Long saveId = productService.add(product);

        Product findProduct = productService.findOne(saveId).get();
        Assertions.assertThat(product.getPro_name()).isEqualTo(findProduct.getPro_name());
    }
}