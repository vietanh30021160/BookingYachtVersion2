package com.example.firstDemoHihi.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "image_yacht_detail")
public class ImageYachtDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_image_yacht_detail", nullable = false, length = 255)
    private String idImageYachtDetail;

    @Column(name = "image", nullable = false, length = 100)
    private String image;

    @ManyToOne()
    @JoinColumn(name = "id_yacht_detail", nullable = false)
    private YachtDetail yachtDetail;

}