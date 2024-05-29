package com.example.firstDemoHihi.payload.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerCreationRequest {
    String fullName;
    String email;
    String phone;
    String address;
    String  idAccount;
}
