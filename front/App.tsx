import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text as RNText,
  NativeEventEmitter,
  NativeModules,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextProps,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// 위치 정보 타입 정의
interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number;
  speed: number;
  bearing: number;
  provider: string;
  time: number; // timestamp가 숫자형
}
import {
  NativeRouter,
  Route,
  Link,
  Routes,
  useLocation,
} from 'react-router-native';
import HomeScreen from './screens/home/HomeScreen';
import {RecoilRoot} from 'recoil';
import DetailsHome from './screens/details/DetailsHome';
import CheckPage from './screens/check/CheckPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Facilities from './screens/facilities/Facilities';
import MyAccount from './screens/account/MyAccount';
import styled from 'styled-components/native';
import BottomBanner from './components/BottomBanner';
import Reservation from './screens/reservation/Reservation';
import LogScreen from './screens/log/LogScreen';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<LogScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/check" element={<CheckPage />} />
          <Route path="/details" element={<DetailsHome />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
        <BottomBanner />
      </NativeRouter>
    </RecoilRoot>
  );
};

export default App;
