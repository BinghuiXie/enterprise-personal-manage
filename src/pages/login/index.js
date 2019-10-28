import React, { useRef, useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { handleLogin } from "../../axios";
import { LOGIN_BASE_URL } from "../../constants";
import './index.scss'

function Login (props) {
  const history = useHistory();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  
  const [ resData, setResData ] = useState(null);
  
  useEffect(() => {
    if (resData) {
      if (resData.errno) {
        // 登录成功
        console.log('resData: ', resData);
        props.onUserDataObtained(resData.data);
        if (parseInt(resData.data.ability) === 1) {
          // 管理员
          history.push("/manageInfo");
        } else {
          // 普通用户
          history.push("/info");
        }
      } else {
        // 登录失败
        console.log(resData);
        alert("用户名或密码不存在，是否要使用当前用户名和密码创建一个新的账户？")
      }
    }
  });
  
  function handleUserLogin() {
    const name = usernameRef.current.value,
          pwd = passwordRef.current.value;
    
    if (name !== '' && pwd !== '') {
      loginControl(name, pwd);
    } else {
      alert('输入不能为空');
    }
  }
  
  function loginControl(name, pwd) {
    const response = handleLogin({ name, pwd }, LOGIN_BASE_URL);
    response.then(res => {
      setResData(res.data);
    })
  }
  
  return (
    <div className="login-wrapper">
      <div className="inner-wrapper">
        <div className="title">企业人事管理系统</div>
        <div className="input-wrapper">
          <div className="username user-info">
            <span className="iconfont user-icon">&#xe645;</span>
            <input type="text" placeholder="请输入用户名" ref={usernameRef}/>
          </div>
          <div className="password user-info">
            <span className="iconfont user-icon">&#xe662;</span>
            <input type="password" placeholder="请输入密码" ref={passwordRef}/>
          </div>
        </div>
        <button
          className="login-button"
          onClick={handleUserLogin}
        >
          登录
        </button>
      </div>
    </div>
  )
}

export default Login