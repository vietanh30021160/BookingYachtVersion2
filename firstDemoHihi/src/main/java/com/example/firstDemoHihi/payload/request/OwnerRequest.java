package com.example.firstDemoHihi.payload.request;

import com.example.firstDemoHihi.entity.Company;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OwnerRequest {
    private String idOwner;
    private String name;
    private String email;
    private String idCompany;

}
