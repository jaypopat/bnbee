package com.bnbair.bnbair.repository;

import com.bnbair.bnbair.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}