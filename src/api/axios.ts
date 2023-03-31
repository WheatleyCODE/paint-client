import axios from 'axios';
import { API } from '../consts/api.consts';

const axiosInstance = axios.create({
  baseURL: API,
});

export const $api = axiosInstance;
