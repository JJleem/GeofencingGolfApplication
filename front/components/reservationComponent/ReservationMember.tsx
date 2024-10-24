import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  IconPressable,
  MemberView,
  SectionItemBox,
  SectionItemComp,
  SectionItemInner,
} from './ReservationStyle';
import {Text} from '../../theme/theme';
import {useRecoilState} from 'recoil';
import {SelectMemeberNum} from '../../atom/atom';
const ReservationMember = () => {
  const [memberNum, setMemberNum] = useRecoilState(SelectMemeberNum);
  const handleNumberPlus = () => {
    if (memberNum < 4) {
      setMemberNum(memberNum + 1);
    }
  };

  const handleNumberMinus = () => {
    if (memberNum > 0) {
      setMemberNum(memberNum - 1);
    }
  };
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
        <View style={{gap: 8}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>예약 인원</Text>
        </View>
        <SectionItemComp>
          <IconPressable
            onPress={handleNumberMinus}
            style={{
              flexDirection: 'row',
              gap: 15,
              alignItems: 'center',
            }}>
            <Icon name="remove-circle-outline" size={24} color="#7d7d7d" />
          </IconPressable>
          <MemberView>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                letterSpacing: -1,
              }}>
              {memberNum} 인
            </Text>
          </MemberView>
          <IconPressable
            onPress={handleNumberPlus}
            style={{
              flexDirection: 'row',
              gap: 15,
              alignItems: 'center',
            }}>
            <Icon name="add-circle-outline" size={24} color="#7d7d7d" />
          </IconPressable>
        </SectionItemComp>
      </SectionItemInner>
    </SectionItemBox>
  );
};

export default ReservationMember;
