package com.bnbair.bnbair.domain;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Bookmark {
    @EmbeddedId
    private BookmarkId id;

    public Bookmark() {
    }

    public Bookmark(User user, Property property) {
        this.id = new BookmarkId(user, property);
    }
}
