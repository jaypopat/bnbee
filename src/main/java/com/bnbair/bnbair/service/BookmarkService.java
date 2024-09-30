package com.bnbair.bnbair.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bnbair.bnbair.domain.Bookmark;
import com.bnbair.bnbair.repository.BookmarkRepository;

@Service
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    public List<Bookmark> getAllBookmarks() {
        return (List<Bookmark>) bookmarkRepository.findAll();
    }

    public Bookmark getBookmarkById(Long id) {
        return bookmarkRepository.findById(id).orElse(null);
    }

    public Bookmark createBookmark(Bookmark bookmark) {
        return bookmarkRepository.save(bookmark);
    }
}
