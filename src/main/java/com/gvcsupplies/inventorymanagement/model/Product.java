package com.gvcsupplies.inventorymanagement.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table (name = "product")
public class Product {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "product_name")
    private String productName;

    @Column (name = "product_description")
    private String productDescription;

    @Column (name = "quantity")
    private int quantity;

    @Column (name = "price")
    private BigDecimal price;

    //test
    public Product(){

    }

    public Product(String productName, String productDescription, int quantity, BigDecimal price) {
        this.productName = productName;
        this.productDescription = productDescription;
        this.quantity = quantity;
        this.price = price;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
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
