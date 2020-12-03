package com.diy.controller;

import com.diy.model.Order;
import com.diy.repository.OrderRepository;
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
public class OrderController {
    private static final Logger LOGGER = Logger.getLogger(OrderController.class.getName());

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        LOGGER.log(Level.INFO, "REST request to get all orders");

        List<Order> orders = new ArrayList<>();
        orderRepository.findAll().forEach(orders::add);

        return ResponseEntity.ok(orders);
    }
}
