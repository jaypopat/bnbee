package com.bnbair.bnbair.domain;

public record RegisterCredentials(String email, String password, String firstName, String lastName) {
    public RegisterCredentials {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        if (firstName == null || firstName.isEmpty()) {
            throw new IllegalArgumentException("First Name cannot be null or empty");
        }
        if (lastName == null || lastName.isEmpty()) {
            throw new IllegalArgumentException("Last Name cannot be null or empty");
        }
    }
}