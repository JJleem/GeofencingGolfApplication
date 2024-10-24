package com.geofence.data;

import java.sql.Date;
import java.sql.Timestamp;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.geofence.entity.Member;
import com.geofence.entity.Reservation;
import com.geofence.repository.MemberRepository;
import com.geofence.repository.ReservationRepository;
import com.geofence.service.ReservationService;

@SpringBootTest
public class InsertData {
	
	@Autowired
	private MemberRepository mr;
	
	@Autowired
	private ReservationRepository rr;
	
	
	@Test
	public void insertReservation() {
	    // 첫 번째 멤버 추가
	    Member member1 = new Member();
	    member1.setId("kim01");
	    member1.setPwd("1234");
	    mr.save(member1);

	    // 첫 번째 예약 추가
	    Reservation reservation1 = new Reservation();
	    reservation1.setMember(member1); // 외래키로 설정된 멤버 연결
	    reservation1.setDate("2024-10-20");
	    reservation1.setTee_info("2024-10-20 15:00:00");
	    reservation1.setCourse_info("코스 A");
	    reservation1.setPersons(0);
	    rr.save(reservation1);
	}

}
