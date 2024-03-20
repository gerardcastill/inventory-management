package com.gcsupplies.inventorymanagement.repository;

import com.gcsupplies.inventorymanagement.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

}
