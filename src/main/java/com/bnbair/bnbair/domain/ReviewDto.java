package com.bnbair.bnbair.domain;

import lombok.Getter;

public class ReviewDto {
  private Long id;
  private Long userId;
  private Long PropertyId;
  @Getter
  private final Long bookingId;
  @Getter
  private final Integer score;
  @Getter
  private final String message;

  public ReviewDto(Long bookingId, int score, String message) {
    this.bookingId = bookingId;
    this.score = score;
    this.message = message;
  }
}
