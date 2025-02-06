

package com.example.hospitalmanagement.dao;

import com.example.hospitalmanagement.model.Employee;
import com.example.hospitalmanagement.model.Searchemp;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmployeeDAO {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Employee> getAllEmployees() {
        try {
            StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GetAllEmployees", Employee.class);
            query.execute();
            return query.getResultList();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching all employees", e);
        }
    }
    
    public List<Employee> filterEmployees(Searchemp searchCriteria) {
        try {
            StoredProcedureQuery query = entityManager.createStoredProcedureQuery("FilterEmployees", Employee.class);
            
            // Register just the needed parameters
            query.registerStoredProcedureParameter("p_name", String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("p_designation", String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("p_status", Integer.class, ParameterMode.IN);
    
            // Set parameter values
            query.setParameter("p_name", searchCriteria.getName());
            query.setParameter("p_designation", searchCriteria.getDesignation());
            query.setParameter("p_status", searchCriteria.getStatus());
    
            query.execute();
            return query.getResultList();
        } catch (Exception e) {
            throw new RuntimeException("Error filtering employees", e);
        }
    }

    public Employee getEmployeeById(int id) {
        try {
            StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GETEMPLOYEEBYID", Employee.class);
            query.registerStoredProcedureParameter(1, Integer.class, ParameterMode.IN);
            query.setParameter(1, id);
            query.execute();

            List<Employee> result = query.getResultList();
            if (result.isEmpty()) {
                throw new NoResultException("Employee not found with ID: " + id);
            }
            return result.get(0);
        } catch (Exception e) {
            throw new RuntimeException("Error fetching employee by ID", e);
        }
    }

    public void createEmployee(Employee employee) {
        try {
            StoredProcedureQuery query = entityManager.createStoredProcedureQuery("CreateEmployee");
            query.registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter(2, String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter(3, String.class, ParameterMode.IN);

            query.setParameter(1, employee.getName());
            query.setParameter(2, employee.getDesignation());
            query.setParameter(3, employee.getStatus());

            query.execute();
        } catch (Exception e) {
            throw new RuntimeException("Error creating employee", e);
        }
    }

    public void updateEmployee(Employee employee) {
        try {
            StoredProcedureQuery query = entityManager.createStoredProcedureQuery("UpdateEmployee");
            query.registerStoredProcedureParameter(1, Integer.class, ParameterMode.IN);
            query.registerStoredProcedureParameter(2, String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter(3, String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter(4, String.class, ParameterMode.IN);

            query.setParameter(1, employee.getId());
            query.setParameter(2, employee.getName());
            query.setParameter(3, employee.getDesignation());
            query.setParameter(4, employee.getStatus());

            query.execute();
        } catch (Exception e) {
            throw new RuntimeException("Error updating employee", e);
        }
    }

    public void deleteEmployee(int id) {
        try {
            StoredProcedureQuery query = entityManager.createStoredProcedureQuery("DeleteEmployee");
            query.registerStoredProcedureParameter(1, Integer.class, ParameterMode.IN);
            query.setParameter(1, id);
            query.execute();
        } catch (Exception e) {
            throw new RuntimeException("Error deleting employee", e);
        }
    }
    
}
