package com.example.firstDemoHihi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class YachtRequest {
    private String name;
    private String image;
    private long price;
    private String idCompany;
    private String idYachtType;
    private String idLocation;
}
