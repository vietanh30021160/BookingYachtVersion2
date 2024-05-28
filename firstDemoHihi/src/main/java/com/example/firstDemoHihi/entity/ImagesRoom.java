package com.example.firstDemoHihi.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "images_room")
public class ImagesRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_images_room", nullable = false, length = 255)
    private String idImageRoomTypeDetail;

    @Column(name = "image", nullable = false, length = 255)
    private String image;

    @ManyToOne()
    @JoinColumn(name = "id_room", nullable = false)
    private Room room;

}