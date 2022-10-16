import axios from 'axios';
import { useDispatch } from 'react-redux';
import { urls, headers, accessTokenHeaders } from 'src/libs/reqConf';

const { createSlice } = require('@reduxjs/toolkit');

// 토큰
const token = window.localStorage.getItem('accessToken');

const initialState = {
  isLoading: false,
  error: false,
  parkings: [],
};

const slice = createSlice({
  name: 'parkings',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    getParkings(state, action) {
      state.isLoading = false;
      state.parkings = action.payload;
    },
  },
});

export const getParkings = async () => {
  try {
    const url = urls.getParkings;
    // const url = '/parkings';
    const config = { headers: accessTokenHeaders(token) };

    const response = await axios.get(url, config);
    console.log('response==>', response);
    // dispatch(slice.actions.getParkings())
  } catch (error) {
    console.log('에러메시지', error.response);
  }
};

// reducer
export default slice.reducer;
// actions
// eslint-disable-next-line no-empty-pattern
export const {} = slice.actions;
