package com.gcsupplies.inventorymanagement.repository;

import com.gcsupplies.inventorymanagement.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long>  {
}
