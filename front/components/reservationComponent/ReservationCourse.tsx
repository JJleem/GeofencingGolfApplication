import React, {useState} from 'react';
import {Text} from '../../theme/theme';
import {
  CourseDropDown,
  CourseDropDownItem,
  CourseItem,
  CourseTitle,
  MemberView,
  ModalCenterView,
  ModalView,
  ReservationBTN,
  SectionItemBox,
  SectionItemComp,
  SectionItemInner,
} from './ReservationStyle';
import {Modal, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import mockupdata from '../../mock/mockupdata.json';
import {useRecoilState} from 'recoil';
import {SelectCourse} from '../../atom/atom';

const ReservationCourse = () => {
  const [selectCourse, setSelectCourse] = useRecoilState(SelectCourse);
  const [isCourse, setIsCourse] = useState(false);
  const handleSelectCourse = (item: string) => {
    setSelectCourse(item);
    setIsCourse(false);
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
          <Text style={{fontWeight: 'bold', fontSize: 16}}>코스선택</Text>
        </View>
        <SectionItemComp>
          <MemberView>
            <Text
              style={{
                width: 250,

                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {selectCourse}
            </Text>
          </MemberView>
          <CourseDropDown
            onPress={() => setIsCourse(!isCourse)}
            style={{
              flexDirection: 'row',
              gap: 15,
              alignItems: 'center',
            }}>
            <Icon
              name={isCourse ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={24}
              color="#1e1e1e"
            />
            {isCourse && (
              <Modal
                transparent={true}
                visible={isCourse}
                animationType="slide"
                onRequestClose={() => {
                  setIsCourse(false);
                }}>
                <ModalCenterView onPress={() => setIsCourse(false)}>
                  <ModalView
                    onTouchStart={e => {
                      e.stopPropagation(); // 모달 내부 클릭 시 이벤트 전파 방지
                    }}
                    style={{
                      zIndex: 2,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5,
                      paddingTop: 0,
                    }}>
                    <CourseDropDownItem>
                      <CourseTitle>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 14,
                            color: '#000',
                          }}>
                          코스를 선택해주세요.
                        </Text>
                      </CourseTitle>
                      {mockupdata.reservationInformation.course_info.map(
                        (item, index) => (
                          <CourseItem
                            style={({pressed}) => [
                              {
                                backgroundColor: pressed
                                  ? '#d9d9d9'
                                  : 'transparent',
                                color: pressed ? '#8a8a8a' : 'transparent',
                              },
                            ]}
                            key={index}
                            onPress={() => handleSelectCourse(item)}>
                            <Text>{item}</Text>
                          </CourseItem>
                        ),
                      )}
                    </CourseDropDownItem>
                    <ReservationBTN
                      activeOpacity={0.1}
                      onPress={() => setIsCourse(!isCourse)}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        확인
                      </Text>
                    </ReservationBTN>
                  </ModalView>
                </ModalCenterView>
              </Modal>
            )}
          </CourseDropDown>
        </SectionItemComp>
      </SectionItemInner>
    </SectionItemBox>
  );
};

export default ReservationCourse;
