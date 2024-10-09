package com.bnbair.bnbair;

import com.bnbair.bnbair.domain.User;
import com.bnbair.bnbair.exception.UserNotFoundException;
import com.bnbair.bnbair.service.UserService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User userJohn;
    private User userJane;
    private User userAlice;
    private User userBob;

    @BeforeEach
    void setUp() {

        userJohn = createUser("John", "Doe", "john.doe@example.com", "password123");
        userJane = createUser("Jane", "Doe", "jane.doe@example.com", "password123");
        userAlice = createUser("Alice", "Smith", "alice.smith@example.com", "password123");
        userBob = createUser("Bob", "Brown", "bob.brown@example.com", "password123");
        createUser("Charlie", "Delta", "charlie.delta@example.com", "password123");
        createUser("Eve", "Echo", "eve.echo@example.com", "password123");
    }

    private User createUser(String firstName, String lastName, String email, String password) {
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(password);
        return userService.createUser(user);
    }

    @Test
    void testCreateUser() {
        assertNotNull(userJohn);
        assertEquals("John", userJohn.getFirstName());
        assertEquals("Doe", userJohn.getLastName());
        assertEquals("john.doe@example.com", userJohn.getEmail());
        assertNotEquals("password123", userJohn.getPassword());
        assertTrue(passwordEncoder.matches("password123", userJohn.getPassword()));
    }

    @Test
    void testFindUserById() throws UserNotFoundException {
        User foundUser = userService.getUserById(userJane.getId());

        assertNotNull(foundUser);
        assertEquals("Jane", foundUser.getFirstName());
        assertEquals("Doe", foundUser.getLastName());
        assertEquals("jane.doe@example.com", foundUser.getEmail());
        assertTrue(passwordEncoder.matches("password123", foundUser.getPassword()));
    }

    @Test
    void testUpdateUser() throws UserNotFoundException {
        User updatedUser = new User();
        updatedUser.setFirstName("AliceUpdated");
        updatedUser.setLastName("SmithUpdated");
        updatedUser.setEmail("alice.updated@example.com");
        updatedUser.setPassword("newpassword456");

        User result = userService.updateUser(userAlice.getId(), updatedUser);

        assertNotNull(result);
        assertEquals("AliceUpdated", result.getFirstName());
        assertEquals("SmithUpdated", result.getLastName());
        assertEquals("alice.updated@example.com", result.getEmail());
        assertNotEquals("newpassword456", result.getPassword());
        assertTrue(passwordEncoder.matches("newpassword456", result.getPassword()));
    }

    @Test
    void testDeleteUser() throws UserNotFoundException {
        Long userId = userBob.getId();

        userService.deleteUser(userId);

        assertThrows(UserNotFoundException.class, () -> userService.getUserById(userId));
    }

    @Test
    void testGetAllUsers() {
        List<User> users = userService.getAllUsers();
        assertTrue(users.size() >= 6);
    }

    @Test
    void testFindByEmail() throws UserNotFoundException {
        User userFetchedByEmail = userService.getUserByEmail("charlie.delta@example.com");

        assertNotNull(userFetchedByEmail);
        assertEquals("Charlie", userFetchedByEmail.getFirstName());
        assertEquals("Delta", userFetchedByEmail.getLastName());
        assertTrue(passwordEncoder.matches("password123", userFetchedByEmail.getPassword()));
    }

    @Test
    void testFindByFirstAndLastName() {
        List<User> users = userService.getUsersByFirstAndLastName("Eve", "Echo");

        assertNotNull(users);
        assertFalse(users.isEmpty());
        assertEquals(1, users.size());
        assertEquals("Eve", users.getFirst().getFirstName());
        assertEquals("Echo", users.getFirst().getLastName());
        assertTrue(passwordEncoder.matches("password123", users.getFirst().getPassword()));
    }

    @Test
    void testUserNotFoundException() {
        assertThrows(UserNotFoundException.class, () -> userService.getUserById(999L));
    }
}