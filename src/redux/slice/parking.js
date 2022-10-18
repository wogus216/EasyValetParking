import axios from 'axios';
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
    getParkingsSuccess(state, action) {
      console.log('action.payload==>', action.payload);
      state.isLoading = false;
      state.parkings = action.payload;
    },
  },
});

// export const getParkings = async (dispatch) => {
//   const url = urls.getParkings;
//   const config = { headers: accessTokenHeaders(token) };

//   const response = await axios.get(url, config);
//   const { data } = response.data.data;
//   console.log('data==>', data);
//   console.log('response==>', response);
//   dispatch(slice.actions.getParkings(...data));
// };

export function getParkings() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const url = urls.getParkings;
    const config = { headers: accessTokenHeaders(token) };
    try {
      const response = await axios.get(url, config);
      const { data } = response.data;
      console.log('data==>', data);
      console.log('response==>', response);
      dispatch(slice.actions.getParkingsSuccess(data));
    } catch (error) {
      console.log('error==>', error.response);
    }
  };
}

// reducer
export default slice.reducer;
// actions
export const parkingsActions = slice.actions;
