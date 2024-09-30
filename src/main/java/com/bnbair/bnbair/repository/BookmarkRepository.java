package com.bnbair.bnbair.repository;

import org.springframework.data.repository.CrudRepository;

import com.bnbair.bnbair.domain.Bookmark;

public interface BookmarkRepository extends CrudRepository<Bookmark, Long> {
}
