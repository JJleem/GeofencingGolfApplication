import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {Text} from '../../theme/theme';
import {useNavigate} from 'react-router-native';
import {useRecoilState} from 'recoil';
import {
  GetReservationArray,
  GetReservationInfo,
  locationState,
  postUserInfo,
  reservationInfoState,
  userReservation,
} from '../../atom/atom';
import mockupdata from '../../mock/mockupdata.json';
import {
  CheckIn,
  CheckText,
  InnerContainer,
  MiddleSection,
  MiddleSectionContainer,
  MiddleSectionInner,
  MiddleSectionInnerMock,
  MiddleSectionItem,
  MiddleText,
} from './HomeScreenStyle';
import axios from 'axios';
import {
  GetReservationResponse,
  GetReservationType,
  UserData,
} from '../../interface/interface';

const ScheduleBox = ({isCheck}: any) => {
  const [userDetail, setUserDetail] = useRecoilState<UserData | null>(
    postUserInfo,
  );
  const [reservationData, setReservationData] = useRecoilState(userReservation);
  const [getReservationInfo, setGetReservationInfo] =
    useRecoilState(GetReservationInfo);
  const [getReservationArray, setGetReservationArray] =
    useRecoilState(GetReservationArray);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log('GetReservationInfo', getReservationInfo);
  console.log('예약정보', reservationData);
  const [locationInfo, setLocationInfo] = useRecoilState(locationState);
  console.log('위치정보', locationInfo);
  useEffect(() => {
    const fetchGetReservation = async () => {
      try {
        const memberId: string | undefined = userDetail?.id; // userDetail의 id를 가져옵니다.
        if (!memberId) {
          throw new Error('User ID is not available'); // ID가 없으면 에러를 발생시킵니다.
        }
        const response = await axios.get<GetReservationResponse>(
          // 에뮬레이터 IP
          //'http://10.0.2.2:8080/api/reservations/kim01',
          // local IP+
          `http://192.168.0.68:8080/api/reservations/${memberId}`,
        );

        setGetReservationArray(response.data);
        if (response.data && response.data.length > 0) {
          const recentReservation = response.data
            .slice()
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )[0];

          setGetReservationInfo(recentReservation);
        } else {
          setGetReservationInfo(null); // 예약이 없을 경우 처리
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchGetReservation();
  }, [setGetReservationInfo, setGetReservationArray, userDetail?.id]);

  console.log('getData', getReservationInfo);

  const navigate = useNavigate();

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

  return (
    <MiddleSection>
      <Text style={{fontWeight: 'bold', fontSize: 16}}>예정 된 라운딩</Text>
      <MiddleSectionContainer>
        <MiddleSectionInner
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 5,
            top: '0%',
            zIndex: 3,
          }}
          onPress={() => navigate('/details')}>
          {getReservationInfo?.course_info &&
          getReservationInfo?.persons &&
          getReservationInfo?.date ? (
            <InnerContainer>
              <MiddleSectionItem>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>
                  예약 일자
                </Text>
                <MiddleText
                  style={{
                    fontWeight: 'medium',
                    fontSize: 14,
                  }}>
                  {getReservationInfo?.date}
                </MiddleText>
                <CheckIn isCheck={locationInfo?.isCheck}>
                  <CheckText
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}
                    isCheck={isCheck}>
                    {isCheck ? '체크인' : '체크인 전'}
                  </CheckText>
                </CheckIn>
              </MiddleSectionItem>
              <View style={{gap: 0}}>
                <MiddleSectionItem>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    예약 시간
                  </Text>

                  <MiddleText
                    style={{
                      fontWeight: 'medium',
                      fontSize: 14,
                    }}>
                    {formattedTime}
                  </MiddleText>
                  <CheckIn style={{opacity: 0}}>
                    <CheckText
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: '#c7c7c7',
                      }}>
                      내용없음
                    </CheckText>
                  </CheckIn>
                </MiddleSectionItem>
                <MiddleSectionItem>
                  <Text style={{fontWeight: 'bold', fontSize: 14}}>
                    코스 정보
                  </Text>
                  <MiddleText
                    style={{
                      fontWeight: 'medium',
                      fontSize: 14,
                      flexDirection: 'row',
                      overflow: 'hidden',
                    }}>
                    {getReservationInfo?.course_info}
                  </MiddleText>
                  <CheckIn style={{opacity: 0}}>
                    <CheckText
                      style={{
                        fontWeight: 'medium',
                        fontSize: 14,
                        color: '#c7c7c7',
                      }}>
                      내용없음
                    </CheckText>
                  </CheckIn>
                </MiddleSectionItem>
                <MiddleSectionItem>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    락커 정보
                  </Text>

                  <MiddleText
                    style={{
                      fontWeight: 'medium',
                      fontSize: 14,
                    }}>
                    {isCheck ? getReservationInfo?.locker_info : '미배정'}
                  </MiddleText>
                  <CheckIn style={{opacity: 0}}>
                    <CheckText
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: '#c7c7c7',
                      }}>
                      내용없음
                    </CheckText>
                  </CheckIn>
                </MiddleSectionItem>
              </View>
            </InnerContainer>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text>예정 된 라운딩이 없습니다.</Text>
              <Text>라운딩 예약 하시겠습니까?</Text>
            </View>
          )}
        </MiddleSectionInner>
        <MiddleSectionInnerMock
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 7, // 0 이상의 값으로 수정
            zIndex: 2,
            top: '16%',
          }}>
          <View>
            <Text>dd</Text>
          </View>
        </MiddleSectionInnerMock>
        <MiddleSectionInnerMock
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 8, // 0 이상의 값으로 수정
            zIndex: 1,
            top: '31%',
          }}>
          <View>
            <Text>dd</Text>
          </View>
        </MiddleSectionInnerMock>
      </MiddleSectionContainer>
    </MiddleSection>
  );
};

export default ScheduleBox;
