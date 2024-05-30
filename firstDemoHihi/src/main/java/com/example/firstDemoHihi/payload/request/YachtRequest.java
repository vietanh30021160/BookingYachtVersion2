package com.example.firstDemoHihi.payload.request;

import com.example.firstDemoHihi.entity.Location;
import com.example.firstDemoHihi.entity.Owner;
import com.example.firstDemoHihi.entity.YachtType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class YachtRequest {
    private String id;
    private String name;
    private String image;
    private long price;
    private String idOwner;
    private String idYachtType;
    private String idLocation;
}
