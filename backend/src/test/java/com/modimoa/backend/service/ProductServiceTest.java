package com.modimoa.backend.service;

import com.modimoa.backend.domain.Product;
import com.modimoa.backend.repository.ProductRepository;

import org.junit.*;

import org.mockito.Mockito;

import java.util.Optional;

import static junit.framework.TestCase.assertEquals;


public class ProductServiceTest {

    @Test
    public void 조회(){
        //setUp
        ProductRepository repo = Mockito.mock(ProductRepository.class);
        Mockito.when(repo.findById(11L))
                .thenReturn(Optional.of((new Product(11L, "aa"))));

        ProductService productService = new ProductService(repo);
        //when
        Optional<Product> actualProduct = productService.getProductById(11L);

        //then
        assertEquals(11L, actualProduct.get().getProductId());
    }
}
