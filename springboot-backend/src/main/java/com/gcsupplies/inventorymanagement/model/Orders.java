package com.gcsupplies.inventorymanagement.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.math.BigDecimal;
import java.util.Date;
import java.util.*;

@Entity
@Table (name = "orders")
public class Orders {

    public enum OrderStatus {
        PENDING,
        COMPLETED,
        CANCELLED
    }

    public void addOrderDetail(Product product, int quantityOrdered) {
        OrderDetail detail = new OrderDetail();
        detail.setProduct(product);
        detail.setQuantityOrdered(quantityOrdered);
        detail.setOrder(this);  // Set the order side of the relationship
        this.orderDetails.add(detail);  // Ensure the collection is managed
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderId;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "order_date_created", nullable = false, updatable = false)
    private Date dateCreated;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "order_date_complete")
    private Date dateComplete;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    @Column(name = "client_name")
    private String clientName;

    @Column(name = "order_total")
    private BigDecimal orderTotal;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OrderDetail> orderDetails = new ArrayList<>();



    //Getters and setters
    public long getOrderId() {
        return orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateComplete() {
        return dateComplete;
    }

    public void setDateComplete(Date dateComplete) {
        this.dateComplete = dateComplete;
    }

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }

    public List<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }

    public BigDecimal getOrderTotal() {
        return orderTotal;
    }

    public void setOrderTotal(BigDecimal orderTotal) {
        this.orderTotal = orderTotal;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public com.gcsupplies.inventorymanagement.model.Orders.OrderStatus getStatus() {
        return status;
    }

    public void setStatus(com.gcsupplies.inventorymanagement.model.Orders.OrderStatus status) {
        this.status = status;
    }
}


