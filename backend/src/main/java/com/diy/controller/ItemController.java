package com.diy.controller;

import com.diy.dto.ItemDTO;
import com.diy.model.Department;
import com.diy.model.Item;
import com.diy.repository.DepartmentRepository;
import com.diy.repository.ItemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ItemController {
    private static final Logger LOGGER = Logger.getLogger(ItemController.class.getName());

    private final ItemRepository itemRepository;
    
    private final DepartmentRepository departmentRepository;

    public ItemController(ItemRepository itemRepository, DepartmentRepository departmentRepository) {
        this.itemRepository = itemRepository;
        this.departmentRepository = departmentRepository;
    }

    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() {
        LOGGER.log(Level.INFO, "REST request to get all items");

        List<Item> items = new ArrayList<>();
        itemRepository.findAll().forEach(items::add);

        return ResponseEntity.ok(items);
    }

    @PostMapping("/createItem")
    public ResponseEntity<Item> createItem(@RequestBody ItemDTO itemDTO) {
        LOGGER.log(Level.INFO, "Creating item {0}", itemDTO);
        Department department = departmentRepository.findById((long) itemDTO.getDepartmentId()).orElse(null);
        Item item = new Item(itemDTO.getName(), itemDTO.getPrice(), itemDTO.getQuantity(), itemDTO.getBrand(),
                itemDTO.getImage(), department, Collections.emptyList());
        itemRepository.save(item);

        return ResponseEntity.ok(item);
    }

    @DeleteMapping({"/deleteItem"})
    public ResponseEntity<Item> deleteItem(@RequestParam Long id) {
        LOGGER.log(Level.INFO, "Deleting item: " + id);
        Optional<Item> itemOptional = this.itemRepository.findById(id);
        itemOptional.ifPresent(itemRepository::delete);
        return ResponseEntity.ok((Item)itemOptional.get());
    }

    @GetMapping("/itemsByDepartment/{departmentName}")
    public ResponseEntity<List<Item>> getItemsByDepartment(@PathVariable String departmentName) {
        LOGGER.log(Level.INFO, "REST request to get all items for department {0}", departmentName);
        List<Item> items = new ArrayList<>(itemRepository.findAllByDepartmentNameIgnoreCase(departmentName));

        return ResponseEntity.ok(items);
    }

    @GetMapping("/itemByName/{itemName}")
    public ResponseEntity<Item> getItemByName(@PathVariable String itemName) {
        LOGGER.log(Level.INFO, "REST request to get item by name {0}", itemName);
        Item item = itemRepository.findByNameIgnoreCase(itemName);

        return ResponseEntity.ok(item);
    }
}
