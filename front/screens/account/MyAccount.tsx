import React from 'react';
import {Pressable, ScrollView, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {Text} from '../../theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRecoilState} from 'recoil';
import {postUserInfo, UserDetail} from '../../atom/atom';
import {useNavigate} from 'react-router-native';
import {UserData} from '../../interface/interface';
const MyAccount = () => {
  const formatBirthdate = (birthdate: string): string => {
    const date = new Date(birthdate);
    const year = date.getFullYear().toString().slice(-2); // "89"
    const month = String(date.getMonth() + 1).padStart(2, '0'); // "12"
    const day = String(date.getDate()).padStart(2, '0'); // "31"

    return `${year}-${month}-${day}`; // "89-12-31"
  };
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useRecoilState<UserData | null>(
    postUserInfo,
  );
  return (
    <MainView>
      <TitleHeader>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>MY PAGE</Text>
      </TitleHeader>
      <SectionView>
        <SectionItemBox
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 5, // 0 이상의 값으로 수정
          }}>
          {/* <SectionItemInner>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>사용자명</Text>
            <SectionItemComp>
              <Text
                style={{fontWeight: 'medium', fontSize: 16, color: '#7d7d7d'}}>
                {userDetail?.id}
              </Text>
              <TouchableOpacity>
                <Icon name="settings" size={24} color="#7d7d7d" />
              </TouchableOpacity>
            </SectionItemComp>
          </SectionItemInner> */}
          <SectionItemInner>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>아이디</Text>
            <SectionItemComp>
              <Text
                style={{fontWeight: 'medium', fontSize: 16, color: '#7d7d7d'}}>
                {userDetail?.id}
              </Text>
              <TouchableOpacity>
                <Icon name="settings" size={24} color="#7d7d7d" />
              </TouchableOpacity>
            </SectionItemComp>
          </SectionItemInner>
          {/* <SectionItemInner>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              생년월일(성별)
            </Text>
            <SectionItemComp>
              <Text
                style={{fontWeight: 'medium', fontSize: 16, color: '#7d7d7d'}}>
                {formatBirthdate(userDetail?.birthdate || '89-12-31')}(
                {userDetail?.gender})
              </Text>
              <TouchableOpacity>
                <Icon name="settings" size={24} color="#7d7d7d" />
              </TouchableOpacity>
            </SectionItemComp>
          </SectionItemInner> */}
        </SectionItemBox>
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
              <Text
                style={{fontWeight: 'bold', fontSize: 16, color: '#9d9d9d'}}>
                비밀번호 변경하기
              </Text>
              <Text
                style={{
                  fontWeight: 'medium',
                  fontSize: 11,
                  letterSpacing: -0.5,
                  color: '#9d9d9d',
                }}>
                개인정보보호를 위해 비밀번호를 주기적으로 변경해 주세요
              </Text>
            </View>
            <SectionItemComp>
              <TouchableOpacity>
                <Icon name="settings" size={24} color="#9d9d9d" />
              </TouchableOpacity>
            </SectionItemComp>
          </SectionItemInner>
        </SectionItemBox>
        <SectionItemBox
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 5, // 0 이상의 값으로 수정
            marginBottom: 101,
          }}>
          <SectionItemInnerTouch>
            <View style={{gap: 8}}>
              <Text
                style={{fontWeight: 'bold', fontSize: 16, color: '#9d9d9d'}}>
                결제수단 관리하기
              </Text>
            </View>
            <SectionItemComp>
              <TouchableOpacity>
                <Icon
                  name="chevron-forward-outline"
                  size={24}
                  color="#9d9d9d"
                />
              </TouchableOpacity>
            </SectionItemComp>
          </SectionItemInnerTouch>
        </SectionItemBox>
      </SectionView>
    </MainView>
  );
};

export default MyAccount;

const MainView = styled(ScrollView)`
  align-content: center;
  background-color: #f2f4f6;
  height: 100%;
  flex: 1;
  position: relative;
`;
const TitleHeader = styled(View)`
  justify-content: center;
  height: 72px;
  align-items: center;
  margin-bottom: 101px;
  width: 100%;
  background-color: #fff;
  position: absolute;
  top: 0;
`;
const SectionView = styled(View)`
  margin-top: 103px;
  padding: 0px 16px;
  gap: 12px;
`;
const SectionItemBox = styled(View)`
  padding: 32px 21px;
  background: #fff;
  border-radius: 20px;
  gap: 40px;
`;
const SectionItemInner = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const SectionItemInnerTouch = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const SectionItemComp = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 29px;
`;
