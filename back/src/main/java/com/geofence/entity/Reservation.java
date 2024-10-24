package com.geofence.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Reservation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationNum; // 기본키
    
    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "id", nullable = false) // 외래키 설정
    private Member member; // Member와의 관계
    
    private String date; // 예약일자
    private String tee_info; // 티타임 시간
    private String course_info; // 코스정보
    private Long locker_info; // 락커번호
    private int persons; // 예약인원
}
