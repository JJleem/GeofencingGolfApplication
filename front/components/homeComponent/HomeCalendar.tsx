import React from 'react';
import {Calendar, LocaleConfig, DateData} from 'react-native-calendars';
import {useRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {DateSelected, ModalCalendar} from '../../atom/atom';
import {CalendarView} from './HomeScreenStyle';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

LocaleConfig.defaultLocale = 'ko';

const HomeCalendar: React.FC = () => {
  const [isClick, setIsClick] = useRecoilState(ModalCalendar);
  const [selectedDate, setSelectedDate] = useRecoilState(DateSelected);
  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 ISO 형식으로 가져오기

  const markedDates: {
    [key: string]: {
      selected?: boolean;
      marked?: boolean;
      selectedColor?: string;
      disabled?: boolean;
      color?: string;
    };
  } = {
    [selectedDate]: {
      selected: true,
      marked: true,
      selectedColor: 'skyblue', // 선택된 날짜의 색상
    },
  };

  // 오늘 날짜 이전의 날짜 마킹
  const getMarkedDates = (): {
    [key: string]:
      | {disabled?: boolean; color?: string}
      | {selected: boolean; marked: boolean; selectedColor: string};
  } => {
    const dates: {
      [key: string]:
        | {disabled?: boolean; color?: string}
        | {selected: boolean; marked: boolean; selectedColor: string};
    } = {};
    const date = new Date();

    for (let i = 0; i < 1000; i++) {
      // 지난 30일을 체크
      date.setDate(date.getDate() - 1);
      const dateString = date.toISOString().split('T')[0];
      dates[dateString] = {
        disabled: true, // 클릭 불가
        color: 'lightgray', // 회색으로 표시
      };
    }

    return {...dates, ...markedDates};
  };

  return (
    <CalendarView>
      <Calendar
        current={selectedDate}
        onDayPress={(day: DateData) => {
          // DateData 타입으로 매개변수 타입 지정
          if (day.dateString >= today) {
            // 오늘 날짜 이후만 선택 가능
            setSelectedDate(day.dateString);
            console.log('day', day);
            setIsClick(false);
          }
        }}
        monthFormat={'yyyy MM'}
        hideExtraDays={true}
        firstDay={1}
        markedDates={getMarkedDates()} // 마킹된 날짜 가져오기
      />
    </CalendarView>
  );
};

export default HomeCalendar;
