package com.example.firstDemoHihi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AcountDTO {
    private String idAccount;
    private String username;
    private String password;
    private String role;
}
