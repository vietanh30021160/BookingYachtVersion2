package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_feedback", nullable = false)
    private String idFeedback;

    @Column(name = "star_rating")
    private int starRating;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "id_booking", unique = true)
    private String idBooking;

    @ManyToOne()
    @JoinColumn(name = "id_customer", nullable = false)
    private Customer customer;

    @ManyToOne()
    @JoinColumn(name = "id_yacht", nullable = false)
    private Yacht yacht;
}