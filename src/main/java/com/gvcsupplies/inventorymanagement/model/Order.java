package com.gvcsupplies.inventorymanagement.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table (name = "order")
public class Order {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    // Join table that has list of products attached to an order_id
    @ManyToMany
    @JoinTable (
            name = "order_product",
            joinColumns = @JoinColumn (name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;

}
