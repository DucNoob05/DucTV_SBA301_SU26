package com.example.employeemanagement.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.example.employeemanagement.pojos.Employee;

@Repository
public class EmployeeRepository implements IEmployeeRepository {

    private final List<Employee> employeeList = new ArrayList<>();

    public EmployeeRepository() {
        employeeList.add(new Employee("E001", "Nguyễn Văn A", "Kỹ sư", 1000));
        employeeList.add(new Employee("E002", "Trần Văn B", "Quản lý", 2000));
        employeeList.add(new Employee("E003", "Lê Văn C", "Kỹ sư", 1500));
        employeeList.add(new Employee("E004", "Phạm Văn D", "Nhân viên", 500));
        employeeList.add(new Employee("E005", "Hoàng Văn E", "Quản lý", 2500));
    }

    @Override
    public List<Employee> getAllEmployees() {
        return new ArrayList<>(employeeList);
    }

    @Override
    public Employee getEmployeeById(String empId) {
        return employeeList.stream()
                .filter(e -> e.getEmpId().equals(empId))
                .findFirst()
                .orElse(null);
    }

    @Override
    public Employee create(Employee employee) {
        employeeList.add(employee);
        return employee;
    }

    @Override
    public Employee delete(int id) {
        if (id >= 0 && id < employeeList.size()) {
            return employeeList.remove(id);
        }
        return null;
    }

    @Override
    public Employee update(String empId, Employee employee) {
        Employee existing = getEmployeeById(empId);
        if (existing != null) {
            existing.setName(employee.getName());
            existing.setDesignation(employee.getDesignation());
            existing.setSalary(employee.getSalary());
            return existing;
        }
        return null;
    }

    @Override
    public List<Employee> search(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return new ArrayList<>(employeeList);
        }
        String lowerKeyword = keyword.toLowerCase();
        return employeeList.stream()
                .filter(e -> (e.getName() != null && e.getName().toLowerCase().contains(lowerKeyword))
                        || (e.getDesignation() != null && e.getDesignation().toLowerCase().contains(lowerKeyword)))
                .collect(Collectors.toList());
    }

    @Override
    public Page<Employee> findAll(Pageable pageable) {
        List<Employee> listToPage = employeeList;
        if (pageable.getSort() != null && pageable.getSort().isSorted()) {
            listToPage = findAll(pageable.getSort());
        }
        int start = (int) pageable.getOffset();
        if (start > listToPage.size()) {
            return new PageImpl<>(new ArrayList<>(), pageable, listToPage.size());
        }
        int end = Math.min((start + pageable.getPageSize()), listToPage.size());

        List<Employee> pageContent = listToPage.subList(start, end);
        return new PageImpl<>(pageContent, pageable, listToPage.size());
    }

    @Override
    public List<Employee> findAll(Sort sort) {
        List<Employee> sortedList = new ArrayList<>(employeeList);
        if (sort == null || sort.isUnsorted()) {
            return sortedList;
        }
        Sort.Order order = sort.iterator().next();
        String property = order.getProperty();
        boolean ascending = order.isAscending();

        sortedList.sort((e1, e2) -> {
            if ("empId".equals(property)) {
                return ascending ? e1.getEmpId().compareTo(e2.getEmpId()) : e2.getEmpId().compareTo(e1.getEmpId());
            } else if ("name".equals(property)) {
                return ascending ? e1.getName().compareTo(e2.getName()) : e2.getName().compareTo(e1.getName());
            } else if ("designation".equals(property)) {
                return ascending ? e1.getDesignation().compareTo(e2.getDesignation()) : e2.getDesignation().compareTo(e1.getDesignation());
            } else if ("salary".equals(property)) {
                return ascending ? Double.compare(e1.getSalary(), e2.getSalary()) : Double.compare(e2.getSalary(), e1.getSalary());
            }
            return 0;
        });
        return sortedList;
    }
}
