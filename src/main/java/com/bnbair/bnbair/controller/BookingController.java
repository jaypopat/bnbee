package com.bnbair.bnbair.controller;

import com.bnbair.bnbair.domain.Booking;
import com.bnbair.bnbair.domain.BookingDto;
import com.bnbair.bnbair.domain.BookingStatus;
import com.bnbair.bnbair.exception.BookingNotFoundException;
import com.bnbair.bnbair.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // This endpoint is unrealistic
    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/bookings/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        try {
            Booking booking = bookingService.getBookingById(id);
            return ResponseEntity.ok(booking);
        } catch (BookingNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // get users bookings
    @GetMapping("/bookings/users/{id}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable Long id) {
        List<Booking> bookings = bookingService.getUserBookings(id);
        return ResponseEntity.ok(bookings);
    }

    // get property bookings
    @GetMapping("/bookings/properties/{id}")
    public ResponseEntity<List<Booking>> getPropertyBookings(@PathVariable Long id) {
        List<Booking> bookings = bookingService.getPropertyBookings(id);
        return ResponseEntity.ok(bookings);
    }

    @PostMapping("/bookings")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        booking.setStatus(BookingStatus.PENDING);
        Booking newBooking = bookingService.createBooking(booking);
        return ResponseEntity.ok(newBooking);
    }

    @PatchMapping("/bookings/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody BookingDto bookingDto) {
        Booking updatedBooking = bookingService.updateBooking(id, bookingDto);
        return ResponseEntity.ok(updatedBooking);
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Booking> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/bookings/properties/{propertyId}/between")
    public ResponseEntity<List<Booking>> getBookingsForPropertyBetweenDates(
            @PathVariable Long propertyId,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        List<Booking> bookings = bookingService.getBookingsForPropertyBetweenDates(propertyId, startDate, endDate);
        return ResponseEntity.ok(bookings);
    }
}
