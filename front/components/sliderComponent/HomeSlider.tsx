import React from 'react';
import {Dimensions, SafeAreaView, View} from 'react-native';
import Carousel from './Carousel';

const screenWidth = Math.round(Dimensions.get('window').width);
const PAGES = [
  {
    num: 1,
    color: '#6b6b6b',
  },
  {
    num: 2,
    color: '#6b6b6b',
  },
  {
    num: 3,
    color: '#6b6b6b',
  },
  {
    num: 4,
    color: '#6b6b6b',
  },
  {
    num: 5,
    color: '#6b6b6b',
  },
  {
    num: 6,
    color: '#6b6b6b',
  },
  {
    num: 7,
    color: '#6b6b6b',
  },
  {
    num: 8,
    color: '#6b6b6b',
  },
  {
    num: 9,
    color: '#6b6b6b',
  },
  {
    num: 10,
    color: '#f0f',
  },
  {
    num: 11,
    color: '#ffd',
  },
];

const HomeSlider = () => {
  return <Carousel gap={2} offset={1} pages={PAGES} pageWidth={35} />;
};

export default HomeSlider;
