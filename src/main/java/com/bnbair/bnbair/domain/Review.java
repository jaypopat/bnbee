package com.bnbair.bnbair.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Review {
    @Setter(AccessLevel.NONE)
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User reviewer;

    @ManyToOne(fetch = FetchType.LAZY)
    private Property property;

    private int score;
    private String message;

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", reviewer=" + reviewer +
                ", property=" + property +
                ", score=" + score +
                ", message='" + message + '\'' +
                '}';
    }
}
