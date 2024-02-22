package com.gvcsupplies.inventorymanagement.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table (name = "product")
public class Product {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;

    @Column (name = "item_name")
    private String itemName;

    @Column (name = "item_description")
    private String itemDescription;

    @Column (name = "quantity")
    private int quantity;

    @Column (name = "price")
    private BigDecimal price;

    //test
    public Product(){

    }

    public Product(String itemName, String itemDescription, int quantity, BigDecimal price) {
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.quantity = quantity;
        this.price = price;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
