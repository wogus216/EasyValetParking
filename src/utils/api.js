import axios from 'axios';
import { urls, jsonHeader } from 'src/libs/reqConf';

// 날씨 받아오기
export const weatherData = async () => {
  const url = urls.weather;
  const config = { headers: jsonHeader() };
  const response = await axios.get(url, config);

  return response.data;
};

// 전체 회원조회

export const getAllMembers = async () => {
  const url = urls.getMembers;
  const config = { headers: jsonHeader() };
  const response = await axios.get(url, config);
  console.log('회원정보요청', response.data);
  return response.data;
};
