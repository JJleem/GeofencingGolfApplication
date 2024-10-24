import React, {useState} from 'react';
import {FlatList, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import styled from 'styled-components/native';
import Page from './Page';

interface ICarousel {
  gap: number;
  offset: number;
  pages: any[];
  pageWidth: number;
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
`;
const FlatListStyle = styled(FlatList)``;

export default function Carousel({pages, pageWidth, gap, offset}: ICarousel) {
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태

  const renderItem = ({item}: any) => {
    return (
      <Page item={item} style={{width: pageWidth, marginHorizontal: gap / 2}} />
    );
  };

  // 스크롤 이벤트 핸들링
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setCurrentPage(newPage); // 현재 페이지 업데이트
  };

  return (
    <FlatListStyle
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={{
        paddingHorizontal: offset + gap / 2,
      }}
      data={pages}
      decelerationRate="fast"
      horizontal
      keyExtractor={(item: any) => `page__${item.color}`}
      onScroll={onScroll}
      pagingEnabled
      renderItem={renderItem}
      snapToInterval={pageWidth + gap} // 페이지 너비 + 간격으로 스냅
      snapToAlignment="start" // 시작 위치에 스냅
      showsHorizontalScrollIndicator={true}
      bounces={false} // 스크롤 바운스 비활성화
    />
  );
}
