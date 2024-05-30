package com.example.firstDemoHihi.service.service;

import com.example.firstDemoHihi.dto.OwnerDTO;
import com.example.firstDemoHihi.dto.YachtDTO;
import com.example.firstDemoHihi.entity.*;
import com.example.firstDemoHihi.entity.YachtDetailService;
import com.example.firstDemoHihi.payload.request.OwnerRequest;
import com.example.firstDemoHihi.repository.*;
import com.example.firstDemoHihi.service.implement.IOwner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OwnerService implements IOwner {
    @Autowired
    OwnerRepository ownerRepository;
    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    YachtRepository yachtRepository;

    @Override
    public List<OwnerDTO> getAllOwner() {
        List<OwnerDTO> ownerDTOList = new ArrayList<OwnerDTO>();
        try{
            List<Owner> ownerList = ownerRepository.findAll();
            for (Owner owner : ownerList) {
                OwnerDTO ownerDTO = new OwnerDTO();
                if(owner.getExist() == 1){
                    ownerDTO.setIdOwner(owner.getIdOwner());
                    ownerDTO.setName(owner.getName());
                    ownerDTO.setEmail(owner.getEmail());
                    ownerDTOList.add(ownerDTO);
                }
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return ownerDTOList;
    }


    @Override
    public boolean insertOwner(OwnerRequest ownerRequest) {
        try{
            Owner owner = new Owner();
            owner.setName(ownerRequest.getName());
            owner.setEmail(ownerRequest.getEmail());
            owner.setExist(1);

            Optional<Company> company = companyRepository.findById(ownerRequest.getIdCompany());
            if(company.isPresent()){
                owner.setCompany(company.get());
            }else{
                return false;
            }
            ownerRepository.save(owner);
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return false;
    }

    @Override
    public boolean hiddenOwner(String id) {
        try{
            Optional<Owner> owner = ownerRepository.findById(id);
            if(owner.isPresent()){
                Owner existingOwner = owner.get();
                existingOwner.setExist(0);
                ownerRepository.save(existingOwner);
                return true;
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return false;
    }

    @Override
    public List<YachtDTO> getYachtByOwner(String ownerId) {
        return List.of();
    }




}
