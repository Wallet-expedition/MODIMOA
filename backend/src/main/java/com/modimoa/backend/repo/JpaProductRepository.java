package com.modimoa.backend.repo;

import com.modimoa.backend.domain.Product;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaProductRepository implements ProductRepository{

    private final EntityManager em;

    public JpaProductRepository(EntityManager em){
        this.em = em;
    }

    @Override
    public Product save(Product product) {
        em.persist(product);
        return product;
    }

    @Override
    public Optional<Product> findById(Long pro_id) {
        Product product = em.find(Product.class, pro_id);
        return Optional.ofNullable(product);
    }

    //jpql 작성
    //data jpa?
    @Override
    public Optional<Product> findByName(String pro_name) {
        List<Product> result = em.createQuery("select m from Product m where m.pro_name = :pro_name", Product.class)
                .setParameter("pro_name", pro_name)
                .getResultList();
        return result.stream().findAny();
    }

    @Override
    public List<Product> findAll() {
        return em.createQuery("select m from Product m", Product.class)
                .getResultList();
    }
}
