package com.modimoa.backend.repo;

import com.modimoa.backend.domain.Product;

import java.util.*;

public class MemoryProductRepository implements ProductRepository{

    private static Map<Long, Product> store = new HashMap<>();
    private static Long sequence = 0L;

    @Override
    public Product save(Product product) {
        product.setPro_id(++sequence);
        store.put(product.getPro_id(), product);
        return product;
    }

    @Override
    public Optional<Product> findById(Long pro_id) {
        return Optional.ofNullable(store.get(pro_id));
    }

    @Override
    public Optional<Product> findByName(String pro_name) {
        return store.values().stream()
                .filter(product -> product.getPro_name().equals(pro_name))
                .findAny();
    }

    @Override
    public List<Product> findAll() {
        return new ArrayList<>(store.values());
    }

    public void clearStore(){
        store.clear();
    }
}
