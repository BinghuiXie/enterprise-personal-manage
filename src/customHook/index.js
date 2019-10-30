import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCookie } from "../utli";

export const useUserData = data => {
  const [ userData, setUserData ] = useState({});
  
  useEffect(() => {
    setUserData(data)
  }, [data]);
  
  return userData;
};

/* 路由拦截 */
export const useRedirect = () => {
  const history = useHistory();
  
  useEffect(() => {
    const cookie = getCookie();
    if (cookie.AuthKey === undefined) {
      // 没有登录
      history.push('/login');
    }
  }, [history])
};