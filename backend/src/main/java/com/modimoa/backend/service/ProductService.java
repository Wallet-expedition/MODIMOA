package com.modimoa.backend.service;

import com.modimoa.backend.domain.Mart;
import com.modimoa.backend.domain.Product;
import com.modimoa.backend.errorhandling.CustomException;
import com.modimoa.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.modimoa.backend.errorhandling.ErrorCode.INVALID_QUERY_ERROR;
import static com.modimoa.backend.errorhandling.ErrorCode.OBJECT_NOTFOUND_ERROR;

@Service
public class ProductService {
//	@Autowired
//	ProductRepository productRepository;

	private final ProductRepository productRepository;

	public ProductService(ProductRepository productRepository){
		this.productRepository = productRepository;
	}
	
	// Dao를 통해 모든 물품을 가져와서 반환하는 page형 함수
	public Page<Product> getAllProducts(Pageable pageable) {
		return productRepository.findAll(pageable);
	}

	// 검색 쿼리 q에 따라 물품을 페이지네이션해서 반환하는 page형 함수
	public Page<Product> getFilteredProduct(String mart, String q, Pageable pageable) {

		if (mart.length() != 4) {
			throw new CustomException(INVALID_QUERY_ERROR);
		}
		if (!pageable.getSort().toString().equals("salePrice: ASC") && !pageable.getSort().toString().equals("productName: ASC")) {
			throw new CustomException(INVALID_QUERY_ERROR);
		}

		boolean[] martList = new boolean[4];
		Arrays.fill(martList, false);

		for (int i = 0; i < mart.length(); i++) {
			if (mart.charAt(i) == '1') martList[i] = true;
		}

		List<Product> cuList = new ArrayList<>();
		List<Product> sevenList = new ArrayList<>();
		List<Product> gsList = new ArrayList<>();
		List<Product> emartList = new ArrayList<>();

		if (martList[0]) cuList = productRepository.findByMartNameAndProductNameContaining(Mart.CU, q);
		if (martList[1]) sevenList = productRepository.findByMartNameAndProductNameContaining(Mart.SEVEN11, q);
		if (martList[2]) gsList = productRepository.findByMartNameAndProductNameContaining(Mart.GS25, q);
		if (martList[3]) emartList = productRepository.findByMartNameAndProductNameContaining(Mart.EMART24, q);

		List<Product> resultList = new ArrayList<>();
		resultList.addAll(cuList);
		resultList.addAll(sevenList);
		resultList.addAll(gsList);
		resultList.addAll(emartList);

		if (pageable.getSort().toString().equals("productName: ASC")) resultList.sort(new ProductNameComparator());
		else if (pageable.getSort().toString().equals("salePrice: ASC")) resultList.sort(new ProductPriceComparator());

		int start = (int) pageable.getOffset();
		int end = Math.min((start + pageable.getPageSize()), resultList.size());

		Page<Product> pageList = new PageImpl<>(resultList.subList(start, end), pageable, resultList.size());

		return pageList;
	}

	public Optional<Product> getProductById(Long id) {
		Optional<Product> product = productRepository.findById(id);
		product.orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));

		return product;
	}


	private static class ProductNameComparator implements Comparator<Product> {
		@Override
		public int compare(Product p1, Product p2) {
			return p1.getProductName().compareTo(p2.getProductName());
		}
	}

	private static class ProductPriceComparator implements Comparator<Product> {
		@Override
		public int compare(Product p1, Product p2) {
			if (p1.getSalePrice() < p2.getSalePrice()) return -1;
			else if (p1.getSalePrice() > p2.getSalePrice()) return 1;
			return 0;
		}
	}
}