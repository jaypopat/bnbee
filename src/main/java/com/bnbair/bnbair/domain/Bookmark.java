package com.bnbair.bnbair.domain;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Bookmark {

    @EmbeddedId
    private BookmarkId bookmarkId;

    public Bookmark(User user, Property property) {
        this.bookmarkId = new BookmarkId(user, property);
    }

    @Override
    public String toString() {
        return "Bookmark [bookmarkId=" + bookmarkId + ", getBookmarkId()=" + getBookmarkId() + "]";
    }
}
