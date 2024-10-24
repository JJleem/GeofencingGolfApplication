import React, {useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import {useNavigate} from 'react-router-native';
import {ReservationBTN} from '../../components/homeComponent/HomeScreenStyle';
import {
  MainView,
  TitleHeader,
} from '../../components/reservationComponent/ReservationStyle';
import styled from 'styled-components/native';
import {useRecoilState} from 'recoil';
import {
  GetReservationArray,
  GetReservationInfo,
  postUserInfo,
  userReservation,
} from '../../atom/atom';
import {Text} from '../../theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {UserData} from '../../interface/interface';
import axios from 'axios';

const DetailsHome = () => {
  const [reservationData, setReservationData] = useRecoilState(userReservation);
  const [getReservationInfo, setgetReservationInfo] =
    useRecoilState(GetReservationInfo);
  const [getReservationArray, setGetReservationArray] =
    useRecoilState(GetReservationArray);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  let formattedTime = '';

  if (getReservationInfo?.tee_info) {
    const teeInfo = getReservationInfo.tee_info;
    const date = new Date(teeInfo);
    const hours = date.getMinutes();
    const minutes = date.getSeconds();

    const period = hours < 12 ? 'AM' : 'PM';

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    formattedTime = `${hours}:${formattedMinutes} ${period}`;
  }

  const deleteReservation = async (reservationNum: number) => {
    try {
      const response = await axios.delete(
        `http://192.168.0.68:8080/api/reservations/${reservationNum}`,
      );
      console.log('삭제성공', response.data);
      setGetReservationArray((prevArray: any) =>
        prevArray.filter(
          (reservation: any) => reservation.reservationNum !== reservationNum,
        ),
      );
    } catch (error) {
      console.log('삭제실패', (error as Error).message);
    }
  };

  const handlePressIn = () => {
    Vibration.vibrate(50);
    Alert.alert('꾹누름');
  };
  console.log('array', getReservationArray);

  const showAlert = (reservation: any) => {
    Alert.alert('', '예약 내역을 삭제하시겠습니까?', [
      {
        text: '취소',
        onPress: () => {},
      },
      {
        text: '삭제',
        onPress: () => deleteReservation(reservation.reservationNum),
      },
    ]);
  };
  return (
    <MainView style={{paddingBottom: 0, marginTop: 0}}>
      <TitleHeader>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>라운딩 예약내역</Text>
      </TitleHeader>

      <DetailSectionView>
        {getReservationArray === undefined ||
        getReservationArray === null ||
        getReservationArray?.length === 0 ? (
          <NoReservationBox
            style={{
              width: '100%',
              height: '100%',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 5,
            }}>
            <NoReservationView>
              <NoReservationInnerView>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: '#000'}}>
                  예정된 라운딩이 없습니다.
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  라운딩을 예약 하시겠습니까?
                </Text>
              </NoReservationInnerView>
              <ReservationBTN
                activeOpacity={0.1}
                onPress={() => navigate('/reservation')}>
                <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
                  예약하기
                </Text>
              </ReservationBTN>
            </NoReservationView>
          </NoReservationBox>
        ) : (
          <ReservationItemView>
            {Array.isArray(getReservationArray) &&
              getReservationArray.length > 0 &&
              getReservationArray
                .slice()
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime(),
                ) // 날짜를 기준으로 오름차순 정렬
                .map((reservation, index) => (
                  <DetailSectionItemBox
                    key={index}
                    onLongPress={handlePressIn}
                    style={{
                      width: '100%',
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 0},
                      shadowOpacity: 0.3,
                      shadowRadius: 20,
                      elevation: 5,
                    }}>
                    <ReservationView>
                      <ReservationTitle>
                        <Text style={{fontSize: 18}}>예약 상품 정보</Text>
                        <TouchableOpacity
                          onPress={() => showAlert(reservation)}>
                          <Icon name="close" size={24} color="#7d7d7d" />
                        </TouchableOpacity>
                      </ReservationTitle>
                      <DetailInfoView>
                        <Text>라운드 일시</Text>
                        <Text>{reservation?.date || '날짜 없음'}</Text>
                      </DetailInfoView>
                      <DetailInfoView>
                        <Text>코스명</Text>
                        <Text>
                          {reservation?.course_info || '코스 정보 없음'}
                        </Text>
                      </DetailInfoView>
                      <DetailInfoView>
                        <Text>티타임</Text>
                        <Text>{formattedTime}</Text>
                      </DetailInfoView>
                      <DetailInfoView>
                        <Text>내장인원</Text>
                        <Text>{reservation?.persons || 0}명</Text>
                      </DetailInfoView>
                    </ReservationView>
                  </DetailSectionItemBox>
                ))}
          </ReservationItemView>
        )}
      </DetailSectionView>
    </MainView>
  );
};

export default DetailsHome;

const ReservationView = styled(View)`
  gap: 20px;
  padding: 20px 0px;
  width: 100%;
`;

const DetailInfoView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

export const DetailSectionView = styled(View)`
  margin-top: 98px;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
`;

export const DetailSectionItemBox = styled(Pressable)`
  padding: 0px 21px;
  border-radius: 20px;
  margin-top: 5px;
  background: #fff;
`;

const ReservationItemView = styled(View)`
  gap: 15px;
  padding-bottom: 103px;
`;

const ReservationTitle = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const NoReservationBox = styled(View)`
  padding: 32px 21px;
  background: #fff;
  border-radius: 20px;
  gap: 40px;
  flex: 1;
`;

const NoReservationView = styled(View)`
  gap: 40px;
`;

const NoReservationInnerView = styled(View)`
  width: 100%;
  gap: 24px;
  justify-content: center;
  align-items: center;
`;
