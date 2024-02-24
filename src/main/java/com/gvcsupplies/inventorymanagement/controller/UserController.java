package com.gvcsupplies.inventorymanagement.controller;

import com.gvcsupplies.inventorymanagement.exception.ResourceNotFoundException;
import com.gvcsupplies.inventorymanagement.repository.UserRepository;
import com.gvcsupplies.inventorymanagement.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    // get all users in user repository
    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    // get user by id or else give status of no user by id
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User does not exist with id:" + id));
        return ResponseEntity.ok(user);
    }

    // post new user to user repository
    @PostMapping("/users")
    public User createUser(@RequestBody User user){
        return userRepository.save(user);
    }

    // put an updated user into user repository given and id and user object
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails){
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User does not exist with id:" + id));

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmailId(userDetails.getEmailId());

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    // delete user from user repository given id
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteUser(@PathVariable Long id){
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User does not exist with id:" + id));

        userRepository.delete(user);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
