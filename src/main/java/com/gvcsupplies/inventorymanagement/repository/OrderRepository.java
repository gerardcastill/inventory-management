package com.gvcsupplies.inventorymanagement.repository;

import com.gvcsupplies.inventorymanagement.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>  {
}
