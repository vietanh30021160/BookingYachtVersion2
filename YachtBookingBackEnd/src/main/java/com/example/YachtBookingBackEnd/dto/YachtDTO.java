package com.example.YachtBookingBackEnd.dto;

import com.example.YachtBookingBackEnd.entity.Company;
import com.example.YachtBookingBackEnd.entity.Location;
import com.example.YachtBookingBackEnd.entity.YachtService;
import com.example.YachtBookingBackEnd.entity.YachtType;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class YachtDTO {
    private String idYacht;
    private String name;
    private String image;
    private LocalDate launch;
    private String hullBody;
    private String description;
    private String rule;
    private String itinerary;
    private int exist;
    private YachtTypeDTO yachtType;
    private CompanyDTO company;
    private LocationDTO location;
    private Set<ServiceDTO> yachtServiceSet;
}
