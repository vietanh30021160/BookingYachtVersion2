package com.example.YachtBookingBackEnd.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDTO {
    private String idCompany;
    private String name;
    private String address;
    private String logo;
    private String email;
    private int exist;
    private AccountDTO accountDTO;
}
