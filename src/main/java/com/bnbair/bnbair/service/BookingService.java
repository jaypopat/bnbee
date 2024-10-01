package com.bnbair.bnbair.service;

import com.bnbair.bnbair.domain.Booking;
import com.bnbair.bnbair.domain.BookingDto;
import com.bnbair.bnbair.domain.BookingStatus;
import com.bnbair.bnbair.domain.User;
import com.bnbair.bnbair.exception.BookingNotFoundException;
import com.bnbair.bnbair.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    public Booking getBookingById(Long bookingId) throws BookingNotFoundException {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found"));
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    // Note: For a booking, some fields simply do not make sense to update.
    // It does not make sense to update the User of a booking, or the property. In this scenario, the user should
    // cancel their booking and create a new one. The allowed updates would be startDate, endDate, headCount and status.
    // The paymentAmount should be updated accordingly.
    public Booking updateBooking(Long bookingId, BookingDto bookingData) throws BookingNotFoundException {
        Booking originalBooking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found"));

        // TODO: Add validation here (e.g. check for start date in the past)
        if (bookingData.getStartDate() != null) {
            originalBooking.setStartDate(bookingData.getStartDate());
        }
        if (bookingData.getEndDate() != null) {
            originalBooking.setEndDate(bookingData.getEndDate());
        }
        if (bookingData.getStatus() != null) {
            originalBooking.setStatus(bookingData.getStatus());
        }
        if (bookingData.getHeadCount() != 0) {
            originalBooking.setHeadCount(bookingData.getHeadCount());
        }
        return bookingRepository.save(originalBooking);
    }

    public void deleteBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    public List<Booking> getBookingsForPropertyBetweenDates(Long propertyId, LocalDate startDate, LocalDate endDate) {
        return bookingRepository.findByPropertyIdBetween(propertyId, startDate, endDate);
    }
}
