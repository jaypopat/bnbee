package com.bnbair.bnbair.controller;

import com.bnbair.bnbair.domain.RegisterCredentials;
import com.bnbair.bnbair.domain.User;
import com.bnbair.bnbair.exception.UserAlreadyExistsException;
import com.bnbair.bnbair.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController{

    private final UserService userService;
    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterCredentials credentials) throws UserAlreadyExistsException {
        User newUser = userService.registerNewUser(credentials);
        return ResponseEntity.status(201).body(newUser);
    }
}

