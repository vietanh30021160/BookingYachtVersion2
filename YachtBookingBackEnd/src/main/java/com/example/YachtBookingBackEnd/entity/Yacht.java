package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "yacht")
public class Yacht {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_yacht", nullable = false)
    private String idYacht;

    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

    @Column(name = "launch")
    private LocalDate launch;

    @Column(name = "hull_body")
    private String hullBody;

    @Lob
    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "rule")
    private String rule;

    @Column(name = "itinerary")
    private String itinerary;

    @Column(name = "exist")
    private int exist;

    @ManyToOne()
    @JoinColumn(name = "id_yacht_type", nullable = false)
    private YachtType yachtType;

    @ManyToOne()
    @JoinColumn(name = "id_company", nullable = false)
    private Company company;

    @ManyToOne()
    @JoinColumn(name = "id_location", nullable = false)
    private Location location;

    @OneToMany(mappedBy = "yacht")
    private Set<YachtImage> yachtImageSet;

    @OneToMany(mappedBy = "yacht")
    private Set<YachtService> yachtServiceSet;

    @OneToMany(mappedBy = "yacht")
    private Set<Room> roomSet;

    @OneToMany(mappedBy = "yacht")
    private Set<RoomType> roomTypeSet;

    @OneToMany(mappedBy = "yacht")
    private Set<YachtSchedule> yachtScheduleSet;
}