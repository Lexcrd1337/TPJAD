package com.diy.controller;

import com.diy.model.Client;
import com.diy.repository.ClientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ClientController {
    private static final Logger LOGGER = Logger.getLogger(ClientController.class.getName());

    private final ClientRepository clientRepository;

    public ClientController(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @GetMapping("/clients")
    public ResponseEntity<List<Client>> getAllClients() {
        LOGGER.log(Level.INFO, "REST request to get all clients");

        List<Client> clients = new ArrayList<>();
        clientRepository.findAll().forEach(clients::add);

        return ResponseEntity.ok(clients);
    }
}
