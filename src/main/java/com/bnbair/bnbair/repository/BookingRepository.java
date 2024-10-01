package com.bnbair.bnbair.repository;

import com.bnbair.bnbair.domain.Booking;
import com.bnbair.bnbair.domain.BookingStatus;
import com.bnbair.bnbair.domain.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends CrudRepository<Booking, Long> {

    List<Booking> findByBooker(User user);

    List<Booking> findByBooker_Id(Long id);

    List<Booking> findByProperty_Id(Long id);

    List<Booking> findByStatus(BookingStatus status);

    @Query("SELECT b FROM Booking b WHERE b.property.id = ?1 AND b.startDate >= ?2 AND b.endDate <= ?3")
    List<Booking> findByPropertyIdBetween(@Param("propertyId") Long propertyId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
