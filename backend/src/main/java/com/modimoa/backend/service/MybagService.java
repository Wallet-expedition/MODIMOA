package com.modimoa.backend.service;


import com.modimoa.backend.domain.Mybag;
import com.modimoa.backend.domain.MybagProduct;
import com.modimoa.backend.domain.Product;
import com.modimoa.backend.domain.User;
import com.modimoa.backend.errorhandling.CustomException;
import com.modimoa.backend.repository.MybagRepository;
import com.modimoa.backend.repository.ProductRepository;
import com.modimoa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static com.modimoa.backend.errorhandling.ErrorCode.OBJECT_NOTFOUND_ERROR;

@Service
@Transactional
public class MybagService {

	@Autowired
	private MybagRepository mybagRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductRepository productRepository;

	// 전체 물품 가져와서 반환
	public List<MybagProduct> findAll(String accessToken) {
		Optional<User> user = userRepository.findByAccessToken(accessToken);
		List<Mybag> mybagList = mybagRepository.findByUser(user.orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR)));
		List<MybagProduct> productList = new ArrayList<>();
		for (Mybag mybag : mybagList) {
			MybagProduct mybagProduct = MybagProduct.builder()
					.product(productRepository.findById(mybag.getProductId()))
					.id(mybag.getMybagId())
					.count(mybag.getCount())
					.status(mybag.getStatus()).build();
			productList.add(mybagProduct);
		}
		return productList;
	}

	// 새 물품 추가
	public String plusItemOrCreateCount(String accessToken, Long productId) {
		User user = userRepository.findByAccessToken(accessToken)
			.orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));

		Mybag mybag = mybagRepository.findByUserAndProductIdAndStatus(user, productId, 0)
				.orElseGet(() -> mybagRepository
						.save(new Mybag(user, productId, 0, 0)));

		mybag.updateCount(1);

		return user.getUserEmail();
	}

	// TODO: [front] mybag id로 물품 삭제
	public String deleteItem(String accessToken, Long mybagId) {
		User user = userRepository.findByAccessToken(accessToken)
			.orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
		mybagRepository.deleteByMybagId(mybagId);

		return user.getUserEmail();
	}

	// TODO: [front] mybag id로 물품 개수 변경
	public String changeItemCount(String accessToken, Long mybagId, int count) {
		User user = userRepository.findByAccessToken(accessToken)
			.orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
		Mybag mybag = mybagRepository.findByMybagId(mybagId)
			.orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));

		mybag.setCount(count);
		if (mybag.getCount() == 0) mybagRepository.deleteByMybagId(mybagId);

		return user.getUserEmail();
	}

	// TODO: [front] mybag id로 물품 상태 변경
	public String changeItemStatus(String accessToken, Long mybagId, int status) {
		User user = userRepository.findByAccessToken(accessToken)
			.orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
		Mybag mybag = mybagRepository.findByMybagId(mybagId)
			.orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
		mybag.updateStatus(status);

		return user.getUserEmail();
	}


	// 앞으로 절약할 가격 계산
	public Map<String, Integer> getPrice(String accessToken) {

		Map<String, Integer> result = new HashMap<>();

		Optional<User> user = userRepository.findByAccessToken(accessToken);
		user.orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));

		int originalPriceBeforeBuy = 0;
		int salePriceBeforeBuy = 0;
		int originalPriceAfterBuy = 0;
		int salePriceAfterBuy = 0;

		for (Mybag mb : mybagRepository.findByUser(user.get())) {
			Optional<Product> product = productRepository.findById(mb.getProductId());
			product.orElseThrow(() -> new CustomException(OBJECT_NOTFOUND_ERROR));
			if (mb.getStatus() == 0) {
				originalPriceBeforeBuy += product.get().getOriginalPrice() * mb.getCount();
				salePriceBeforeBuy += product.get().getSalePrice() * mb.getCount();
			} else if (mb.getStatus() == 1) {
				originalPriceAfterBuy += product.get().getOriginalPrice() * mb.getCount();
				salePriceAfterBuy += product.get().getSalePrice() * mb.getCount();
			}
		}

		result.put("originalPriceBeforeBuy", originalPriceBeforeBuy);
		result.put("salePriceBeforeBuy", salePriceBeforeBuy);
		result.put("savedPriceBeforeBuy", originalPriceBeforeBuy - salePriceAfterBuy);

		result.put("originalPriceAfterBuy", originalPriceAfterBuy);
		result.put("salePriceAfterBuy", salePriceAfterBuy);
		result.put("savedPriceAfterBuy", originalPriceAfterBuy - salePriceAfterBuy);

		return result;
	}

}