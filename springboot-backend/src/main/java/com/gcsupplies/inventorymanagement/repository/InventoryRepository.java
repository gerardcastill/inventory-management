package com.gcsupplies.inventorymanagement.repository;

import com.gcsupplies.inventorymanagement.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<Product, Long> {

}
