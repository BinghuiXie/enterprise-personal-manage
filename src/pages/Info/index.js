import React, { useEffect } from 'react'
import { useRedirect } from "../../utli";

const Info = props => {
  useRedirect();
  
  useEffect(() => {
    console.log(props.userData);
  });
  
  return (
    <div>用户</div>
  )
};

export default Info