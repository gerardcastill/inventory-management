package com.gvcsupplies.inventorymanagement.controller;

import com.gvcsupplies.inventorymanagement.exception.ResourceNotFoundException;
import com.gvcsupplies.inventorymanagement.model.Client;
import com.gvcsupplies.inventorymanagement.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ClientController {
    @Autowired
    private ClientRepository clientRepository;

    // get all clients in client repository
    @GetMapping("/client")
    public List<Client> getAllClient(){
        return clientRepository.findAll();
    }

    // post new client to client repository
    @PostMapping("/client")
    public Client createClient(@RequestBody Client client){
        return clientRepository.save(client);
    }

    // put an updated client into client repository given and id and client object
    @PutMapping("/client/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Long id, @RequestBody Client clientDetails){
        Client client = clientRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Client does not exist with id:" + id));

        client.setFirstName(clientDetails.getFirstName());
        client.setLastName(clientDetails.getLastName());
        client.setEmailId(clientDetails.getEmailId());

        Client updatedClient = clientRepository.save(client);
        return ResponseEntity.ok(updatedClient);
    }

    // delete client from client repository given id
    @DeleteMapping("/client/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteClient(@PathVariable Long id){
        Client client = clientRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Client does not exist with id:" + id));

        clientRepository.delete(client);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
