import axios from 'axios';
import { urls, jsonHeader } from 'src/libs/reqConf';

export const weatherData = async () => {
  const url = urls.weather;
  const config = { headers: jsonHeader() };
  const response = await axios.get(url, config);

  return response.data;
};
