package com.example.firstDemoHihi.dto;

import com.example.firstDemoHihi.entity.Company;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OwnerDTO {
    private String idOwner;
    private String name;
    private String email;
    private Company company;
}
