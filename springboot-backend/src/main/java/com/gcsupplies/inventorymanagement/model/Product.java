package com.gcsupplies.inventorymanagement.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.*;

@Entity
@Table (name = "product")
public class Product {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long productId;

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

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails = new ArrayList<>();

    //test
    public Product(){

    }

    public Product(String productName, String productDescription, int quantityAvailable, int quantityPending, BigDecimal price) {
        this.productName = productName;
        this.productDescription = productDescription;
        this.quantityAvailable = quantityAvailable;
        this.quantityPending = quantityPending;
        this.price = price;
    }

    public long getProductId() {
        return productId;
    }

    public void setProductId(long id) {
        this.productId = productId;
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
