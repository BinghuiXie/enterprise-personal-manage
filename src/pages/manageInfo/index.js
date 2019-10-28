import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRedirect, isAdministrator, getCookie } from "../../utli";

import Header from "../../components/header";

const ManageInfo = props => {
  const history = useHistory();
  const [ userData, setUserData ] = useState({});
  
  useRedirect();
  
  useEffect(() => {
    const cookie = getCookie();
    const { userData } = props;
    setUserData(userData);
    if (!isAdministrator(cookie.AuthKey, ",")) {
      // 不是管理员
      history.push('/info');
    }
  }, [ props.userData ]);
  
  return (
    <div>
      <Header title="人事管理系统" avatar={ userData.avatar }/>
    </div>
  )
};

export default ManageInfo