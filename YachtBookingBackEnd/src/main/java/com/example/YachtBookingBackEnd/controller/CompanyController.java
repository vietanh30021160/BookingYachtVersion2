package com.example.YachtBookingBackEnd.controller;

import com.example.YachtBookingBackEnd.payload.response.DataResponse;
import com.example.YachtBookingBackEnd.service.implement.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.LocalDate;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CompanyController {
    IYacht iYacht;
    IBookingOrder iBookingOrder;
    IFile iFile;
    IYachtImage iYachtImage;
    IService iService;
    IYachtService iYachtService;
    ICompany iCompany;
    IRoomImage iRoomImage;
    IRoomType iRoomType;
    IRoom iRoom;
    IPayment iPayment;
    ISchedule iSchedule;
    IYachtSchedule iYachtSchedule;
    IYachtType iYachtType;
    ILocation ilocation;

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


    @PostMapping("/room/addRoom")
    public ResponseEntity<?> addRoom(@RequestParam String roomName,
                                     @RequestParam double area,
                                     @RequestParam String description,
                                     @RequestParam String idRoomType,
                                     @RequestParam MultipartFile avatar,
                                     @RequestParam String idYacht
                                     ){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoom.addRoom(roomName, area, description, idRoomType, idYacht, avatar));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PutMapping("/yacht/updateYacht/{yachtId}")
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

    @PutMapping("/room/updateRoom/{roomId}")
    public ResponseEntity<?> updateRoom(@PathVariable String roomId,
                                        @RequestParam String description,
                                        @RequestParam MultipartFile avatar,
                                        @RequestParam int available){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoom.updateRoom(roomId, description, available, avatar));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @DeleteMapping("/yacht/delete/{id}")
    public ResponseEntity<?> deleteYacht(@PathVariable String id) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.deleteYacht(id));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/yacht/findByCompany/{companyId}")
    public ResponseEntity<?> findYachtByCompany(@PathVariable String companyId) {
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
    public ResponseEntity<?> insertImageForYacht(@PathVariable String yachtId, @RequestParam MultipartFile image) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtImage.addImage(image, yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }


    @DeleteMapping("/yacht/deleteImage/{imageId}")
    public ResponseEntity<?> deleteYachtImageById(@PathVariable String imageId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtImage.deleteImage(imageId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/profile/{idCompany}")
    public ResponseEntity<?> updateInfoCompany(@PathVariable String idCompany,
                                           @RequestParam String name,
                                           @RequestParam String address,
                                           @RequestParam MultipartFile logo){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCompany.updateInfoCompany(idCompany, name, address, logo));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    /* ===BookingOrder management=== */

    @GetMapping("/bookingOrders/{idCompany}")
    public ResponseEntity<?> getAllBookingsByCompany(@PathVariable String idCompany) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iBookingOrder.getAllBookingsByCompanyId(idCompany));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmVnPayPayment(@RequestParam String idBookingOrder) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iBookingOrder.confirmBooking(idBookingOrder));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/cancel")
    public ResponseEntity<?> cancelVnPayPayment(@RequestParam String idBookingOrder) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iBookingOrder.cancelBooking(idBookingOrder));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/bookingOrders/range/{idCompany}")
    public ResponseEntity<?> GetBookingsByPrice(@PathVariable String idCompany,
                                                @RequestParam(required = false) Long min,
                                                @RequestParam(required = false) Long max) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iBookingOrder.getBookingOrderByPrice(idCompany, min, max));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    /* ===End BookingOrder management=== */

    @PutMapping("/yacht/updateImage/{imageId}")
    public ResponseEntity<?>updateYachtImage(@PathVariable String imageId, @RequestParam MultipartFile image){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtImage.updateImage(image, imageId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getAllService")
    public ResponseEntity<?> getAllService() {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iService.getAllService());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getServiceByYacht/{yachtId}")
    public ResponseEntity<?> getServiceByYacht(@PathVariable String yachtId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iService.getAllServiceByYacht(yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/addServiceForYacht/{yachtId}")
    public ResponseEntity<?> addServiceForYacht(@PathVariable String yachtId,
                                                @RequestParam String service,
                                                @RequestParam long price) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtService.addYachtService(yachtId, service, price));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @DeleteMapping("/deleteYachtService/{yachtId}/{serviceId}")
    public ResponseEntity<?> deleteYachtService(@PathVariable String yachtId,
                                                @PathVariable String serviceId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtService.deleteYachtService(yachtId, serviceId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/updateYachtService/{yachtId}/{serviceId}")
    public ResponseEntity<?> updateYachtService(@PathVariable String yachtId,
                                                @PathVariable String serviceId,
                                                @RequestParam String service,
                                                @RequestParam long price) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtService.updateYachtService(yachtId, serviceId, service, price));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/findYachtById/{yachtId}")
    public ResponseEntity<?> findYachtByYachtId(@PathVariable String yachtId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.findYachtById(yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping ("/room/getAllRoom")
    public ResponseEntity<?> getAllRoom(){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoom.getAllRoom());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/room/getRoom/{roomId}")
    public ResponseEntity<?> getRoomByID(@PathVariable String roomId){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoom.getRoomByID(roomId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/roomImage/insertImage/{roomId}")
    public ResponseEntity<?> insertRoomImage(@PathVariable ("roomId") String roomId,
                                             @RequestParam MultipartFile  image){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoomImage.insertRoomImages(roomId, image));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/roomImage/updateImage/{imageId}")
    public ResponseEntity<?> updateRoomImage(@PathVariable ("imageId") String imageId,
                                             @RequestParam MultipartFile  image){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoomImage.updateRoomImage(imageId, image));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @DeleteMapping("/roomImage/deleteImage/{imageId}")
    public ResponseEntity<?> deleteRoomImage(@PathVariable ("imageId") String imageId){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoomImage.deleteRoomImage(imageId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/roomType/getAllRoomType")
    public ResponseEntity<?>getAllRoomType(){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoomType.getAllRoomType());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/roomType/addRoomType")
    public ResponseEntity<?> addRoomType(@RequestParam long price,
                                         @RequestParam String type,
                                         @RequestParam String utilities){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoomType.addRoomType(type, price, utilities));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/roomType/updateRoomType/{roomTypeId}")
    public ResponseEntity<?> updateRoomType(@PathVariable ("roomTypeId")String roomTypeId
            ,@RequestParam long price,
                                         @RequestParam String type,
                                         @RequestParam String utilities){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoomType.updateRoomType(roomTypeId,type, price, utilities));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @DeleteMapping("/roomType/deleteRoomType/{roomTypeId}")
    public ResponseEntity<?> deleteRoomType(@PathVariable ("roomTypeId") String roomTypeId){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoomType.deleteRoomType(roomTypeId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/feedBackByIdCompany/{companyId}")
    public ResponseEntity<?> getFeedbackByIdCompany(@PathVariable String companyId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCompany.getFeedbacksByCompanyId(companyId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getScheduleByYacht/{yachtId}")
    public ResponseEntity<?> getScheduleByYacht(@PathVariable String yachtId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iSchedule.getAllScheduleByYacht(yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/addSchedule/{yachtId}")
    public ResponseEntity<?> addSchedule(@PathVariable String yachtId,
                                         @RequestParam LocalDateTime startDate,
                                         @RequestParam LocalDateTime endDate){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData((iYachtSchedule.addYachtSchedule(yachtId, startDate, endDate)));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @DeleteMapping("/deleteSchedule/{yachtId}/{scheduleId}")
    public ResponseEntity<?> deleteSchedule(@PathVariable String yachtId,
                                            @PathVariable String scheduleId){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtSchedule.deleteYachtSchedule(yachtId, scheduleId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/updateSchedule/{yachtId}/{scheduleId}")
    public ResponseEntity<?> updateSchedule(@PathVariable String yachtId,
                                            @PathVariable String scheduleId,
                                            @RequestParam LocalDateTime startDate,
                                            @RequestParam LocalDateTime endDate){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtSchedule.updateYachtSchedule(yachtId, scheduleId, startDate, endDate));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getAllRoomSchedule/{idYacht}/{idSchedule}")
    public ResponseEntity<?> getAllRoomSchedule(@PathVariable("idYacht") String idYacht,
                                                @PathVariable("idSchedule") String idSchedule){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoom.getRoomAndSchedule(idYacht,idSchedule));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/getRoomByYacht/{yachtId}")
    public ResponseEntity<?> getRoomByYacht(@PathVariable String yachtId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoom.getRoomByYacht(yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getYachtType")
    public ResponseEntity<?> getYachtType(){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtType.getYachtTypes());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

}
