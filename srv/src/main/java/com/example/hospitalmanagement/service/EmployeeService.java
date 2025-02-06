

package com.example.hospitalmanagement.service;

import com.example.hospitalmanagement.dao.EmployeeDAO;
import com.example.hospitalmanagement.model.Employee;
import com.example.hospitalmanagement.model.Searchemp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeDAO employeeDAO;

    public List<Employee> getAllEmployees() {
        return employeeDAO.getAllEmployees();
    }
   
    public List<Employee> filterEmployees(Searchemp searchCriteria) {
        return employeeDAO.filterEmployees(searchCriteria);
    }
    
    public Employee getEmployeeById(int id) {
        return employeeDAO.getEmployeeById(id);
    }

    public void createEmployee(Employee employee) {
        employeeDAO.createEmployee(employee);
    }

    public void updateEmployee(Employee employee) {
        employeeDAO.updateEmployee(employee);
    }

    public void deleteEmployee(int id) {
        employeeDAO.deleteEmployee(id);
    }
}
