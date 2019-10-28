import axios from 'axios'
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
  axios.post('/logout', {
    logout: true
  })
};