import axios from 'axios';
import MySnackbar from 'src/components/Snackbar';
import { urls, headers, tokenHeaders } from 'src/libs/reqConf';

const { createSlice } = require('@reduxjs/toolkit');

// 토큰
const accessToken = window.localStorage.getItem('accessToken');
const refreshToken = window.localStorage.getItem('refreshToken');
const user = window.localStorage.getItem('user');
const initialState = {
  isLoading: false,
  error: false,
  parkings: [],
  parkingArea: [],
  vipData: [],
  exitParkingWaitList: [],
};

const slice = createSlice({
  name: 'parkings',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    getParkingsSuccess(state, action) {
      console.log('getParkingsSuccess action.payload==>', action.payload);
      state.isLoading = false;
      state.parkings = action.payload;
    },
    getParkingsAreaSuccess(state, action) {
      console.log('getParkingsAreaSuccess action.payload==>', action.payload);
      state.isLoading = false;
      state.parkingArea = action.payload;
    },
    postParkingTicketSuccess(state, action) {
      console.log('postParkingTicketSuccess action.payload==>', action.payload);
      const newParkingTicket = action.payload;
      state.isLoading = false;
      state.parkings = [...state.parkings, newParkingTicket];
    },
    getVipDataSuccess(state, action) {
      console.log('getVipDataSuccess action.payload==>', action.payload);
      state.isLoading = false;
      state.vipData = action.payload;
      console.log('state.vipData==>', state.vipData);
    },
    postExitParkingSuccess(state, action) {
      console.log('postExitParkingSuccess action.payload==>', action.payload);
      state.isLoading = false;
      state.exitParkingWaitList = [...state.exitParkingWaitList, action.payload];
      console.log('state.exitParkingWaitList==>', state.vipData);
    },
  },
});

// 입차 데이터 불러오기
export function getParkings() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const url = urls.getParkings;
    const config = { headers: tokenHeaders(accessToken, refreshToken) };
    try {
      const response = await axios.get(url, config);
      const { data } = response.data;
      console.log('입차 데이터 response', response);
      console.log('getParkings data==>', data);
      dispatch(slice.actions.getParkingsSuccess(data));
    } catch (error) {
      console.log('error==>', error.response);
    }
  };
}
// 구역별 데이터 불러오기
export const getParkingArea = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  const url = urls.getParkingArea;
  const config = { headers: tokenHeaders(accessToken, refreshToken) };
  try {
    const response = await axios.get(url, config);
    const { data } = response.data;
    console.log('getParkingArea data==>', data);
    dispatch(slice.actions.getParkingsAreaSuccess(data));
  } catch (error) {
    console.log('error==>', error.response);
  }
};

// 주차 티켓등록
export const postParkingTicket = (parkingData) => async (dispatch) => {
  console.log('parkingData-->', parkingData);
  dispatch(slice.actions.startLoading());
  const url = urls.postParkingTicket;
  const body = parkingData;
  const config = { headers: tokenHeaders(accessToken, refreshToken) };
  try {
    const response = await axios.post(url, body, config);
    const { data } = response.data;

    console.log('postParkingTicket data==>', data);
    if (data === '성공') {
      dispatch(parkingsActions.postParkingTicketSuccess(parkingData));
      dispatch(getParkingArea());
      dispatch(getParkings());
    } else {
      // eslint-disable-next-line no-alert
      alert('입차에 실패했습니다., 티켓번호를 다시확인해주세요');
    }
  } catch (error) {
    console.log('error', error.response);
  }
};

// vip 이름으로 조회
export const getVipName = (name) => async (dispatch) => {
  console.log('name', name);
  dispatch(slice.actions.startLoading());
  const url = `${urls.getVipName}/${name}`;
  console.log('url-->', url);
  const config = { headers: tokenHeaders(accessToken, refreshToken) };
  try {
    const response = await axios.get(url, config);
    const { data } = response.data;
    console.log('getVipDataSuccess data==>', data.data);
    dispatch(parkingsActions.getVipDataSuccess(data.data));
  } catch (error) {
    console.log('error', error.response);
  }
};

// vip 차량번호로 조회
export const getVipCarNumber = (carNumber) => async (dispatch) => {
  dispatch(parkingsActions.startLoading());
  const url = `${urls.getVipCarNumber}/${carNumber}`;
  const config = { headers: tokenHeaders(accessToken) };
  try {
    const response = await axios.get(url, config);
    const { data } = response.data;
    console.log('getVipDataSuccess data==>', data.data);
    dispatch(parkingsActions.getVipDataSuccess(data.data));
  } catch (error) {
    console.log('error', error.response);
  }
};

// 출차 또는 외출 요청
export const postExitParking = (ticketId, exitType) => async (dispatch) => {
  dispatch(parkingsActions.startLoading());
  const url = urls.postExitParking;
  const body = {
    memberId: user.id,
    parkingRecordId: ticketId,
    exitType,
  };
  const config = { headers: tokenHeaders(accessToken, refreshToken) };
  try {
    const response = await axios.post(url, body, config);
    const { data } = response.data;
    console.log('postExitParkingSuccess data==>', data.data);
    // dispatch(parkingsActions.postExitParkingSuccess(data.data));
  } catch (error) {
    console.log('error', error.response);
  }
};

// reducer
export default slice.reducer;
// actions
export const parkingsActions = slice.actions;
