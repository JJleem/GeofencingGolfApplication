import React, {useRef, useState} from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {Text} from '../../theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigate} from 'react-router-native';
import HomeCalendar from './HomeCalendar';
import {useRecoilState} from 'recoil';
import {DateSelected, ModalCalendar} from '../../atom/atom';
import HomeSlider from '../sliderComponent/HomeSlider';
import {
  MiddleSection,
  MiddleSectionContainer,
  MiddleSectionInner,
  ModalCenterView,
  ModalView,
  ReservationBTN,
  SliderContainer,
} from './HomeScreenStyle';

const ReservationBox = () => {
  const navigate = useNavigate();

  const [isClick, setIsClick] = useRecoilState(ModalCalendar);
  const [selectedDate, setSelectedDate] = useRecoilState(DateSelected);
  return (
    <MiddleSection style={{paddingBottom: 400}}>
      <Text style={{fontWeight: 'bold', fontSize: 16}}>라운딩 예약하기</Text>
      <MiddleSectionContainer>
        <MiddleSectionInner
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 5, // 0 이상의 값으로 수정
            top: '0%', // 부모의 50% 위치
            height: 500,
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 9,
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              {selectedDate}
            </Text>
          </View>
          <SliderContainer>
            <HomeCalendar />
          </SliderContainer>
          <ReservationBTN
            activeOpacity={0.1}
            onPress={() => navigate('/reservation')}>
            <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
              예약하기
            </Text>
          </ReservationBTN>
        </MiddleSectionInner>
      </MiddleSectionContainer>
    </MiddleSection>
  );
};

export default ReservationBox;
