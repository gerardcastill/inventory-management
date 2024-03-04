package com.gvcsupplies.inventorymanagement.controller;

import com.gvcsupplies.inventorymanagement.exception.ResourceNotFoundException;
import com.gvcsupplies.inventorymanagement.repository.StaffRepository;
import com.gvcsupplies.inventorymanagement.model.Staff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class StaffController {
    @Autowired
    private StaffRepository staffRepository;

    // get all staff in staff repository
    @GetMapping("/staff")
    public List<Staff> getAllStaff(){
        return staffRepository.findAll();
    }

    // post new staff to staff repository
    @PostMapping("/staff")
    public Staff createStaff(@RequestBody Staff staff){
        return staffRepository.save(staff);
    }

    // put an updated staff into staff repository given and id and staff object
    @PutMapping("/staff/{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable Long id, @RequestBody Staff staffDetails){
        Staff staff = staffRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Staff does not exist with id:" + id));

        staff.setFirstName(staffDetails.getFirstName());
        staff.setLastName(staffDetails.getLastName());
        staff.setEmailId(staffDetails.getEmailId());
        staff.setRoles((staffDetails.getRoles()));

        Staff updatedStaff = staffRepository.save(staff);
        return ResponseEntity.ok(updatedStaff);
    }

    // delete staff from staff repository given id
    @DeleteMapping("/staff/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteStaff(@PathVariable Long id){
        Staff staff = staffRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Staff does not exist with id:" + id));

        staffRepository.delete(staff);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
