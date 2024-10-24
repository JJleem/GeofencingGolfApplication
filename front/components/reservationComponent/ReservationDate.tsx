import React, {useState} from 'react';
import {
  IconPressable,
  ModalCenterView,
  ModalView,
  SectionItemBox,
  SectionItemInner,
} from './ReservationStyle';
import {Text} from '../../theme/theme';
import {Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeCalendar from '../homeComponent/HomeCalendar';
import {useRecoilState} from 'recoil';
import {DateSelected} from '../../atom/atom';
import styled from 'styled-components';

const ReservationDate = () => {
  const [selectedDate, setSelectedDate] = useRecoilState(DateSelected);
  const [ischangeDate, setIsChangeDate] = useState(false);
  return (
    <SectionItemBox
      style={{
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 5, // 0 이상의 값으로 수정
      }}>
      <SectionItemInner>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          예약할 날짜 : {selectedDate}
        </Text>
        <IconPressable onPress={() => setIsChangeDate(true)}>
          <Icon
            name={ischangeDate ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={24}
            color="#1e1e1e"
          />
        </IconPressable>
        <Modal
          transparent={true}
          visible={ischangeDate}
          animationType="slide"
          onRequestClose={() => {
            setIsChangeDate(!ischangeDate);
          }}>
          <ModalCenterView onPress={() => setIsChangeDate(!ischangeDate)}>
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
              <HomeCalendar />
            </ModalView>
          </ModalCenterView>
        </Modal>
      </SectionItemInner>
    </SectionItemBox>
  );
};

export default ReservationDate;
