import {Pressable, ScrollView, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {Text} from '../../theme/theme';

type isCheck = {
  isCheck?: boolean | null;
};

export const CalendarView = styled(View)`
  width: 100%;
  justify-content: center;
`;

export const ModalCenterView = styled(Pressable)`
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: -1;
  background-color: transparent;
`;
export const ModalView = styled(View)`
  background-color: #fff;
  border-radius: 20px;
  width: 80%;
  height: 50%;
  justify-content: center;
  align-items: center;
`;

export const MiddleSectionContainer = styled(View)`
  position: relative;
  width: 100%;
  height: 205px;
  margin-bottom: 41px;
`;
export const MiddleSection = styled(View)`
  gap: 14px;
`;

export const MiddleSectionInner = styled(Pressable)`
  position: absolute;
  gap: 11px;
  justify-content: space-around;
  padding: 15px 26px;
  border-radius: 20px;
  background-color: #fff;
  width: 100%;
  height: 147px;
`;

export const ReservationBTN = styled(TouchableOpacity)`
  border-radius: 15px;
  background-color: #6d7582;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

export const SliderContainer = styled(Pressable)`
  width: 100%;

  justify-content: center;
  align-items: center;
`;

export const MiddleSectionItem = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
`;

export const MiddleSectionInnerMock = styled(View)`
  position: absolute;
  gap: 11px;
  justify-content: space-around;
  padding: 15px 26px;
  border-radius: 20px;
  background-color: #fff;
  width: 100%;
  height: 147px;
`;

export const CheckIn = styled(View)<isCheck>`
  border-radius: 35px;
  justify-content: center;
  align-items: center;
`;
export const CheckText = styled(Text)<isCheck>`
  border: 1px solid ${({isCheck}) => (isCheck ? '#28a745' : '#c7c7c7')};
  padding: 4px 0px;
  width: 75px;
  text-align: center;
  border-radius: 35px;
  color: ${({isCheck}) => (isCheck ? '#28a745' : '#c7c7c7')};
`;
export const MiddleText = styled(Text)`
  text-align: left;

  width: 130px;
`;

export const InnerContainer = styled(View)`
  width: 100%;
  flex: 1;
`;
export const MainView = styled(ScrollView)`
  padding: 0px 16px;
  flex: 1;
  background-color: #f2f4f6;
`;
export const TopSection = styled(View)`
  margin-top: 44px;
  gap: 8px;
  margin-bottom: 41px;
`;
export const MockupImg = styled(View)`
  width: 163px;
  height: 29px;
  background-color: #f00;
`;
