package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.ServiceDTO;
import com.example.YachtBookingBackEnd.dto.YachtDTO;
import com.example.YachtBookingBackEnd.entity.Yacht;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface IYacht {
    List<YachtDTO> getAllYacht();
    boolean insertYacht(String name, MultipartFile image, LocalDate launch, String hullBody, String description, String rule, String itinerary,String idCompany, String idYachtType, String idLocation);
    boolean deleteYacht(String id);
    boolean updateYacht(String yachtId, String name, MultipartFile image, String hullBody, String description, String rule, String itinerary, String idYachtType, String idLocation);
    List<YachtDTO> findYachtByCompanyId(String companyId);
    YachtDTO findYachtById(String id);

}

