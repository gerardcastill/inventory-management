package com.gcsupplies.inventorymanagement.controller;

import com.gcsupplies.inventorymanagement.exception.ResourceNotFoundException;
import com.gcsupplies.inventorymanagement.repository.InventoryRepository;
import com.gcsupplies.inventorymanagement.model.Product;
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

    // Get product by ID
    @GetMapping("/inventory/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = inventoryRepository.findById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // post new product to inventory repository
    @PostMapping("/inventory")
    public Product createProduct(@RequestBody Product product){
        return inventoryRepository.save(product);
    }

    // put an updated product into inventory repository given and id and product object
    @PutMapping("/inventory/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody Product productDetails){
        Product product = inventoryRepository.findById(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product does not exist with id:" + productId));

        product.setProductName(productDetails.getProductName());
        product.setProductDescription(productDetails.getProductDescription());
        product.setQuantityAvailable(productDetails.getQuantityAvailable());
        product.setQuantityPending(productDetails.getQuantityPending());
        product.setPrice(productDetails.getPrice());

        Product updatedProduct = inventoryRepository.save(product);
        return ResponseEntity.ok(updatedProduct);
    }

    // delete product from inventory repository given id
    @DeleteMapping("/inventory/{productId}")
    public ResponseEntity<Map<String,Boolean>> deleteProduct(@PathVariable Long productId){
        Product product = inventoryRepository.findById(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product does not exist with id:" + productId));

        inventoryRepository.delete(product);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
