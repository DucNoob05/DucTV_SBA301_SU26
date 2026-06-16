package com.example.employeemanagement.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.example.employeemanagement.pojos.Employee;

@Repository
public interface IEmployeeRepository {
    List<Employee> getAllEmployees();

    Employee getEmployeeById(String empId);

    Employee create(Employee employee);

    Employee delete(int id);

    Employee update(String empId, Employee employee);

    List<Employee> search(String keyword);

    Page<Employee> findAll(Pageable pageable);

    List<Employee> findAll(Sort sort);
}
