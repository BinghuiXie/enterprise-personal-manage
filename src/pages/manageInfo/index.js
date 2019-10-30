import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { isAdministrator, getCookie } from "../../utli";
import { useUserData, useRedirect } from "../../customHook";

import Header from "../../components/header";

const ManageInfo = props => {
  const history = useHistory();
  
  useRedirect();
  
  const userData = useUserData(props.userData);
  
  useEffect(() => {
    const cookie = getCookie();
    if (!isAdministrator(cookie.AuthKey, ",")) {
      // 不是管理员
      history.push('/info');
    }
  }, [history]);
  
  return (
    <div>
      <Header title="人事管理系统" avatar={ userData.avatar }/>
      
    </div>
  )
};

export default ManageInfo