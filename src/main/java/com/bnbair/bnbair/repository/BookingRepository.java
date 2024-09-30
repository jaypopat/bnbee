package com.bnbair.bnbair.repository;

import com.bnbair.bnbair.domain.Booking;
import com.bnbair.bnbair.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends CrudRepository<Booking, Long> {

    List<Booking> findByBooker(User user);

    List<Booking> findByBooker_Id(Long id);

    List<Booking> findByProperty_Id(Long id);
    List<Booking> findByProperty_IdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            Long propertyId, LocalDate startDate, LocalDate endDate);
}
