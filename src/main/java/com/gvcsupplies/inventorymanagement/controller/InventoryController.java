package com.gvcsupplies.inventorymanagement.controller;

import com.gvcsupplies.inventorymanagement.exception.ResourceNotFoundException;
import com.gvcsupplies.inventorymanagement.repository.InventoryRepository;
import com.gvcsupplies.inventorymanagement.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class InventoryController {
    @Autowired
    private InventoryRepository inventoryRepository;

    // get all products in inventory
    @GetMapping("/inventory")
    public List<Product> getAllProducts(){
        return inventoryRepository.findAll();
    }

    // get product by id or else give status of no product by id
    @GetMapping("/inventory/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id){
        Product product = inventoryRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Product does not exist with id:" + id));
        return ResponseEntity.ok(product);
    }

    // post new product item to inventory repository
    @PostMapping("/inventory")
    public Product createProduct(@RequestBody Product product){
        return inventoryRepository.save(product);
    }

    // put an updated product into inventory repository given and id and product object
    @PutMapping("/inventory/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails){
        Product product = inventoryRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Product does not exist with id:" + id));

        product.setItemName(productDetails.getItemName());
        product.setItemDescription(productDetails.getItemDescription());
        product.setQuantity(productDetails.getQuantity());
        product.setPrice(productDetails.getPrice());

        Product updatedProduct = inventoryRepository.save(product);
        return ResponseEntity.ok(updatedProduct);
    }

    // delete product from inventory repository given id
    @DeleteMapping("/inventory/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteProduct(@PathVariable Long id){
        Product product = inventoryRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Product does not exist with id:" + id));

        inventoryRepository.delete(product);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
