package com.bnbair.bnbair.domain;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class BookingDto {
    User booker;
    Property property;
    @Getter
    LocalDate startDate, endDate;
    int headCount;
    BookingStatus status;
}
