package com.modimoa.backend.service;

import com.modimoa.backend.domain.Mart;
import com.modimoa.backend.domain.Product;
import com.modimoa.backend.domain.SaleCategory;
import com.modimoa.backend.errorhandling.CustomException;
import com.modimoa.backend.repository.ProductRepository;

import org.junit.*;

import org.mockito.Mockito;
import org.springframework.data.domain.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static junit.framework.TestCase.assertEquals;


public class ProductServiceTest {

    @Test
    public void getProductByIdTest존재_할때(){
        //setUp
        ProductRepository repo = Mockito.mock(ProductRepository.class);
        Mockito.when(repo.findById(11L))
                .thenReturn(Optional.of((new Product(11L, Mart.EMART24, "productName",4000, SaleCategory.OnePlusOne))));
        ProductService productService = new ProductService(repo);

        //when
        Optional<Product> actualProduct = productService.getProductById(11L);

        //then
        assertEquals(11L, actualProduct.get().getProductId());
    }

    @Test(expected = CustomException.class)
    public void getProductByIdTest존재_안할때(){
        //setUp
        ProductRepository repo = Mockito.mock(ProductRepository.class);
        Mockito.when(repo.findById(11L))
                .thenReturn(Optional.empty());
        ProductService productService = new ProductService(repo);

        //when
        Optional<Product> actualProduct = productService.getProductById(11L);

        //then
        assertEquals(11L, actualProduct.get().getProductId());
    }


    @Test
    public void getAllProductTest존재_할때(){
        //setUp
        ProductRepository repo = Mockito.mock(ProductRepository.class);
        Pageable pageable = PageRequest.of(0, 15, Sort.by("productName").ascending());
        List<Product> productList = new ArrayList<>();
        productList.add(new Product(11L, Mart.EMART24, "productName1", 4000, SaleCategory.OnePlusOne));
        productList.add(new Product(11L, Mart.CU, "productName2", 3000, SaleCategory.ThreePlusOne));
        Page<Product> productListPage = new PageImpl<Product>(productList);
        Mockito.when(repo.findAll(pageable))
                .thenReturn(productListPage);
        ProductService productService = new ProductService(repo);

        //when
        Page<Product> actualProduct = productService.getAllProducts(pageable);

        //then
        assertEquals(2, actualProduct.getTotalElements());
    }

}
