import React, { useEffect, useState } from 'react'
import Header from "../../components/header";
import { useRedirect } from "../../customHook";

const Info = props => {
  useRedirect();
  const [ userData, setUserData ] = useState({});
  
  useEffect(() => {
    setUserData(props.userData)
  }, [props.userData]);
  
  return (
    <div>
      <Header title="个人中心" avatar={ userData.avatar }/>
    </div>
  )
};

export default Info