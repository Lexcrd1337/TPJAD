package com.diy.controller;

import com.diy.dto.AuthDTO;
import com.diy.model.Item;
import com.diy.model.User;
import com.diy.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
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

    @PostMapping("/addToCart/{username}")
    public ResponseEntity<List<Item>> addItemToCart(@PathVariable String username, @RequestBody Item item) {
        LOGGER.log(Level.INFO, "REST request to add item to cart for user");

        User user = userRepository.findByUsername(username);
        List<Item> cart = user.getCart();
        cart.add(item);
        user.setCart(cart);
        userRepository.save(user);

        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/removeFromCart/{username}")
    public ResponseEntity<List<Item>> removeFromCart(@PathVariable String username, @RequestParam Long itemId) {
        LOGGER.log(Level.INFO, "REST request to remove item from cart for user");

        User user = userRepository.findByUsername(username);
        List<Item> cart = user.getCart();

        cart.removeIf(item -> itemId == item.getId());
        user.setCart(cart);
        userRepository.save(user);

        return ResponseEntity.ok(cart);
    }

    @GetMapping("/getCart/{username}")
    public ResponseEntity<List<Item>> getCart(@PathVariable String username) {
        LOGGER.log(Level.INFO, "REST request to get cart for user");

        User user = userRepository.findByUsername(username);
        List<Item> cart = user.getCart();

        return ResponseEntity.ok(cart);
    }
}
