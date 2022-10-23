const weatherHost = process.env.REACT_APP_WEATHER_API;
const weatherKey = process.env.REACT_APP_WEATHER_KEY;
const host = process.env.REACT_APP_API_URL;
console.log('host', host);
export const urls = {
  // 날씨
  weather: `${weatherHost}/data/2.5/weather?q=Seoul&appid=${weatherKey}`,
  // 회원가입, 수정,삭제,조회는 뒤에 {id} 붙이기 로그인은 sign-in
  // member: `${host}/member`,
  member: '/api/member',
  // 회원조회
  // getMembers: `${host}/users`,
  getMembers: `/api/parkings`,
  // 파킹 조회
  // getParkings: `${host}/parkings`,
  getParkings: `/api/parkings`,
  getParkingArea: '/api/parking-count',
  postParkingTicket: '/api/ticket',
  getVipName: '/api/vip/name',
  getVipCarNumber: '/api/vip/car-number',
};

// 파일 업로드 헤더
export const formDataHeaders = (token) => ({
  'Content-Type': 'multipart/form-data',
  Authorization: `Bearer ${token}`,
});

// url encode
export const urlencodedHeaders = () => ({
  'Content-Type': 'applicatin/x-www.form-urlencoded; text/html',
});

// 일반 헤더
export const jsonHeader = () => ({
  'Content-Type': 'application/json',
});

// jwt 헤더

export const headers = (token) => ({
  'Content-Type': 'application/json',
});

// jwt 헤더

export const accessTokenHeaders = (token) => ({
  'Content-Type': 'application/json',
  ACCESSTOKEN: token,
});

// 파일 업로드 폼데이터 변환
export const objectToFormData = (object) => {
  const formData = new FormData();

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in object) {
    formData.append(key, object[key]);
  }

  return formData;
};
