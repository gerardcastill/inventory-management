package com.gvcsupplies.inventorymanagement.model;

import jakarta.persistence.*;

@Entity
@Table (name = "order")
public class Order {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;

}
