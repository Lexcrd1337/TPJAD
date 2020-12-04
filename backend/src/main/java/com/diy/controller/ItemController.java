package com.diy.controller;

import com.diy.model.Item;
import com.diy.repository.ItemRepository;
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
public class ItemController {
    private static final Logger LOGGER = Logger.getLogger(ItemController.class.getName());

    private final ItemRepository itemRepository;

    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() {
        LOGGER.log(Level.INFO, "REST request to get all items");

        List<Item> items = new ArrayList<>();
        itemRepository.findAll().forEach(items::add);

        return ResponseEntity.ok(items);
    }
}
