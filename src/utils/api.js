import axios from 'axios';
import { urls, jsonHeader } from 'src/libs/reqConf';

// 날씨 받아오기
const weatherData = async () => {
  const url = urls.weather;
  const config = { headers: jsonHeader() };
  const response = await axios.get(url, config);

  return response.data;
};

// 이메일 중복체크
const emailCheck = async (params) => {
  console.log('email params', params);
  const url = `${urls.member}/${params}`;
  const config = jsonHeader();
  const response = await axios.get(url, config);
  console.log('response', response.data);
};

// 전체 회원조회
const getAllMembers = async () => {
  const url = urls.getMembers;
  const config = { headers: jsonHeader() };
  const response = await axios.get(url, config);
  console.log('회원정보요청', response.data);
  return response.data;
};

export { weatherData, emailCheck, getAllMembers };
