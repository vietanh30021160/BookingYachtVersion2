package com.example.firstDemoHihi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class YachtDTO {
    private String idYacht;
    private String name;
    private String image;
    private long price;
    private OwnerDTO ownerDTO;
    private YachtTypeDTO yachtTypeDTO;
    private LocationDTO locationDTO;
    private int exist;

}
