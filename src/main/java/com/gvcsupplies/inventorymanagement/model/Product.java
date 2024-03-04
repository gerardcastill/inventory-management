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

    @Column (name = "quantity_available")
    private int quantityAvailable;

    @Column (name="quantity_pending")
    private int quantityPending;

    @Column (name = "price")
    private BigDecimal price;

    //test
    public Product(){

    }

    public Product(String productName, String productDescription, int quantity, BigDecimal price) {
        this.productName = productName;
        this.productDescription = productDescription;
        this.quantityAvailable = quantityAvailable;
        this.quantityPending = quantityPending;
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

    public int getQuantityAvailable() {
        return quantityAvailable;
    }

    public void setQuantityAvailable(int quantityAvailable) {
        this.quantityAvailable = quantityAvailable;
    }

    public int getQuantityPending(){
        return quantityPending;
    }

    public void setQuantityPending(int quantityPending){
        this.quantityPending = quantityPending;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
