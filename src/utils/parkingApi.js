import axios from 'axios';
import { jsonHeader, urls } from 'src/libs/reqConf';

const getParkings = async () => {
  const url = urls.getParkings;
  const ACCESSTOKEN = window.localStorage.getItem('accessToken');
  const config = { headers: jsonHeader(), ACCESSTOKEN };

  const response = await axios.get(url, config);
};
