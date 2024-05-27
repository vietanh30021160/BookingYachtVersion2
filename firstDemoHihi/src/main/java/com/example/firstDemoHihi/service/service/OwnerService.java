package com.example.firstDemoHihi.service.service;

import com.example.firstDemoHihi.dto.OwnerDTO;
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



    @Override
    public List<OwnerDTO> getAllOwner() {
        List<OwnerDTO> ownerDTOList = new ArrayList<OwnerDTO>();
        try{
            List<Owner> ownerList = ownerRepository.findAll();
            for (Owner owner : ownerList) {
                OwnerDTO ownerDTO = new OwnerDTO();
                ownerDTO.setIdOwner(owner.getIdOwner());
                ownerDTO.setName(owner.getName());
                ownerDTO.setEmail(owner.getEmail());
                ownerDTOList.add(ownerDTO);
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return ownerDTOList;
    }



//    @Override
//    public boolean deleteOwner(String idOwner) {
//        try{
//            Optional<Owner> owner = ownerRepository.findById(idOwner);
//            if(owner.isPresent()){
//                System.out.println("owner" + owner.get());
//                Optional<Yacht> yacht = yachtRepository.findByOwnerId(idOwner);
//                if(yacht.isPresent()){
//                    System.out.println("yacht" + yacht.get());
//                    Optional<YachtDetail> yachtDetail = yachtDetailRepository.findByYachtId(yacht.get().getIdYacht());
//                    if(yachtDetail.isPresent()){
//                        System.out.println("yachtDetail" + yachtDetail.get());
//                        Optional<Feedback> feedback = feedbackRepository.findByYachtDetailsId(yachtDetail.get().getIdYachtDetail());
//                        Optional<ImageYachtDetail> imageYachtDetail = imageYachDetailRepository.findImageYachtDetailByYachtDetailsId(yachtDetail.get().getIdYachtDetail());
//                        Optional<YachtDetailService> yachtDetailService = yachtDetailServiceRepository.findByYachtDetailsId(yachtDetail.get().getIdYachtDetail());
//                    }else{
//                        System.out.println("kh ton tai yacht detail");
//                    }
//                }else{
//                    System.out.println("kh ton tai yacht");
//                }
//            }else{
//                System.out.println("kh ton tai owner");
//                return false;
//            }
//        }catch (Exception e){
//            System.out.println(e.getMessage());
//        }
//        return true;
//    }

    @Override
    public boolean insertOwner(OwnerRequest ownerRequest) {
        try{
            Owner owner = new Owner();
            owner.setName(ownerRequest.getName());
            owner.setEmail(ownerRequest.getEmail());

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

}
