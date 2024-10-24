package com.geofence.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Member {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberNum; // 기본키
    
    @Column(unique = true)
    private String id; // 외래키로 사용, id
 
    private String pwd; // 비밀번호

    @OneToMany(mappedBy = "member") // 예약 정보
    private List<Reservation> reservations;
    
    
    
}