package com.example.firstDemoHihi.dto;

import lombok.*;

@Data
@Builder
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
}
