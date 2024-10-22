package com.bnbair.bnbair.service;

import com.bnbair.bnbair.domain.RegisterCredentials;
import com.bnbair.bnbair.domain.User;
import com.bnbair.bnbair.exception.UserAlreadyExistsException;
import com.bnbair.bnbair.exception.UserNotFoundException;
import com.bnbair.bnbair.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    public User getUserById(Long id) throws UserNotFoundException {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    public User createUser(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) throws UserNotFoundException {
        User user = getUserById(id);
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());

        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }
        return userRepository.save(user);
    }


    public void deleteUser(Long id) throws UserNotFoundException {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    public User getUserByEmail(String email) throws UserNotFoundException {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
    }

    public List<User> getUsersByFirstAndLastName(String firstName, String lastName) {
        return userRepository.findDistinctByFirstNameAndLastName(firstName, lastName);
    }
    public User registerNewUser(RegisterCredentials accountCredentials) throws UserAlreadyExistsException {

        Optional<User> existingUser = userRepository.findByEmail(accountCredentials.email());

        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException("Email is already in use.");
        }

        User newUser = new User();
        newUser.setEmail(accountCredentials.email());
        newUser.setPassword(passwordEncoder.encode(accountCredentials.password()));
        newUser.setFirstName(accountCredentials.firstName());
        newUser.setLastName(accountCredentials.lastName());
        newUser.setRole("user");

        return userRepository.save(newUser);
    }
}
