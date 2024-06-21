package com.example.YachtBookingBackEnd.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private String idCustomer;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private AccountDTO accountDTO;
}