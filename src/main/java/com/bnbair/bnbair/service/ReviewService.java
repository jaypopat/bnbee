package com.bnbair.bnbair.service;

import com.bnbair.bnbair.AirbnbApplication;
import com.bnbair.bnbair.domain.Booking;
import com.bnbair.bnbair.domain.Review;
import com.bnbair.bnbair.domain.ReviewDto;
import com.bnbair.bnbair.domain.User;
import com.bnbair.bnbair.exception.BookingNotFoundException;
import com.bnbair.bnbair.exception.ReviewNotFoundException;
import com.bnbair.bnbair.exception.UserNotFoundException;
import com.bnbair.bnbair.repository.ReviewRepository;
import com.bnbair.bnbair.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
  private final ReviewRepository reviewRepository;
  private final BookingService bookingService;

  private static final Logger logger = LoggerFactory.getLogger(AirbnbApplication.class);
  private final UserRepository userRepository;

  public ReviewService(ReviewRepository reviewRepository, BookingService bookingService, UserRepository userRepository) {
    this.reviewRepository = reviewRepository;
    this.bookingService = bookingService;
    this.userRepository = userRepository;
  }

  public List<Review> getAllReviews() {
    return (List<Review>) reviewRepository.findAll();
  }

  public Review getReviewById(Long id) throws ReviewNotFoundException {
    return reviewRepository.findById(id)
            .orElseThrow(() -> new ReviewNotFoundException("Review not found"));
  }

  public List<Review> getReviewsByReviewerId(Long id) throws UserNotFoundException {
    User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found"));
    return reviewRepository.findAllByReviewer(user);
  }

  public Review createReview(ReviewDto reviewDto) {
    try {
      Booking reviewBooking = bookingService.getBookingById(reviewDto.getBookingId());
      Review review = new Review(reviewBooking, reviewDto.getScore(), reviewDto.getMessage());
      return reviewRepository.save(review);
    } catch (BookingNotFoundException e) {
      throw e;
    } catch (DataIntegrityViolationException e) {
      logger.error("Review already exists");
      return null;
    }
  }

  public Review createReview(Review review) {
    return reviewRepository.save(review);
  }

  public Review updateReview(Long id, ReviewDto reviewDto) throws ReviewNotFoundException {
    Review review = reviewRepository.findById(id)
            .orElseThrow(() -> new ReviewNotFoundException("Review not found"));

    // TODO: Add validation
    review.setScore(reviewDto.getScore());
    if (reviewDto.getMessage() != null && !reviewDto.getMessage().isEmpty()) {
      review.setMessage(reviewDto.getMessage());
    }

    return reviewRepository.save(review);
  }

  public void deleteReview(Long id) {
    reviewRepository.deleteById(id);
  }
}