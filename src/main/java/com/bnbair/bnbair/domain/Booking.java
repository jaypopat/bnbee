package com.bnbair.bnbair.domain;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Booking {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  private User booker;

  @ManyToOne(fetch = FetchType.LAZY)
  private Property property;

  private LocalDate startDate, endDate;
  private float paymentAmount;
  private int headCount;

  @Enumerated(EnumType.STRING)
  private BookingStatus status;


}