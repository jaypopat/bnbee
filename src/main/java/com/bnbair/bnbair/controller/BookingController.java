package com.bnbair.bnbair.controller;

import com.bnbair.bnbair.domain.Booking;
import com.bnbair.bnbair.domain.BookingDto;
import com.bnbair.bnbair.domain.BookingStatus;
import com.bnbair.bnbair.exception.BookingNotFoundException;
import com.bnbair.bnbair.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("api/bookings")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // This endpoint is unrealistic
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        try {
            Booking booking = bookingService.getBookingById(id);
            return ResponseEntity.ok(booking);
        } catch (BookingNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // TODO: How to write an endpoint to access a user's or property's bookings?
    // api/bookings/users/{id} or /api/users/{id}/bookings'

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        booking.setStatus(BookingStatus.PENDING);
        Booking newBooking = bookingService.createBooking(booking);
        return ResponseEntity.ok(newBooking);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody BookingDto bookingDto) {
        Booking updatedBooking = bookingService.updateBooking(id, bookingDto);
        return ResponseEntity.ok(updatedBooking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Booking> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}
