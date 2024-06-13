package com.example.YachtBookingBackEnd.controller;


import com.example.YachtBookingBackEnd.entity.Feedback;
import com.example.YachtBookingBackEnd.payload.response.DataResponse;
import com.example.YachtBookingBackEnd.service.implement.IFeedback;
import com.example.YachtBookingBackEnd.service.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@RestController
//@RequestMapping("/api/feedbacks")
//public class FeedbackController {
//
//    @Autowired
//    FeedbackService feedbackService;
//
//    @Autowired
//    IFeedback iFeedback;
//
//    @PostMapping("/addFeedback/{idBooking}/{idCustomer}/{idYacht}")
//    public ResponseEntity<?> addFeedback(@PathVariable String idBooking,
//                                                @PathVariable String idCustomer,
//                                                @PathVariable String idYacht,
//                                                @RequestParam int starRating,
//                                                @RequestParam String description) {
//        DataResponse dataResponse = new DataResponse();
//        dataResponse.setData(iFeedback.addFeedback(starRating, description, idBooking, idCustomer, idYacht));
//        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
//    }
//
//
//
//}
