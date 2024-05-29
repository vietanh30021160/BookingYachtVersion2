package com.example.firstDemoHihi.payload.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerUpdateRequest {

    String fullName;
    String email;
    String phone;
    String address;

}
