package com.bnbair.bnbair.repository;

import com.bnbair.bnbair.domain.Property;
import com.bnbair.bnbair.domain.Review;
import com.bnbair.bnbair.domain.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReviewRepository extends CrudRepository<Review, Long> {
  List<Review> findAllByReviewer(User user);

  List<Review> findAllByProperty(Property property);

  @Query("select r from Review r where r.score BETWEEN ?1 and ?2")
  List<Review> findAllByScoreBetween(int start, int end);
}
