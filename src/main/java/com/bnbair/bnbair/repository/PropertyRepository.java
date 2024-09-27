package com.bnbair.bnbair.repository;

import org.springframework.data.repository.CrudRepository;

import com.bnbair.bnbair.domain.Property;

public interface PropertyRepository extends CrudRepository<Property, Long> {
}
