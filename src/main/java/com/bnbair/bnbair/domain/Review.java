package com.bnbair.bnbair.domain;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.*;
import org.hibernate.annotations.Fetch;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Setter(AccessLevel.NONE)
    @ManyToOne(fetch = FetchType.EAGER)
    private User reviewer;

    @Setter(AccessLevel.NONE)
    @ManyToOne(fetch = FetchType.EAGER)
    private Property property;

    @Setter(AccessLevel.NONE)
    @OneToOne(fetch = FetchType.EAGER)
    private Booking booking;

    private int score;
    private String message;
    private LocalDateTime createdAt;

    public Review(Booking booking, int score, String message) {
        this.booking = booking;
        this.reviewer = booking.getBooker();
        this.property = booking.getProperty();
        this.score = score;
        this.message = message;
        this.createdAt = LocalDateTime.now();
    }

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