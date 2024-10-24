import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Modal} from 'react-native';
import {Text} from '../../theme/theme';

import {useRecoilState} from 'recoil';
import {
  DateSelected,
  postUserInfo,
  SelectCourse,
  SelectMemeberNum,
  SelectTime,
  UserDetail,
  userReservation,
} from '../../atom/atom';

import {useNavigate} from 'react-router-native';
import {
  UserData,
  UserDetailType,
  UserReservationType,
} from '../../interface/interface';
import ReservationDate from '../../components/reservationComponent/ReservationDate';
import ReservationTeeTime from '../../components/reservationComponent/ReservationTeeTime';
import ReservationCourse from '../../components/reservationComponent/ReservationCourse';
import ReservationMember from '../../components/reservationComponent/ReservationMember';
import {
  AlarmView,
  MainView,
  ModalCenterView,
  ModalView,
  ReservationBTN,
  SectionView,
  TitleHeader,
} from '../../components/reservationComponent/ReservationStyle';
import axios from 'axios';

const Reservation = () => {
  const [selectedTime, setSelectedTime] = useRecoilState(SelectTime);
  const [selectedDate, setSelectedDate] = useRecoilState(DateSelected);
  const [reservationData, setReservationData] = useRecoilState(userReservation);
  const [memberNum, setMemberNum] = useRecoilState(SelectMemeberNum);
  const [isClick, setIsClick] = useState(false);
  const [selectCourse, setSelectCourse] = useRecoilState(SelectCourse);
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useRecoilState<UserData | null>(
    postUserInfo,
  );
  const [isReservationComplete, setIsReservationComplete] = useState(false);
  console.log('예약내역 userReservation', reservationData);

  const handleReservationArray = async ({
    date,
    course_info,
    tee_info,
    persons,
    memberId,
  }: UserReservationType) => {
    setIsClick(!isClick);
    setReservationData({
      memberId: memberId,
      date: date,
      course_info: course_info,
      tee_info: tee_info,
      persons: persons, //person
    });
    await postData(memberId, date, course_info, tee_info, persons);
    setIsReservationComplete(true);
  };
  ///예약완료후 예약창 초기화
  const completeData = () => {
    resetData();
    navigate('/');
  };

  const resetData = () => {
    setSelectCourse('');
    setMemberNum(0);
    setSelectedTime('');
  };
  ///
  const postData = async (
    memberId?: string,
    date?: string,
    course_info?: string,
    tee_info?: string,
    persons?: number,
  ) => {
    try {
      const response = await axios.post(
        // 에뮬레이터 IP
        //'http://10.0.2.2:8080/api/reservations',
        // local IP
        'http://192.168.0.68:8080/api/reservations',

        {
          memberId,
          date,
          course_info,
          tee_info,
          persons,
        },
        {
          headers: {
            'Content-Type': 'application/json', // JSON 형식으로 전송
          },
        },
      );
      console.log(response.data); // 서버의 응답 데이터
      return true;
    } catch (error) {
      Alert.alert('오류', '예약 전송에 실패했습니다.');
      console.error(error);
      return false;
    }
  };

  return (
    <MainView>
      <TitleHeader>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>라운딩 예약하기</Text>
      </TitleHeader>
      <SectionView>
        <ReservationDate />
        <ReservationTeeTime />
        <ReservationCourse />
        <ReservationMember />
        <ReservationBTN
          activeOpacity={0.1}
          onPress={() =>
            handleReservationArray({
              date: selectedDate,
              course_info: selectCourse,
              tee_info: selectedTime,
              persons: memberNum,
              memberId: userDetail?.id,
            })
          }>
          <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
            예약하기
          </Text>
        </ReservationBTN>

        <Modal
          transparent={true}
          visible={isClick}
          animationType="slide"
          onRequestClose={() => {
            setIsClick(false);
          }}>
          <ModalCenterView onPress={() => setIsClick(false)}>
            <ModalView
              onTouchStart={e => {
                e.stopPropagation(); // 모달 내부 클릭 시 이벤트 전파 방지
              }}
              style={{
                zIndex: 2,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              {selectedTime && memberNum !== 0 && selectCourse !== '' ? (
                <>
                  <Text>예약완료</Text>
                  <Text>
                    {selectedDate} , {selectedTime}
                  </Text>
                  <Text>코스명 : {selectCourse}</Text>
                  <Text>예약이 완료되었습니다.</Text>
                  <ReservationBTN activeOpacity={0.1} onPress={completeData}>
                    <Text
                      style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
                      확인
                    </Text>
                  </ReservationBTN>
                </>
              ) : (
                <>
                  <AlarmView>
                    {!selectedTime && <Text>티타임을 선택해주세요.</Text>}
                    {memberNum === 0 && (
                      <Text>인원을 선택해주세요.(1명이상)</Text>
                    )}
                    {selectCourse === '' && <Text>코스를 선택해주세요.</Text>}
                  </AlarmView>
                  <ReservationBTN
                    activeOpacity={0.1}
                    onPress={() => setIsClick(false)}>
                    <Text
                      style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
                      확인
                    </Text>
                  </ReservationBTN>
                </>
              )}
            </ModalView>
          </ModalCenterView>
        </Modal>
      </SectionView>
    </MainView>
  );
};

export default Reservation;
