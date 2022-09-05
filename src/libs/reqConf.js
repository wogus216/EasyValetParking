const weatherHost = process.env.REACT_APP_WEATHER_API;
const weatherKey = process.env.REACT_APP_WEATHER_KEY;
const host = process.env.REACT_APP_API_URL;
console.log('host', host);
export const urls = {
  weather: `${weatherHost}/data/2.5/weather?q=Seoul&appid=${weatherKey}`,
  member: `${host}/member`,
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
  Authorization: `Bearer ${token}`,
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
