package com.diy.controller;

import com.diy.model.Employee;
import com.diy.repository.EmployeeRepository;
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
public class EmployeeController {
    private static final Logger LOGGER = Logger.getLogger(EmployeeController.class.getName());

    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        LOGGER.log(Level.INFO, "REST request to get all employees");

        List<Employee> employees = new ArrayList<>();
        employeeRepository.findAll().forEach(employees::add);

        return ResponseEntity.ok(employees);
    }

    @PostMapping({"/createEmployee"})
    public ResponseEntity<Employee> createItem(@RequestBody Employee employee) {
        LOGGER.log(Level.INFO, "Creating employee");
        this.employeeRepository.save(employee);
        return ResponseEntity.ok(employee);
    }

    @DeleteMapping({"/deleteEmployee"})
    public ResponseEntity<Employee> deleteItem(@RequestParam Long id) {
        LOGGER.log(Level.INFO, "Deleting employee: " + id);
        Optional<Employee> itemOptional = this.employeeRepository.findById(id);
        itemOptional.ifPresent(employeeRepository::delete);
        return ResponseEntity.ok((Employee)itemOptional.get());
    }
}
