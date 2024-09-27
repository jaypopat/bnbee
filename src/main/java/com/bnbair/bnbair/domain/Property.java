package com.bnbair.bnbair.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Property {

    @Id
    @Setter(value = AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User owner;

    @NotBlank(message = "Property name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Property address is required")
    @Column(nullable = false)
    private String address;

    @NotBlank(message = "Property country is required")
    @Column(nullable = false)
    private String country;

    @NotBlank(message = "Property description is required")
    @Column(nullable = false)
    private String description;

    private float rating;

    @Column(nullable = false)
    private float pricePerNight;

    @Column(nullable = false, updatable = false)
    @Setter(value = AccessLevel.NONE)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private AccommodationType type;
}
