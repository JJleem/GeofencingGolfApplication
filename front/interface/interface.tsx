// export interface LocationData {
//   isCheck?: string; // isCheck 속성 (선택적)
//   name?: string; // name 속성 (선택적)
//   id?: number;
//   location?: {
//     accuracy?: number; // 정확도
//     altitude?: number; // 고도
//     bearing?: number; // 방위각
//     elapsedRealtimeNanos?: number; // 경과 시간 (나노초)
//     latitude?: number; // 위도
//     longitude?: number; // 경도
//     provider?: string; // 위치 제공자
//     speed?: number; // 속도
//     time?: number; // 시간 (밀리초)
//   };
//   reservation?: {
//     date?: string;
//     course?: string;
//     hall?: string;
//     condition?: string;
//     party?: string;
//   };
// }

export interface LocationInfo {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number;
  speed: number;
  bearing: number;
  provider: string;
  time: string;
  requestId: string;
  isCheck?: boolean | null; // timestamp가 숫자형
}
export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number;
  speed: number;
  bearing: number;
  provider: string;
  time: number; // timestamp가 숫자형
  requestId: string;
  isCheck?: boolean | null;
}
export interface ReservationInfo {
  reservationNum?: number;
  date?: string;
  course_info?: string[];
  locker_info?: number;
  isCheck?: boolean | null;
  requestId?: string;
  tee_info?: string[];
}

export interface UserInfo {
  userNum?: number;
  id?: string;
  pwd?: string;
  name?: string;
  birthdate?: string;
  phone?: string;
  gender?: string;
}

export interface UserReservationType {
  requestId?: string;
  reservationNum?: number;
  date?: string;
  course_info?: string;
  tee_info?: string;
  persons?: number;
  isCheck?: boolean;
  memberId?: string;
}

export interface UserDetailType {
  memberNum?: number;
  id?: string;
  pwd?: string;
  name?: string;
  birthdate?: string;
  phone?: string;
  gender?: string;
}
export interface GetReservationType {
  reservationNum: number;
  course_info: string;
  date: string;
  locker_info: number;
  persons: number;
  tee_info: string;
  memberId: string;
}

export type GetReservationResponse = GetReservationType[];

export interface PostUserDataType {
  id?: string;
  pwd?: string;
}
export interface UserData {
  id?: string;
  memberNum?: number;
  pwd?: string;
}
