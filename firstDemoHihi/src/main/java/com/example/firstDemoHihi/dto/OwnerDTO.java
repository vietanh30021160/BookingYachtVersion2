package com.example.firstDemoHihi.dto;

import com.example.firstDemoHihi.entity.Company;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OwnerDTO {
    private String idOwner;
    private String name;
    private String email;
    private Company company;
}
