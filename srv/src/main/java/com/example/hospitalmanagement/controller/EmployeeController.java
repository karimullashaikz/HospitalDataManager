

package com.example.hospitalmanagement.controller;

import com.example.hospitalmanagement.model.Employee;
import com.example.hospitalmanagement.model.Searchemp;
import com.example.hospitalmanagement.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }
    @PostMapping("/filter")
    public ResponseEntity<List<Employee>> filterEmployees(@RequestBody Searchemp searchCriteria) {
        List<Employee> filteredEmployees = employeeService.filterEmployees(searchCriteria);
        return ResponseEntity.ok(filteredEmployees);
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable int id) {
        return employeeService.getEmployeeById(id);
    }
    

    @PostMapping
    public ResponseEntity<String> addOrUpdateEmployee(@RequestBody Employee employee) {
        try {
            if (employee.getId() == 0) {
                // If no ID is provided, create a new employee
                employeeService.createEmployee(employee);
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body("Employee created successfully");
            } else {
                // If ID is provided, update existing employee
                employeeService.updateEmployee(employee);
                return ResponseEntity.ok("Employee updated successfully");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing employee: " + e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
public ResponseEntity<String> updateEmployee(@PathVariable int id, @RequestBody Employee employee) {
    try {
        employee.setId(id); // Ensure the ID is set correctly
        employeeService.updateEmployee(employee);
        return ResponseEntity.ok("Employee updated successfully");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error updating employee: " + e.getMessage());
    }
}

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable int id) {
        try {
            employeeService.deleteEmployee(id);
            return ResponseEntity.ok("Employee deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting employee: " + e.getMessage());
        }
    }
}