import React from 'react';
import {Button, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {locationState} from '../../atom/atom';
import {Link} from 'react-router-native';

const CheckPage = () => {
  const [data, setData] = useRecoilState(locationState);
  return (
    <MainView>
      <StatusBar />
      <HeaderView>
        {/* <Ionicons
        name="chevron-back-outline"
        size={30}
        color="#141414"
        onPress={() => navigation.goBack()}
      /> */}
        <HeaderText>
          {/* {data?.isCheck === 'in'
          ? '체크인'
          : data?.isCheck === 'out'
          ? '체크아웃'
          : ''}{' '} */}
          체크인 완료
        </HeaderText>
        {/* <Ionicons name="chevron-back-outline" size={30} color="transparent" /> */}
      </HeaderView>

      <CheckView>
        <CheckInnerView>
          <CheckTextView>
            <CheckText>
              {data?.isCheck ? '체크인' : !data?.isCheck ? '체크아웃' : ''} 이
              완료되었습니다!
            </CheckText>
          </CheckTextView>
          <Text style={{fontSize: 18}}>예약 상품 정보</Text>
          <DetailInfoView>
            <Text>골프장명</Text>
            <Text>{data?.latitude}</Text>
          </DetailInfoView>
          <DetailInfoView>
            <Text>라운드 일시</Text>
            <Text>{data?.longitude}</Text>
          </DetailInfoView>
          <DetailInfoView>
            <Text>코스명</Text>
            <Text>{data?.time}</Text>
          </DetailInfoView>
          <DetailInfoView>
            <Text>홀정보</Text>
            <Text>{data?.accuracy}</Text>
          </DetailInfoView>
          <DetailInfoView>
            <Text>조건</Text>
            {/* <Text>{data.reservation?.condition}</Text> */}
          </DetailInfoView>
          <DetailInfoView>
            <Text>내장인원</Text>
            {/* <Text>{data.reservation?.party}</Text> */}
          </DetailInfoView>
        </CheckInnerView>
      </CheckView>
      <FooterBtnView>
        <FooterBtnMYOpacity>
          <FooterBtnMY to="/details" activeOpacity={0.7}>
            <FooterBtnText>나의 예약</FooterBtnText>
          </FooterBtnMY>
        </FooterBtnMYOpacity>
        <FooterBtnOpacity activeOpacity={0.7}>
          <FooterBtnHome to="/" underlayColor="transparent" activeOpacity={0.7}>
            <FooterBtnText>골프예약 홈</FooterBtnText>
          </FooterBtnHome>
        </FooterBtnOpacity>
      </FooterBtnView>
    </MainView>
  );
};

export default CheckPage;
const CheckText = styled(Text)`
  font-size: 24px;
  font-weight: 700;
`;
const CheckTextView = styled(View)`
  border-bottom-style: solid;
  border-bottom-color: #8e8e8e;
  border-bottom-width: 1px;
  width: 100%;
  padding-bottom: 27px;
`;
const MainView = styled(View)`
  padding-top: 70px;
  gap: 27px;
  justify-content: center;
  align-items: center;
  padding-bottom: 250px;
`;
const HeaderView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-content: start;
  padding: 0px 25px;
`;
const HeaderText = styled(Text)`
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;
const CheckView = styled(View)`
  background-color: #4dae62;

  width: 100%;
  padding: 25px 25px;
`;
const CheckInnerView = styled(View)`
  background: #fff;
  padding: 25px 25px;

  gap: 27px;
`;
const DetailInfoView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;
const FooterBtnView = styled(View)`
  width: 100%;
  flex-direction: row;

  justify-content: space-between;
`;
const FooterBtnMY = styled(Link)`
  width: 100%;
  height: 100px;

  justify-content: center;
  align-items: center;

  background-color: #555;
`;
const FooterBtnMYOpacity = styled(TouchableOpacity)`
  width: 50%;

  justify-content: center;
  align-items: center;

  background-color: #555;
`;
const FooterBtnHome = styled(Link)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: #4dae62;
`;
const FooterBtnOpacity = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;

  width: 50%;
  background-color: #4dae62;
`;
const FooterBtnText = styled(Text)`
  font-weight: 700;
  color: #fff;
`;
