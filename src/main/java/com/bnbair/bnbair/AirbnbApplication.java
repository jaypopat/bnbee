package com.bnbair.bnbair;

import com.bnbair.bnbair.domain.User;
import com.bnbair.bnbair.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//import java.security.Provider;

@SpringBootApplication
public class AirbnbApplication implements CommandLineRunner {
    UserService userService;

    private static final Logger logger= LoggerFactory.getLogger(AirbnbApplication.class);

    public AirbnbApplication(UserService userService) {
        this.userService = userService;
    }

    public static void main(String[] args) {
        SpringApplication.run(AirbnbApplication.class, args);

        logger.info("Application started");
    }

    @Override
    public void run(String... args) /* throws Exception */ {
        User user1 = new User("Jay", "Bomba", "j.bomba@gmail.com");
        User user2 = new User("Pat", "Reeks", "p.reeks@gmail.com");
        userService.createUser(user1);
        userService.createUser(user2);

        // TODO: Create seed for Properties, Bookings, Reviews and Bookmarks

        for (User user: userService.getAllUsers()) {
            logger.info(user.toString());
        }
    }
}
