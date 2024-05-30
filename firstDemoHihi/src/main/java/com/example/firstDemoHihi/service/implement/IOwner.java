package com.example.firstDemoHihi.service.implement;

import com.example.firstDemoHihi.dto.OwnerDTO;
import com.example.firstDemoHihi.dto.YachtDTO;
import com.example.firstDemoHihi.payload.request.OwnerRequest;

import java.util.List;

public interface IOwner {
    List<OwnerDTO> getAllOwner();
    boolean insertOwner(OwnerRequest ownerRequest);
    boolean hiddenOwner(String id);
    List<YachtDTO> getYachtByOwner(String ownerId);
}
