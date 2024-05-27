package com.example.firstDemoHihi.dto;

import com.example.firstDemoHihi.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDTO {
    private String idCompany;
    private String name;
    private String address;
    private String logo;
    private String email;
    private Account account;
}
