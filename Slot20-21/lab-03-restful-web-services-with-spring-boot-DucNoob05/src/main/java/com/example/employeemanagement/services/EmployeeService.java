package com.example.employeemanagement.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.employeemanagement.exceptions.EmployeeNotFoundException;
import com.example.employeemanagement.pojos.Employee;
import com.example.employeemanagement.repositories.IEmployeeRepository;

@Service
public class EmployeeService implements IEmployeeService {

    private final IEmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(IEmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.getAllEmployees();
    }

    @Override
    public Employee getEmployeeById(String empId) {
        Employee employee = employeeRepository.getEmployeeById(empId);
        if (employee == null) {
            throw new EmployeeNotFoundException("Employee not found with id: " + empId);
        }
        return employee;
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.create(employee);
    }

    @Override
    public Employee deleteEmployee(int id) {
        Employee deleted = employeeRepository.delete(id);
        if (deleted == null) {
            throw new EmployeeNotFoundException("Employee not found with index: " + id);
        }
        return deleted;
    }

    @Override
    public Employee updateEmployee(String empId, Employee employee) {
        Employee updated = employeeRepository.update(empId, employee);
        if (updated == null) {
            throw new EmployeeNotFoundException("Employee not found with id: " + empId);
        }
        return updated;
    }

    @Override
    public List<Employee> searchEmployees(String keyword) {
        return employeeRepository.search(keyword);
    }

    @Override
    public Page<Employee> getEmployeesWithPaging(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return employeeRepository.findAll(pageable);
    }
}
