package com.bnbair.bnbair.repository;

import com.bnbair.bnbair.domain.Review;
import com.bnbair.bnbair.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReviewRepository extends CrudRepository<Review, Long> {
  List<Review> findAllByReviewer(User user);
}
