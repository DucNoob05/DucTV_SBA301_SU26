package com.example.employeemanagement.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.employeemanagement.pojos.Employee;
import com.example.employeemanagement.services.IEmployeeService;

@RestController
@RequestMapping("/api/employees")
@Tag(name = "Employee Management", description = "APIs for managing employee records, supporting CRUD, pagination, and sorting")
public class EmployeeController {

    private final IEmployeeService employeeService;

    @Autowired
    public EmployeeController(IEmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    @Operation(summary = "Get list of employees", description = "Retrieve a list of employees with pagination and sorting support")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Successfully retrieved the list")
    })
    public ResponseEntity<com.example.employeemanagement.pojos.ApiResponse<Page<Employee>>> getEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "empId") String sortBy) {
        Page<Employee> employees = employeeService.getEmployeesWithPaging(page, size, sortBy);
        com.example.employeemanagement.pojos.ApiResponse<Page<Employee>> response = new com.example.employeemanagement.pojos.ApiResponse<>(
                true, "Employees retrieved successfully", employees, java.time.LocalDateTime.now()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{empId}")
    @Operation(summary = "Get employee by ID", description = "Retrieve details of a specific employee using their unique ID")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Successfully retrieved the employee details"),
        @ApiResponse(responseCode = "404", description = "Employee not found")
    })
    public ResponseEntity<com.example.employeemanagement.pojos.ApiResponse<Employee>> getEmployeeById(@PathVariable String empId) {
        Employee employee = employeeService.getEmployeeById(empId);
        com.example.employeemanagement.pojos.ApiResponse<Employee> response = new com.example.employeemanagement.pojos.ApiResponse<>(
                true, "Employee retrieved successfully", employee, java.time.LocalDateTime.now()
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @Operation(summary = "Create a new employee", description = "Add a new employee record to the system")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Successfully created the employee"),
        @ApiResponse(responseCode = "400", description = "Invalid input payload")
    })
    public ResponseEntity<com.example.employeemanagement.pojos.ApiResponse<Employee>> createEmployee(@Valid @RequestBody Employee employee) {
        Employee created = employeeService.createEmployee(employee);
        com.example.employeemanagement.pojos.ApiResponse<Employee> response = new com.example.employeemanagement.pojos.ApiResponse<>(
                true, "Employee created successfully", created, java.time.LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete employee by index", description = "Remove an employee record from the list by their list index")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Successfully deleted the employee"),
        @ApiResponse(responseCode = "404", description = "Employee index out of bounds")
    })
    public ResponseEntity<com.example.employeemanagement.pojos.ApiResponse<Employee>> deleteEmployee(@PathVariable int id) {
        Employee deleted = employeeService.deleteEmployee(id);
        com.example.employeemanagement.pojos.ApiResponse<Employee> response = new com.example.employeemanagement.pojos.ApiResponse<>(
                true, "Employee deleted successfully", deleted, java.time.LocalDateTime.now()
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{empId}")
    @Operation(summary = "Update employee by ID", description = "Modify details of an existing employee using their unique ID")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Successfully updated the employee"),
        @ApiResponse(responseCode = "400", description = "Invalid input payload"),
        @ApiResponse(responseCode = "404", description = "Employee not found")
    })
    public ResponseEntity<com.example.employeemanagement.pojos.ApiResponse<Employee>> updateEmployee(@PathVariable String empId, @Valid @RequestBody Employee employee) {
        Employee updated = employeeService.updateEmployee(empId, employee);
        com.example.employeemanagement.pojos.ApiResponse<Employee> response = new com.example.employeemanagement.pojos.ApiResponse<>(
                true, "Employee updated successfully", updated, java.time.LocalDateTime.now()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    @Operation(summary = "Search employees by keyword", description = "Search employees case-insensitively by name or designation using a keyword")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Successfully retrieved the matching employees list")
    })
    public ResponseEntity<com.example.employeemanagement.pojos.ApiResponse<List<Employee>>> searchEmployees(@RequestParam String keyword) {
        List<Employee> results = employeeService.searchEmployees(keyword);
        com.example.employeemanagement.pojos.ApiResponse<List<Employee>> response = new com.example.employeemanagement.pojos.ApiResponse<>(
                true, "Employees matching keyword retrieved successfully", results, java.time.LocalDateTime.now()
        );
        return ResponseEntity.ok(response);
    }
}
