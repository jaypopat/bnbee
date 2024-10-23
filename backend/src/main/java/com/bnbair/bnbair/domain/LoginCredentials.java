package com.bnbair.bnbair.domain;

public record LoginCredentials(String email, String password) {
    public LoginCredentials {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
    }
}
