package com.example.hospitalmanagement.model;
import org.springframework.stereotype.Component;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Temporal;
import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
public class Searchemp {
    private String name;
    private String designation;
    private Integer status;  // Changed to Integer to allow null
    private Boolean showAll;
    private Integer pageNumber = 0;
    private Integer pageSize = 0;
}