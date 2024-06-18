package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.entity.BookingOrder;
import com.example.YachtBookingBackEnd.entity.BookingRoom;
import com.example.YachtBookingBackEnd.entity.Room;
import com.example.YachtBookingBackEnd.entity.key.KeysBookingRoom;
import com.example.YachtBookingBackEnd.repository.BookingRoomRepository;
import com.example.YachtBookingBackEnd.service.implement.IBookingRoom;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class BookingRoomService implements IBookingRoom {
    BookingRoomRepository bookingRoomRepository;

    @Override
    @Transactional
    public Set<BookingRoom> createBookingRooms(List<Room> selectedRooms, BookingOrder bookingOrder) {
        Set<BookingRoom> bookingRoomSet = new HashSet<>();
        for (Room room : selectedRooms) {
            BookingRoom bookingRoom = new BookingRoom();
            bookingRoom.setRoom(room);
            bookingRoom.setBookingOrder(bookingOrder);

            KeysBookingRoom keys = new KeysBookingRoom(room.getIdRoom(), bookingOrder.getIdBooking());
            bookingRoom.setKeys(keys);

            bookingRoomSet.add(bookingRoom);
            bookingRoomRepository.save(bookingRoom);
        }
        return bookingRoomSet;
    }
}
