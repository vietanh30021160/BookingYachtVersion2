package com.example.firstDemoHihi.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "yacht_details")
public class YachtDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_yacht_detail", nullable = false, length = 255)
    private String idYachtDetail;

    @Column(name = "launch", nullable = false)
    private LocalDate launch;

    @Column(name = "hull_body", nullable = false)
    private String hullBody;

    @Lob
    @Column(name = "description", nullable = false)
    private String description;

    @Lob
    @Column(name = "rule", nullable = false)
    private String rule;

    @Lob
    @Column(name = "feedback", nullable = false)
    private String feedback;

    @Column(name = "itinerary", nullable = false)
    private String itinerary;

    @ManyToOne()
    @JoinColumn(name = "id_yacht", nullable = false)
    private Yacht yacht;

    @OneToMany(mappedBy = "yachtDetail")
    private Set<Feedback> feedbackSet;

    @OneToMany(mappedBy = "yachtDetail")
    private Set<ImageYachtDetail> yachtDetailSet;

    @OneToMany(mappedBy = "yachtDetail")
    private Set<YachtDetailService> yachtDetailServiceSet;

}