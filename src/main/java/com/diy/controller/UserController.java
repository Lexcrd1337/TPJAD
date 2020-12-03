package com.diy.controller;

import com.diy.model.Client;
import com.diy.model.User;
import com.diy.repository.ClientRepository;
import com.diy.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
public class UserController {
    private static final Logger LOGGER = Logger.getLogger(UserController.class.getName());

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        LOGGER.log(Level.INFO, "REST request to get all users");

        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);

        return ResponseEntity.ok(users);
    }
}
