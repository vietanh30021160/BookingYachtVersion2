package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.entity.BookingOrder;
import com.example.YachtBookingBackEnd.entity.BookingRoom;
import com.example.YachtBookingBackEnd.entity.Room;

import java.util.List;
import java.util.Set;

public interface IBookingRoom {
    Set<BookingRoom> createBookingRooms(List<Room> selectedRooms, BookingOrder bookingOrder);
}
