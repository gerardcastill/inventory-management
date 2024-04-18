package com.gcsupplies.inventorymanagement.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import com.gcsupplies.inventorymanagement.dto.OrderDTO;
import com.gcsupplies.inventorymanagement.dto.OrderDetailDTO;
import com.gcsupplies.inventorymanagement.dto.OrderSummaryDTO;
import com.gcsupplies.inventorymanagement.model.Orders;
import com.gcsupplies.inventorymanagement.model.OrderDetail;
import com.gcsupplies.inventorymanagement.model.OrderDetailId;
import com.gcsupplies.inventorymanagement.model.Product;
import com.gcsupplies.inventorymanagement.model.Staff;
import com.gcsupplies.inventorymanagement.repository.OrderRepository;
import com.gcsupplies.inventorymanagement.repository.ProductRepository;
import com.gcsupplies.inventorymanagement.repository.StaffRepository;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private StaffRepository staffRepository;

    // Handles creating and updating orders using a Order and OrderDetail DTO's
    @Transactional
    public Orders createOrUpdateOrder(OrderDTO orderDTO) {
        Orders order;
        if (orderDTO.getOrderId() != null) {
            // Fetch the existing order
            order = orderRepository.findById(orderDTO.getOrderId())
                    .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderDTO.getOrderId()));
        } else {
            // Create a new order
            order = new Orders();
        }

        // Set properties from DTO to Order entity
        order.setClientName(orderDTO.getClientName());
        order.setOrderTotal(orderDTO.getOrderTotal());
        order.setDateComplete(orderDTO.getDateComplete());
        order.setStaff(staffRepository.findById(orderDTO.getStaffId()).orElseThrow(() -> new RuntimeException("Staff not found")));
        order.setStatus(Orders.OrderStatus.valueOf(orderDTO.getStatus()));

        // Save the order to generate/update the orderId
        order = orderRepository.save(order);

        // Handle order details
        order.getOrderDetails().clear(); // Clear existing details if any
        for (OrderDetailDTO detailDTO : orderDTO.getOrderDetails()) {
            OrderDetail detail = convertDetailDtoToEntity(detailDTO, order);
            order.getOrderDetails().add(detail);
        }

        return orderRepository.save(order); // Save again to persist the complete order with details
    }

    private OrderDetail convertDetailDtoToEntity(OrderDetailDTO detailDTO, Orders order) {
        Product product = productRepository.findById(detailDTO.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));
        OrderDetail detail = new OrderDetail();
        OrderDetailId detailId = new OrderDetailId(order.getOrderId(), product.getProductId());

        detail.setId(detailId);
        detail.setOrder(order);
        detail.setProduct(product);
        detail.setQuantityOrdered(detailDTO.getQuantityOrdered());
        return detail;
    }

    // Gets order by Id
    public OrderDTO getOrderById(Long orderId) {
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        return convertEntityToDto(order);
    }



    // Fetch all orders with full details
    public List<OrderDTO> findAllOrderDetails() {
        return orderRepository.findAll().stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    // Handles deleting orders
    public void deleteOrder(Long orderId) {
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        orderRepository.delete(order);
    }



    private OrderDTO convertEntityToDto(Orders order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setOrderId(order.getOrderId());
        orderDTO.setClientName(order.getClientName());
        orderDTO.setOrderTotal(order.getOrderTotal());
        orderDTO.setDateCreated(order.getDateCreated());
        orderDTO.setDateComplete(order.getDateComplete());
        orderDTO.setStatus(order.getStatus().name()); // Convert Enum to String
        orderDTO.setStaffId(order.getStaff().getId()); // Assuming your Staff entity has getId method

        // Convert each OrderDetail to OrderDetailDTO
        List<OrderDetailDTO> detailDTOs = order.getOrderDetails().stream().map(detail -> {
            OrderDetailDTO detailDTO = new OrderDetailDTO();
            detailDTO.setProductId(detail.getProduct().getProductId());
            detailDTO.setQuantityOrdered(detail.getQuantityOrdered());
            return detailDTO;
        }).collect(Collectors.toList());

        orderDTO.setOrderDetails(detailDTOs); // Set the list of details to the DTO

        return orderDTO;
    }
}