package com.geofence.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberDTO {
	
    private Long memberNum; // 기본키
    private String id; // 외래키로 사용, id
    private String pwd; // 비밀번호

}
