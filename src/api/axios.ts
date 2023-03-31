import axios from 'axios';
import { API } from '../consts';

const axiosInstance = axios.create({
  baseURL: API,
});

export const $api = axiosInstance;
