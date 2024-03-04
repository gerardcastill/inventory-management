package com.gvcsupplies.inventorymanagement.controller;

import com.gvcsupplies.inventorymanagement.exception.ResourceNotFoundException;
import com.gvcsupplies.inventorymanagement.model.Staff;
import com.gvcsupplies.inventorymanagement.repository.OrderRepository;
import com.gvcsupplies.inventorymanagement.model.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    // get all orders in orders repository
    @GetMapping("/order")
    public List<Orders> getAllOrders(){
        return orderRepository.findAll();
    }

    // post new orders to orders repository
    @PostMapping("/order")
    public Orders createOrder(@RequestBody Orders order){
        return orderRepository.save(order);
    }

    // put an updated order into order repository given and id and orders object
    @PutMapping("/order/{id}")
    public ResponseEntity<Orders> updateOrder(@PathVariable Long id, @RequestBody Orders orderDetails){
        Orders order = orderRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Order does not exist with id:" + id));

        order.setOrderDate(orderDetails.getOrderDate());
        order.setStaff(orderDetails.getStaff());
        order.setClient(orderDetails.getClient());
        order.setProducts((orderDetails.getProducts()));

        Orders updatedOrder = orderRepository.save(order);
        return ResponseEntity.ok(updatedOrder);
    }

    // delete order from order repository given id
    @DeleteMapping("/order/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteOrder(@PathVariable Long id){
        Orders order = orderRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Order does not exist with id:" + id));

        orderRepository.delete(order);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
