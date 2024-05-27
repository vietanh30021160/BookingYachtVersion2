package com.example.firstDemoHihi.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "image_room_type_detail")
public class ImageRoomTypeDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_image_room_type_detail", nullable = false, length = 255)
    private String idImageRoomTypeDetail;

    @Column(name = "image", nullable = false, length = 100)
    private String image;

    @ManyToOne()
    @JoinColumn(name = "id_room_type", nullable = false)
    private RoomType roomType;

}