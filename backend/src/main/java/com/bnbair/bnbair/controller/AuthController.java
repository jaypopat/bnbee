package com.bnbair.bnbair.controller;

import com.bnbair.bnbair.domain.LoginCredentials;
import com.bnbair.bnbair.domain.RegisterCredentials;
import com.bnbair.bnbair.domain.User;
import com.bnbair.bnbair.exception.UserAlreadyExistsException;
import com.bnbair.bnbair.exception.UserNotFoundException;
import com.bnbair.bnbair.service.JwtService;
import com.bnbair.bnbair.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthController(JwtService jwtService, AuthenticationManager authenticationManager, UserService userService) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginCredentials credentials) throws UserNotFoundException {
        UsernamePasswordAuthenticationToken creds = new UsernamePasswordAuthenticationToken(credentials.email(), credentials.password());
        Authentication auth = authenticationManager.authenticate(creds);
        // Generate token
        String jwt = jwtService.getToken(auth.getName());
        // Build response with the generated token
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwt)
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
                .build();
    }

    // Get the user data from the user's jwt token
    @GetMapping("/me")
    public ResponseEntity<User> getUserFromToken(@RequestHeader("Authorization") String bearerToken) {
        String email = jwtService.getAuthUser(bearerToken);
        try {
            User user = userService.getUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterCredentials credentials) throws UserAlreadyExistsException {
        User newUser = userService.registerNewUser(credentials);
        return ResponseEntity.status(201).body(newUser);
    }
}
