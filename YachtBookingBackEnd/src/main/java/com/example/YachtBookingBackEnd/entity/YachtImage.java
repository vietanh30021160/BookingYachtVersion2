package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "yacht_image")
public class YachtImage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_yacht_image", nullable = false)
    private String idYachtImage;

    @Column(name = "image_yacht")
    private String imageYacht;

    @ManyToOne()
    @JoinColumn(name = "id_yacht", nullable = false)
    private Yacht yacht;

}