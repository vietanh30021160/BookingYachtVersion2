package com.example.firstDemoHihi.service.service;

import com.example.firstDemoHihi.dto.LocationDTO;
import com.example.firstDemoHihi.dto.OwnerDTO;
import com.example.firstDemoHihi.dto.YachtDTO;
import com.example.firstDemoHihi.dto.YachtTypeDTO;
import com.example.firstDemoHihi.entity.Location;
import com.example.firstDemoHihi.entity.Owner;
import com.example.firstDemoHihi.entity.Yacht;
import com.example.firstDemoHihi.entity.YachtType;
import com.example.firstDemoHihi.payload.request.YachtRequest;
import com.example.firstDemoHihi.repository.LocationRepository;
import com.example.firstDemoHihi.repository.OwnerRepository;
import com.example.firstDemoHihi.repository.YachtRepository;
import com.example.firstDemoHihi.repository.YachtTypeRepository;
import com.example.firstDemoHihi.service.implement.IYacht;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.OffsetScrollPositionHandlerMethodArgumentResolver;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class YachtService implements IYacht {
    @Autowired
    YachtRepository yachtRepository;

    @Autowired
    OwnerRepository ownerRepository;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    YachtTypeRepository yachtTypeRepository;
    @Autowired
    private OffsetScrollPositionHandlerMethodArgumentResolver offsetResolver;

    @Override
    public List<YachtDTO> getAllYacht() {
        List<YachtDTO> listYacht = new ArrayList<>();
        try{
            List<Yacht> yachtList = yachtRepository.findAll();
            System.out.println(yachtList);
            for (Yacht yacht : yachtList) {
                YachtDTO yachtDTO = new YachtDTO();
                if(yacht.getExist() == 1) {
                    yachtDTO.setIdYacht(yacht.getIdYacht());
                    yachtDTO.setName(yacht.getName());
                    yachtDTO.setImage(yacht.getImage());
                    yachtDTO.setPrice(yacht.getPrice());

                    YachtTypeDTO yachtTypeDTO = new YachtTypeDTO();
                    yachtTypeDTO.setIdYachtType(yacht.getYachtType().getIdYachtType());
                    yachtTypeDTO.setStarRanking(yacht.getYachtType().getStarRanking());

                    yachtDTO.setYachtTypeDTO(yachtTypeDTO);

                    OwnerDTO ownerDTO = new OwnerDTO();
                    ownerDTO.setIdOwner(yacht.getOwner().getIdOwner());
                    ownerDTO.setName(yacht.getOwner().getName());
                    ownerDTO.setEmail(yacht.getOwner().getEmail());

                    yachtDTO.setOwnerDTO(ownerDTO);

                    LocationDTO locationDTO = new LocationDTO();
                    locationDTO.setName(yacht.getLocation().getName());
                    locationDTO.setIdLocation(yacht.getLocation().getIdLocation());

                    yachtDTO.setLocationDTO(locationDTO);

                    listYacht.add(yachtDTO);
                }

            }
        }catch (Exception e){
            System.out.println("YachtDTO " + e.getMessage());
        }
        System.out.println(listYacht);
        return listYacht;
    }

    @Override
    public boolean insertYacht(YachtRequest yachtRequest) {
        try{
            Yacht yacht = new Yacht();

            yacht.setName(yachtRequest.getName());
            yacht.setImage(yachtRequest.getImage());
            yacht.setPrice(yachtRequest.getPrice());
            yacht.setExist(1);

            Optional<Owner> owner = ownerRepository.findById(yachtRequest.getIdOwner());
            if (owner.isPresent()) {
                yacht.setOwner(owner.get());
            } else {
                return false;
            }

            Optional<YachtType> yachtType = yachtTypeRepository.findById(yachtRequest.getIdYachtType());
            if (yachtType.isPresent()) {
                yacht.setYachtType(yachtType.get());
            } else {
                return false;
            }

            Optional<Location> location = locationRepository.findById(yachtRequest.getIdLocation());
            if (location.isPresent()) {
                yacht.setLocation(location.get());
            } else {
                return false;
            }

            yachtRepository.save(yacht);

            return true;
        }catch (Exception e){
            System.out.println("insertYacht " + e.getMessage());
        }
        return false;
    }

    @Override
    public boolean hiddenYacht(String id) {
        try{
            Optional<Yacht> yacht = yachtRepository.findById(id);
            if (yacht.isPresent()) {
                Yacht existingYacht = yacht.get();
                existingYacht.setExist(0);
                yachtRepository.save(existingYacht);
                return true;
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return false;
    }

    @Override
    public boolean updateYacht(YachtRequest yachtRequest) {
        return false;
    }

    @Override
    public List<YachtDTO> findYachtByOwnerId(String ownerId) {
        List<YachtDTO> yachtDTOList = new ArrayList<>();
        try{
            List<Yacht> yachtList = yachtRepository.findAllByOwnerId(ownerId);
            if(yachtList != null) {
                for(Yacht yacht : yachtList){
                    YachtDTO yachtDTO = new YachtDTO();
                    yachtDTO.setIdYacht(yacht.getIdYacht());
                    yachtDTO.setName(yacht.getName());
                    yachtDTO.setImage(yacht.getImage());
                    yachtDTO.setPrice(yacht.getPrice());
                    yachtDTO.setExist(yacht.getExist());

                    LocationDTO locationDTO = new LocationDTO();
                    locationDTO.setName(yacht.getLocation().getName());
                    locationDTO.setIdLocation(yacht.getLocation().getIdLocation());

                    yachtDTO.setLocationDTO(locationDTO);

                    YachtTypeDTO yachtTypeDTO = new YachtTypeDTO();
                    yachtTypeDTO.setIdYachtType(yacht.getYachtType().getIdYachtType());
                    yachtTypeDTO.setStarRanking(yacht.getYachtType().getStarRanking());

                    yachtDTO.setYachtTypeDTO(yachtTypeDTO);

                    yachtDTOList.add(yachtDTO);
                }
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return yachtDTOList;
    }


}
