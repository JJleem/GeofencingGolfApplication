import React, {useEffect, useState} from 'react';
import {Alert, Button, Pressable, TextInput, View} from 'react-native';
import {Text} from '../../theme/theme';
import {
  MainView,
  ReservationBTN,
} from '../../components/homeComponent/HomeScreenStyle';
import styled from 'styled-components';
import axios from 'axios';
import {useNavigate} from 'react-router-native';
import {PostUserDataType, UserData} from '../../interface/interface';
import {useRecoilState} from 'recoil';
import {postUserInfo} from '../../atom/atom';

type IsFocus = {
  isFocused: boolean;
};
type IsClick = {
  isClick: boolean;
};
const LogScreen = () => {
  const [nameValueInput, setNameValueInput] = useState('');
  const [passwordValueInput, setPasswordValueInput] = useState('');
  const [userData, setUserData] = useRecoilState<UserData | null>(postUserInfo);
  const navigate = useNavigate();
  console.log('유저데이터', userData);
  const [isPost, setIsPost] = useState(Boolean);
  console.log(isPost);
  const PostUserData = async (id?: string, pwd?: string) => {
    try {
      const response = await axios.post(
        'http://192.168.0.68:8080/api/user/register',
        {
          id,
          pwd,
        },
        {
          headers: {
            'Content-Type': 'application/json', // JSON 형식으로 전송
          },
        },
      );

      console.log(response.data);
      setUserData({id, memberNum: response.data.memberNum, pwd});
      setIsPost(true);
    } catch (error: any) {
      Alert.alert('오류', error.response.data);
      console.error(error.response.data);
      setIsPost(false);
    }
  };

  useEffect(() => {
    if (isPost) {
      Alert.alert('회원가입 및 로그인에 성공하셨습니다.');
      navigate('/home');
    } else if (!isPost) {
      return;
    }
  }, [isPost, navigate]);

  useEffect(() => {
    if (userData && userData.memberNum) {
      navigate('/home');
    }
  }, [userData, navigate]);

  const PostUserNavigate = async ({id, pwd}: PostUserDataType) => {
    // 입력값 확인
    if (nameValueInput === '' || passwordValueInput === '') {
      Alert.alert('닉네임 및 비밀번호를 입력하여 주세요');
      return; // 조건에 맞지 않으면 함수 종료
    }

    // 사용자 데이터 설정
    setUserData({
      id: nameValueInput,
      pwd: passwordValueInput,
    });

    await PostUserData(id, pwd);
    // 홈 화면으로 이동
  };

  const handleNameValueInput = (text: string) => {
    if (text.length <= 5) {
      setNameValueInput(text);
    }
  };
  const handlePasswardValueInput = (text: string) => {
    if (text.length <= 5) {
      setPasswordValueInput(text);
    }
  };
  const [focusedInput, setFocusedInput] = useState<number | null>(null); //
  const handleFocus = (inputIndex: number) => {
    setFocusedInput(inputIndex);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  return (
    <LogMainView>
      <LogContentSection>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          회원가입 / 로그인
        </Text>

        <InputItem>
          <Text>닉네임</Text>
          <PhoneTextInput
            placeholder="닉네임을 입력해주세요. (5글자 내외)"
            placeholderTextColor={'#8b8b8b'}
            onFocus={() => handleFocus(0)}
            onChangeText={handleNameValueInput}
            onBlur={handleBlur}
            isFocused={focusedInput === 0}
            maxLength={5}
          />
        </InputItem>
        <InputItem>
          <Text>비밀번호</Text>
          <PhoneTextInput
            placeholder="비밀번호를 입력해주세요."
            placeholderTextColor={'#8b8b8b'}
            onFocus={() => handleFocus(1)}
            onChangeText={handlePasswardValueInput}
            onBlur={handleBlur}
            isFocused={focusedInput === 1}
            maxLength={5}
            secureTextEntry={true}
          />
        </InputItem>
        <ReservationBTN
          activeOpacity={0.1}
          onPress={() =>
            PostUserNavigate({
              id: nameValueInput,
              pwd: passwordValueInput,
            })
          }>
          <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
            회원가입 / 로그인
          </Text>
        </ReservationBTN>
        {/* <Btn
          onPress={() =>
            PostUserNavigate({
              id: nameValueInput,
              pwd: passwordValueInput,
            })
          }>
          <Text>회원가입/로그인</Text>
        </Btn> */}
      </LogContentSection>
    </LogMainView>
  );
};

export default LogScreen;

const LogMainView = styled(View)`
  background: #fff;
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
`;
const LogContentSection = styled(View)`
  width: 100%;
  padding: 30px 26px;
  gap: 24px;
`;
const InputItem = styled(View)`
  gap: 12px;
`;

const PhoneTextInput = styled(TextInput)<IsFocus>`
  border-width: 1px;
  border-style: solid;
  border-color: ${({isFocused}) => (isFocused ? '#000' : '#e9e9e9')};
  color: #000;
  padding: 5px 15px;
`;
