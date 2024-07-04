package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.RoomTypeDTO;
import com.example.YachtBookingBackEnd.entity.RoomType;
import com.example.YachtBookingBackEnd.entity.Yacht;
import com.example.YachtBookingBackEnd.repository.RoomTypeRepository;
import com.example.YachtBookingBackEnd.repository.YachtRepository;
import com.example.YachtBookingBackEnd.service.implement.IRoomType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomTypeService implements IRoomType {
    @Autowired
    private YachtRepository yachtRepository;
    @Autowired
    private RoomTypeRepository roomTypeRepository;
    @Override
    public List<RoomTypeDTO> getAllRoomType(String  yachtId) {
        List<RoomTypeDTO> roomTypeDTOList  =new ArrayList<>();
        try {

//            Yacht yacht  = yachtRepository.findById(yachtId)
//                    .orElseThrow(()-> new RuntimeException("Not found yacht") );
            List<RoomType> roomTypeList = roomTypeRepository.findAllByYacht(yachtId);

            for (RoomType roomType: roomTypeList
                 ) {
                RoomTypeDTO roomTypeDTO = new RoomTypeDTO();
                roomTypeDTO.setIdRoomType(roomType.getIdRoomType());
                roomTypeDTO.setType(roomType.getType());
                roomTypeDTO.setPrice(roomType.getPrice());
                roomTypeDTO.setUtilities(roomType.getUtilities());
                roomTypeDTOList.add(roomTypeDTO);
            }
        }catch (Exception e){
            System.out.println("Error by: "+ e);
        }
        return roomTypeDTOList;
    }

    @Override
    public boolean addRoomType(String type, long price, String utilities, String yachtId) {
        try {
            Yacht yacht = yachtRepository.findById(yachtId)
                    .orElseThrow(()->new RuntimeException("not found yacht"));
            RoomType roomType = new RoomType();
            roomType.setType(type);
            roomType.setPrice(price);
            roomType.setUtilities(utilities);
            roomType.setYacht(yacht);
            roomTypeRepository.save(roomType);
            return  true;
        }catch (Exception e){
            System.out.println("Error by: "+ e);
        }
        return false;
    }

    @Override
    public boolean updateRoomType(String roomTypeId, String type, long price, String utilities) {
        try {
            RoomType roomType = roomTypeRepository.findById(roomTypeId)
                    .orElseThrow(()->new RuntimeException("Not found"));

            if(type==null){
                roomType.setType(roomType.getType());
            }else{
                roomType.setType(type);
            }
            if(price==0){
                roomType.setPrice(roomType.getPrice());
            }else {
                roomType.setPrice(price);
            }if(utilities==null){
                roomType.setUtilities(roomType.getUtilities());
            }else {
                roomType.setUtilities(utilities);
            }


            roomTypeRepository.save(roomType);
            return  true;
        }catch (Exception e){
            System.out.println("Error by: "+ e);
        }
        return false;
    }

    @Override
    public boolean deleteRoomType(String roomTypeId) {
        try {
            RoomType roomType = roomTypeRepository.findById(roomTypeId)
                    .orElseThrow(()->new RuntimeException("Not found"));
            roomTypeRepository.delete(roomType);
            return true;
        }catch (Exception e){
            System.out.println("Error by: "+ e);
        }
        return false;
    }
}
