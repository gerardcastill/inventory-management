package com.gcsupplies.inventorymanagement.controller;

import com.gcsupplies.inventorymanagement.dto.OrderDTO;
import com.gcsupplies.inventorymanagement.dto.OrderSummaryDTO;
import com.gcsupplies.inventorymanagement.model.Orders;
import com.gcsupplies.inventorymanagement.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Get all order summaries
    @GetMapping("/order")
    public List<OrderSummaryDTO> getAllOrders() {
        return orderService.findAllOrders();
    }

    // Get order by Id
    @GetMapping("/order/{orderId}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long orderId) {
        try {
            OrderDTO orderDTO = orderService.getOrderById(orderId);
            return ResponseEntity.ok(orderDTO);  // Return the found order with details
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();  // Return HTTP 404 if not found
        }
    }

    // Create a new order
    @PostMapping("/order")
    public ResponseEntity<Orders> createOrder(@RequestBody OrderDTO orderDTO) {
        Orders createdOrder = orderService.createOrUpdateOrder(orderDTO);
        return ResponseEntity.ok(createdOrder);
    }

    // Updates order given orderId
    @PutMapping("/order/{orderId}")
    public ResponseEntity<Orders> updateOrder(@PathVariable Long orderId, @RequestBody OrderDTO orderDTO) {
        orderDTO.setOrderId(orderId); // Make sure the DTO carries the correct ID
        Orders updatedOrder = orderService.createOrUpdateOrder(orderDTO);
        return ResponseEntity.ok(updatedOrder);
    }

    // Delete an order
    @DeleteMapping("/order/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderId) {
        try {
            orderService.deleteOrder(orderId);
            return ResponseEntity.ok().build();  // Respond with HTTP 200 on successful deletion
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();  // Respond with HTTP 404 if the order is not found
        }
    }
}

