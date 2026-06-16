package com.example.employeemanagement.services;

import java.util.List;
import org.springframework.data.domain.Page;
import com.example.employeemanagement.pojos.Employee;

public interface IEmployeeService {
    List<Employee> getAllEmployees();

    Employee getEmployeeById(String empId);

    Employee createEmployee(Employee employee);

    Employee deleteEmployee(int id);

    Employee updateEmployee(String empId, Employee employee);

    List<Employee> searchEmployees(String keyword);

    Page<Employee> getEmployeesWithPaging(int page, int size, String sortBy);
}
