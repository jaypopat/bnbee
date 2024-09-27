package com.bnbair.bnbair.service;

import com.bnbair.bnbair.domain.Booking;
import com.bnbair.bnbair.domain.User;
import com.bnbair.bnbair.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getAllBookings() {
        return (List<Booking>) bookingRepository.findAll();
    }

    public void createBooking(Booking booking) {
        bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByBooker(User user) {
        return bookingRepository.findByBooker(user);
    }

    // TODO: Add update, and delete methods
}
