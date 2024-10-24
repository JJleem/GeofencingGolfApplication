import {Pressable, ScrollView, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {Text} from '../../theme/theme';

export const MainView = styled(ScrollView)`
  align-content: center;
  background-color: #f2f4f6;
  height: 100%;
  flex: 1;
  position: relative;
`;
export const TitleHeader = styled(View)`
  justify-content: center;
  height: 72px;
  align-items: center;
  margin-bottom: 101px;
  width: 100%;
  background-color: #fff;
  position: absolute;
  top: 0;
`;
export const SectionView = styled(View)`
  margin-top: 103px;
  padding: 0px 16px;
  gap: 12px;
  justify-content: center;
  align-items: center;

  padding-bottom: 113px;
`;
export const SectionItemBox = styled(View)`
  padding: 32px 21px;
  background: #fff;
  border-radius: 20px;
  gap: 40px;
`;
export const SectionItemInner = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const SectionItemComp = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 5px;
  justify-content: center;
`;
export const MemberView = styled(View)`
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
`;
export const CheckIn = styled(TouchableOpacity)`
  border-radius: 35px;
  justify-content: center;
  align-items: center;
`;
export const CheckText = styled(Text)`
  border: 1px solid #c7c7c7;
  padding: 4px 0px;
  width: 75px;
  text-align: center;
  border-radius: 35px;
  color: #c7c7c7;
`;

export const TeeTimeView = styled(View)`
  flex-direction: row;

  width: 100%;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  gap: 8px;
`;
export const TimePress = styled(Pressable)`
  justify-content: center;
  align-items: center;
  border: 1px solid #8b8b8b;
  white-space: nowrap;

  padding: 4px 6px;
  border-radius: 10px;
`;
export const TeeTimeInnerView = styled(View)`
  width: 100%;
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
  padding: 30px 0px;
  justify-content: space-around;
  align-items: center;
`;
export const ReservationBTN = styled(TouchableOpacity)`
  border-radius: 15px;
  margin-top: 40px;
  background-color: #6d7582;
  width: 90%;

  justify-content: center;
  align-items: center;
  padding: 15px;
`;

export const AlarmView = styled(View)`
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 8px;
`;
export const CourseDropDown = styled(TouchableOpacity)`
  padding: 4px;
`;
export const CourseDropDownItem = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const CourseTitle = styled(View)`
  width: 100%;
  padding: 20px;
  border-bottom-color: #9a9a9a;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding-left: 16px;
`;
export const CourseItem = styled(Pressable)`
  padding: 10px;
  border-bottom-color: #9a9a9a;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
`;
export const IconPressable = styled(TouchableOpacity)`
  padding: 3px;
`;
