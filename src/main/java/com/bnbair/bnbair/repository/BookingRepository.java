package com.bnbair.bnbair.repository;

import com.bnbair.bnbair.domain.Booking;
import com.bnbair.bnbair.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookingRepository extends CrudRepository<Booking, Long> {
    // TODO: Add methods for getting getting bookings of a property
    // Add a method for searching for bookings for a property between two dates

    List<Booking> findByBooker(User user);
}
