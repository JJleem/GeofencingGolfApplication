import React, {useState} from 'react';
import {
  SectionItemBox,
  SectionItemInner,
  TeeTimeInnerView,
  TeeTimeView,
  TimePress,
} from './ReservationStyle';
import {Text} from '../../theme/theme';
import mockupdata from '../../mock/mockupdata.json';
import {useRecoilState} from 'recoil';
import {SelectTime} from '../../atom/atom';
const ReservationTeeTime = () => {
  const [selectedTime, setSelectedTime] = useRecoilState(SelectTime);
  const handleTimePress = (time: string) => {
    setSelectedTime(time); // 선택된 시간 업데이트
  };
  return (
    <SectionItemBox
      style={{
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 5,
      }}>
      <SectionItemInner>
        <TeeTimeInnerView style={{gap: 16}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>티타임</Text>
          <TeeTimeView>
            {mockupdata.reservationInformation.tee_info.map((time, index) => (
              <TimePress
                key={index}
                onPress={() => handleTimePress(time)}
                style={{
                  backgroundColor:
                    selectedTime === time ? '#8d8d8d' : 'transparent',
                }}>
                <Text
                  style={{
                    color: selectedTime === time ? '#fff' : '#8b8b8b',
                  }}>
                  {time.slice(14, 20)}
                </Text>
              </TimePress>
            ))}
          </TeeTimeView>
        </TeeTimeInnerView>
      </SectionItemInner>
    </SectionItemBox>
  );
};

export default ReservationTeeTime;
