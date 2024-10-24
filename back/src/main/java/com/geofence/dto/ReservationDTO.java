package com.geofence.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO {
	
	private Long reservationNum; // 예약 기본키
    private String memberId; // 외래키 [멤버 ID]
    private String date; // 예약일
    private String tee_info; // 티타임
    private String course_info; // 코스정보
    private Long locker_info; //  라커정보
    private int persons; // 예약인원

}
