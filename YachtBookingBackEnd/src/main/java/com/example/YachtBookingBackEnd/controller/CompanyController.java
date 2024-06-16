package com.example.YachtBookingBackEnd.controller;

import com.example.YachtBookingBackEnd.payload.response.DataResponse;
import com.example.YachtBookingBackEnd.service.implement.IFile;
import com.example.YachtBookingBackEnd.service.implement.IYacht;
import com.example.YachtBookingBackEnd.service.implement.IYachtImage;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import com.example.YachtBookingBackEnd.service.implement.ICompany;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CompanyController {
    IYacht iYacht;
    IFile iFile;
    IYachtImage iYachtImage;
    ICompany iCompany;

    @GetMapping("/allYacht")
    public ResponseEntity<?> viewYacht() {
//        SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//        String enscrypted = Encoders.BASE64.encode(secretKey.getEncoded());
//        System.out.println(enscrypted);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.getAllYacht());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/file/{filename:.+}")
    public ResponseEntity<?> getFile(@PathVariable String filename) {
        Resource resource = iFile.load(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"").body(resource);
    }
    @PostMapping("/yacht/insertYacht/{idCompany}")
    public ResponseEntity<?> insertYacht(@RequestParam String name,
                                         @RequestParam MultipartFile image,
                                         @RequestParam LocalDate launch,
                                         @RequestParam String hullBody,
                                         @RequestParam String description,
                                         @RequestParam String rule,
                                         @RequestParam String itinerary,
                                         @RequestParam String idYachtType,
                                         @RequestParam String idLocation,
                                         @PathVariable String idCompany ) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.insertYacht(name, image, launch, hullBody, description, rule, itinerary, idYachtType, idLocation, idCompany));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PostMapping("/yacht/updateYacht/{yachtId}")
    public ResponseEntity<?> updateYacht(@PathVariable String yachtId,
                                         @RequestParam String name,
                                         @RequestParam MultipartFile image,
                                         @RequestParam String hullBody,
                                         @RequestParam String description,
                                         @RequestParam String rule,
                                         @RequestParam String itinerary,
                                         @RequestParam String idYachtType,
                                         @RequestParam String idLocation) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.updateYacht(yachtId, name, image, hullBody, description, rule, itinerary, idYachtType, idLocation));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/yacht/delete/{id}")
    public ResponseEntity<?> deleteYacht(@PathVariable String id) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.deleteYacht(id));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/yacht/findByCompany/{companyId}")
    public ResponseEntity<?> findByCompany(@PathVariable String companyId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.findYachtByCompanyId(companyId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/yacht/image/{yachtId}")
    public ResponseEntity<?> getImageByYacht(@PathVariable String yachtId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtImage.getImageByYacht(yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PostMapping("/yacht/addImage/{yachtId}")
    public ResponseEntity<?> getImageByYacht(@PathVariable String yachtId, @RequestParam MultipartFile image) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtImage.addImage(image, yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/yacht/deleteImage/{imageId}")
    public ResponseEntity<?> deleteYachtImageById(@PathVariable String imageId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtImage.deleteImage(imageId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PostMapping("/profile")
    public ResponseEntity<?> addInfoCompany(@RequestParam String idAccount,
                                            @RequestParam String name,
                                            @RequestParam String address,
                                            @RequestParam MultipartFile logo,
                                            @RequestParam String email) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCompany.addCompany(idAccount, name, address, logo, email));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/updateProfile/{companyId}")
    public ResponseEntity<?> updateCompany(@PathVariable String companyId,
                                           @RequestParam String name,
                                           @RequestParam String address,
                                           @RequestParam MultipartFile logo,
                                           @RequestParam String email){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCompany.updateCompany(companyId, name, address, logo, email));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/feedBackByIdCompany/{companyId}")
    public ResponseEntity<?> getFeedbackByIdCompany(@PathVariable String companyId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCompany.getFeedbacksByCompanyId(companyId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
