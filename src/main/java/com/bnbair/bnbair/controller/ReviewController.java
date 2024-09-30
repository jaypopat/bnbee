package com.bnbair.bnbair.controller;

import com.bnbair.bnbair.domain.Review;
import com.bnbair.bnbair.domain.ReviewDto;
import com.bnbair.bnbair.exception.ReviewNotFoundException;
import com.bnbair.bnbair.exception.UserNotFoundException;
import com.bnbair.bnbair.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/reviews")
public class ReviewController {
  private final ReviewService reviewService;

  public ReviewController(ReviewService reviewService) {
    this.reviewService = reviewService;
  }

  @GetMapping
  public ResponseEntity<List<Review>> getReviews() {
    List<Review> reviews = reviewService.getAllReviews();
    return ResponseEntity.ok(reviews);
  }

  // TODO
  @GetMapping("/users/{id}")
  public ResponseEntity<List<Review>> getReviewByUser(@PathVariable Long id) {
    List<Review> reviews;
    try {
      reviews = reviewService.getReviewsByReviewerId(id);
    } catch (UserNotFoundException e) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(reviews);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
    try {
      Review review = reviewService.getReviewById(id);
      return ResponseEntity.ok(review);
    } catch (ReviewNotFoundException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  public ResponseEntity<Review> createReview(@RequestBody ReviewDto reviewDto) {
    Review review = reviewService.createReview(reviewDto);
    // Return bad request if review was already created
    if (review == null) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(reviewService.createReview(reviewDto));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody ReviewDto reviewDto) {
    try {
      Review updatedReview = reviewService.updateReview(id, reviewDto);
      return ResponseEntity.ok(updatedReview);
    } catch (ReviewNotFoundException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Review> deleteReview(@PathVariable Long id) {
    reviewService.deleteReview(id);
    return ResponseEntity.noContent().build();
  }
}
