import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
import axios from 'axios';

// 토큰 검사
const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};
// 토큰, 자동로그인 저장
const setSession = (accessToken, remember) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('remember', remember);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    localStorage.setItem('remember', remember);
    delete axios.defaults.headers.common.Authorization;
  }
};

const getPayload = (accessToken) => {
  const payload = jwtDecode(accessToken);

  return {
    userId: payload?.userId,
    displayName: payload?.displayName,
    email: payload?.email,
    photoURL: payload?.photoURL,
    phoneNumber: payload?.phoneNumber,
    country: payload?.country,
    facebookLink: payload?.facebookLink,
    instagramLink: payload?.instagramLink,
    linkedinLink: payload?.linkedinLink,
    twitterLink: payload?.twitterLink,
    moto: payload?.moto,
    jobTitle: payload?.jobTitle,
    ultimateVision: payload?.ultimateVision,
    about: payload?.about,
    mentor: payload?.mentor,
    mentee: payload?.mentee,
  };
};

export { isValidToken, setSession, verify, sign, getPayload };
