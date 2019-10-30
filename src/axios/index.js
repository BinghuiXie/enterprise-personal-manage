import axios from 'axios'
import { LOGOUT_BASE_URL } from "../constants";

axios.defaults.withCredentials = true;

export const handleLogin = (data, url) => {
  return axios.post(url, {
    username: data.name,
    password: data.pwd
  })
};

export const handleLogout = () => {
  /* 前端删除 AuthKey */
  document.cookie = 'AuthKey=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  /* 后端删除 AuthKey */
  axios.post(LOGOUT_BASE_URL, {
    logout: true
  });
  /* 前端删除缓存中的用户数据 */
  localStorage.removeItem("userData");
};

export const validatePassword = (passwordObj, url) => {
  return axios.post(url, {
    oldPassword: passwordObj.oldValue,
    newPassword: passwordObj.newValue,
    username: passwordObj.username
  });
};

export const changeUserInfo = (userData, url) => {
  return axios.post(url, userData);
};