import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useLocation, useNavigate} from 'react-router-native';
import {Text} from '../theme/theme';
interface BannerTitleProps {
  isActive: boolean;
}
const BottomBanner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      {location.pathname === '/' ? null : (
        <BottomBannerView
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 3,
          }}>
          <BannerInner>
            <BannerItem onPress={() => navigate('/home')}>
              <Icon
                name={location.pathname === '/home' ? 'home' : 'home-outline'}
                size={24}
                color="#1e1e1e"
              />
              <BannerTitle isActive={location.pathname === '/home'}>
                홈
              </BannerTitle>
            </BannerItem>
            <BannerItem onPress={() => navigate('/facilities')}>
              <Icon
                name={
                  location.pathname === '/facilities'
                    ? 'business'
                    : 'business-outline'
                }
                size={24}
                color="#1e1e1e"
              />
              <BannerTitle isActive={location.pathname === '/facilities'}>
                시설안내
              </BannerTitle>
            </BannerItem>
            <BannerItem onPress={() => navigate('/details')}>
              <Icon
                name={
                  location.pathname === '/details'
                    ? 'calendar-number'
                    : 'calendar-number-outline'
                }
                size={24}
                color="#1e1e1e"
              />
              <BannerTitle isActive={location.pathname === '/details'}>
                예약내역
              </BannerTitle>
            </BannerItem>
            <BannerItem onPress={() => navigate('/myaccount')}>
              <Icon
                name={
                  location.pathname === '/myaccount'
                    ? 'person'
                    : 'person-outline'
                }
                size={24}
                color="#1e1e1e"
              />
              <BannerTitle isActive={location.pathname === '/myaccount'}>
                MY
              </BannerTitle>
            </BannerItem>
          </BannerInner>
        </BottomBannerView>
      )}
    </>
  );
};

export default BottomBanner;

const BottomBannerView = styled(View)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  border-radius: 24px 24px 0px 0px;
  background-color: #fff;
  justify-content: center;
  align-content: center;
  z-index: 99;
  padding: 0px 16px;
`;

const BannerInner = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;
const BannerTitle = styled(Text)<BannerTitleProps>`
  font-size: 12px;
  color: #1e1e1e;
  font-weight: ${({isActive}) => (isActive ? 'bold' : 'normal')};
`;
const BannerItem = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  gap: 0px;
`;
