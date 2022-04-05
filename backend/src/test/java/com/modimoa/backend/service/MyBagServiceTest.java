package com.modimoa.backend.service;

import com.modimoa.backend.domain.*;
import com.modimoa.backend.errorhandling.CustomException;
import com.modimoa.backend.repository.MybagRepository;
import com.modimoa.backend.repository.ProductRepository;
import com.modimoa.backend.repository.UserRepository;
import org.apache.ibatis.jdbc.Null;
import org.junit.Test;
import org.mockito.Mockito;

import java.util.*;

import static junit.framework.TestCase.assertEquals;

public class MyBagServiceTest {

    @Test
    public void findAllTest정상(){
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail","userImage","oauthToken","accessToken");

        List<Mybag> mybagList = new ArrayList<>();
        mybagList.add(new Mybag(user,3L, 11, 0));
        mybagList.add(new Mybag(user,4L, 8, 1));

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(java.util.Optional.of(user));
        Mockito.when(mybagRepository.findByUser(user))
                .thenReturn(mybagList);
        MybagService mybagService = new MybagService(mybagRepository,userRepository,productRepository);

        //when
        List<MybagProduct> actualMybag = mybagService.findAll("accessToken");

        //then
        assertEquals(2,actualMybag.size());
    }

    @Test(expected = CustomException.class)
    public void findAllTest_User_존재안할때(){
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail","userImage","oauthToken","accessToken");

        List<Mybag> mybagList = new ArrayList<>();
        mybagList.add(new Mybag(user,3L, 11, 0));
        mybagList.add(new Mybag(user,4L, 8, 1));

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(Optional.empty());
        Mockito.when(mybagRepository.findByUser(user))
                .thenReturn(mybagList);
        MybagService mybagService = new MybagService(mybagRepository,userRepository,productRepository);

        //when
        List<MybagProduct> actualMybag = mybagService.findAll("accessToken");

        //then
        assertEquals(2,actualMybag.size());
    }

    @Test
    public void plusItemOrCreateCountTest정상(){
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail","userImage","oauthToken","accessToken");

        Mybag mybag = new Mybag(user, 11L, 9, 0);

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(java.util.Optional.of(user));
        Mockito.when(mybagRepository.findByUserAndProductIdAndStatus(user,11L,0))
                .thenReturn(Optional.of(mybag));
        MybagService mybagService = new MybagService(mybagRepository,userRepository,productRepository);

        //when
        String actualMybag = mybagService.plusItemOrCreateCount("accessToken",11L);

        //then
        assertEquals("userEmail",actualMybag);
    }

    @Test(expected = CustomException.class)
    public void plusItemOrCreateCountTest_user_존재_안할때(){
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail","userImage","oauthToken","accessToken");
        Mybag mybag = new Mybag(user, 11L, 9, 0);

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(Optional.empty());
        Mockito.when(mybagRepository.findByUserAndProductIdAndStatus(user,11L,0))
                .thenReturn(Optional.of(mybag));
        MybagService mybagService = new MybagService(mybagRepository,userRepository,productRepository);

        //when
        String actualMybag = mybagService.plusItemOrCreateCount("accessToken",11L);

        //then
        assertEquals("userEmail",actualMybag);
    }


    @Test
    public void deleteItemTest_정상(){
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail","userImage","oauthToken","accessToken");

        Mybag mybag = new Mybag(user, 11L, 9, 0);

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(java.util.Optional.of(user));
        Mockito.when(mybagRepository.deleteByMybagId("accessToken",0L))
                .thenReturn(Optional.empty());
        MybagService mybagService = new MybagService(mybagRepository,userRepository,productRepository);

        //when
        String actualMybag = mybagService.deleteItem("accessToken",0L);

        //then
        assertEquals("userEmail",actualMybag);
    }

    @Test(expected = CustomException.class)
    public void deleteItemTest_User_없을때(){
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail","userImage","oauthToken","accessToken");
        Mybag mybag = new Mybag(user, 11L, 9, 0);

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(Optional.empty());
        Mockito.when(mybagRepository.deleteByMybagId("accessToken",0L))
                .thenReturn(Optional.of(mybag));
        MybagService mybagService = new MybagService(mybagRepository,userRepository,productRepository);

        //when
        String actualMybag = mybagService.deleteItem("accessToken",0L);

        //then
        assertEquals("userEmail",actualMybag);
    }


    @Test
    public void changeItemCountTest_정상(){
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail","userImage","oauthToken","accessToken");

        Mybag mybag = new Mybag(user, 11L, 9, 0);

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(java.util.Optional.of(user));
        Mockito.when(mybagRepository.findByMybagId(0L))
                .thenReturn(Optional.of(mybag));
        MybagService mybagService = new MybagService(mybagRepository,userRepository,productRepository);

        //when
        String actualMybag = mybagService.changeItemCount("accessToken",0L,5);

        //then
        assertEquals("userEmail",actualMybag);
    }

    @Test(expected = CustomException.class)
    public void changeItemCountTest_User_없을때(){
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail","userImage","oauthToken","accessToken");
        Mybag mybag = new Mybag(user, 11L, 9, 0);

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(Optional.empty());
        Mockito.when(mybagRepository.findByMybagId(0L))
                .thenReturn(Optional.of(mybag));
        MybagService mybagService = new MybagService(mybagRepository,userRepository,productRepository);

        //when
        String actualMybag = mybagService.changeItemCount("accessToken",0L,5);

        //then
        assertEquals("userEmail",actualMybag);
    }

    @Test(expected = CustomException.class)
    public void changeItemCountTest_mybag이_없을때(){
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail","userImage","oauthToken","accessToken");
        Mybag mybag = new Mybag(user, 11L, 9, 0);

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(Optional.of(user));
        Mockito.when(mybagRepository.findByMybagId(0L))
                .thenReturn(Optional.empty());
        MybagService mybagService = new MybagService(mybagRepository,userRepository,productRepository);

        //when
        String actualMybag = mybagService.changeItemCount("accessToken",0L,5);

        //then
        assertEquals("userEmail",actualMybag);
    }

    @Test
    public void changeItemStatusTest_정상(){
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail","userImage","oauthToken","accessToken");

        Mybag mybag = new Mybag(user, 11L, 9, 0);

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(java.util.Optional.of(user));
        Mockito.when(mybagRepository.findByMybagId(0L))
                .thenReturn(Optional.of(mybag));
        MybagService mybagService = new MybagService(mybagRepository,userRepository,productRepository);

        //when
        String actualMybag = mybagService.changeItemStatus("accessToken",0L,1);

        //then
        assertEquals("userEmail",actualMybag);
    }

    @Test(expected = CustomException.class)
    public void changeItemStatusTest_User_없을때(){
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail","userImage","oauthToken","accessToken");
        Mybag mybag = new Mybag(user, 11L, 9, 0);

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(Optional.empty());
        Mockito.when(mybagRepository.findByMybagId(0L))
                .thenReturn(Optional.of(mybag));
        MybagService mybagService = new MybagService(mybagRepository,userRepository,productRepository);

        //when
        String actualMybag = mybagService.changeItemStatus("accessToken",0L,1);

        //then
        assertEquals("userEmail",actualMybag);
    }

    @Test(expected = CustomException.class)
    public void changeItemStatusTest_mybag이_없을때(){
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail","userImage","oauthToken","accessToken");
        Mybag mybag = new Mybag(user, 11L, 9, 0);

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(Optional.of(user));
        Mockito.when(mybagRepository.findByMybagId(0L))
                .thenReturn(Optional.empty());
        MybagService mybagService = new MybagService(mybagRepository,userRepository,productRepository);

        //when
        String actualMybag = mybagService.changeItemStatus("accessToken",0L,1);

        //then
        assertEquals("userEmail",actualMybag);
    }


    @Test
    public void getPrice_정상(){
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail","userImage","oauthToken","accessToken");
        Product product = new Product(11L,Mart.EMART24,"testtest",3000,SaleCategory.OnePlusOne,3000);
        Mybag mybag = new Mybag(user, 11L, 1, 0);

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(java.util.Optional.of(user));
        Mockito.when(mybagRepository.findByUser(user))
                .thenReturn(Collections.singletonList(mybag));
        Mockito.when(productRepository.findById(11L))
                .thenReturn(Optional.of(product));

        MybagService mybagService = new MybagService(mybagRepository,userRepository,productRepository);

        //when
        Map<String, Integer> actualMybag = mybagService.getPrice("accessToken");

        //then
        Integer price = 3000;
        assertEquals(price,actualMybag.get("salePriceBeforeBuy"));
    }

    @Test(expected = CustomException.class)
    public void getPrice_User_없을때(){
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail","userImage","oauthToken","accessToken");
        Product product = new Product(11L,Mart.EMART24,"testtest",3000,SaleCategory.OnePlusOne,3000);
        Mybag mybag = new Mybag(user, 11L, 1, 0);

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(Optional.empty());
        Mockito.when(mybagRepository.findByUser(user))
                .thenReturn(Collections.singletonList(mybag));
        Mockito.when(productRepository.findById(11L))
                .thenReturn(Optional.of(product));

        MybagService mybagService = new MybagService(mybagRepository,userRepository,productRepository);

        //when
        Map<String, Integer> actualMybag = mybagService.getPrice("accessToken");

        //then
        Integer price = 3000;
        assertEquals(price,actualMybag.get("salePriceBeforeBuy"));
    }

    @Test(expected = CustomException.class)
    public void getPrice_mybag이_없을때() {
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail", "userImage", "oauthToken", "accessToken");
        Product product = new Product(11L, Mart.EMART24, "testtest", 3000, SaleCategory.OnePlusOne, 3000);
        Mybag mybag = new Mybag(user, 11L, 1, 0);

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(java.util.Optional.of(user));
        Mockito.when(mybagRepository.findByUser(user))
                .thenReturn(null);
        Mockito.when(productRepository.findById(11L))
                .thenReturn(Optional.of(product));

        MybagService mybagService = new MybagService(mybagRepository, userRepository, productRepository);

        //when
        Map<String, Integer> actualMybag = mybagService.getPrice("accessToken");

        //then
        Integer price = 3000;
        assertEquals(price, actualMybag.get("salePriceBeforeBuy"));

    }

    @Test(expected = CustomException.class)
    public void getPrice_product가_없을때() {
        //setUp
        MybagRepository mybagRepository = Mockito.mock(MybagRepository.class);
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        ProductRepository productRepository = Mockito.mock(ProductRepository.class);

        User user = new User("userEmail", "userImage", "oauthToken", "accessToken");
        Product product = new Product(11L, Mart.EMART24, "testtest", 3000, SaleCategory.OnePlusOne, 3000);
        Mybag mybag = new Mybag(user, 11L, 1, 0);

        Mockito.when(userRepository.findByAccessToken("accessToken"))
                .thenReturn(java.util.Optional.of(user));
        Mockito.when(mybagRepository.findByUser(user))
                .thenReturn(Collections.singletonList(mybag));
        Mockito.when(productRepository.findById(11L))
                .thenReturn(Optional.empty());

        MybagService mybagService = new MybagService(mybagRepository, userRepository, productRepository);

        //when
        Map<String, Integer> actualMybag = mybagService.getPrice("accessToken");

        //then
        Integer price = 3000;
        assertEquals(price, actualMybag.get("salePriceBeforeBuy"));

    }
}
