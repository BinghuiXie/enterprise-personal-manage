import axios from 'axios'
axios.defaults.withCredentials = true;

export const handleLogin = (data, url) => {
  return axios.post(url, {
    username: data.name,
    password: data.pwd
  })
};