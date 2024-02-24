package com.gvcsupplies.inventorymanagement.repository;

import com.gvcsupplies.inventorymanagement.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {

}
