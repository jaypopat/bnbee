package com.bnbair.bnbair.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.bnbair.bnbair.domain.Property;

public interface PropertyRepository extends CrudRepository<Property, Long> {
    public List<Property> findByCountry(String country);

    @Query("select p from Property p where p.pricePerNight between :low and :high")
    List<Property> findPropertyByPriceBetween(@Param("low") float low, @Param("high") float high);
}
