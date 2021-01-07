package com.diy.controller;

import com.diy.model.Department;
import com.diy.repository.DepartmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class DepartmentController {
    private static final Logger LOGGER = Logger.getLogger(DepartmentController.class.getName());

    private final DepartmentRepository departmentRepository;

    public DepartmentController(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @GetMapping("/departments")
    public ResponseEntity<List<Department>> getAllDepartments() {
        LOGGER.log(Level.INFO, "REST request to get all departments");

        List<Department> departments = new ArrayList<>();
        departmentRepository.findAll().forEach(departments::add);

        return ResponseEntity.ok(departments);
    }

    @PostMapping({"/createDepartment"})
    public ResponseEntity<Department> createItem(@RequestBody Department department) {
        LOGGER.log(Level.INFO, "Creating department");
        this.departmentRepository.save(department);
        return ResponseEntity.ok(department);
    }

    @DeleteMapping({"/deleteDepartment"})
    public ResponseEntity<Department> deleteItem(@RequestParam Long id) {
        LOGGER.log(Level.INFO, "Deleting department: " + id);
        Optional<Department> itemOptional = this.departmentRepository.findById(id);
        itemOptional.ifPresent(departmentRepository::delete);
        return ResponseEntity.ok((Department)itemOptional.get());
    }
}
