import React, { useState, useRef } from 'react';
import { Button, Input  } from 'antd';
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useUserData, useRedirect } from "../../customHook";
import { validatePassword, changeUserInfo } from "../../axios";
import { setCache } from "../../utli";
import { PASSWORD_VALIDATION_URL, USER_INFO_CHANGE_URL } from "../../constants";

import './index.scss'

const ChangeInfo = props => {
  
  const [ inputValue, setInputValue ] = useState(props.value);
  const inputRef = useRef(null);
  const passwordRef = useRef(null);
  
  const cancelChangeInfo = () => {
    props.cancelInfoChange();
  };
  
  const handleInfoChange = event => {
    setInputValue(event.target.value);
  };
  
  const setNewInfoSuccess = event => {
    if (props.value) {
      // 修改其他
      props.setNewInfo(inputRef.current.props.value, props.type)
    } else {
      // 修改密码
      let passwordObj = {};
      const [ oldPassword, newPassword, confirmPassword ] = passwordRef.current.children;
      if (oldPassword.value === "" || newPassword.value === "" || confirmPassword.value === "") {
        alert("输入不能为空！");
      } else {
        if (newPassword.value !== confirmPassword.value) {
          alert('两次输入密码不一样，请重新输入');
          newPassword.value = "";
          confirmPassword.value = "";
        } else {
          passwordObj["oldValue"] = oldPassword.value;
          passwordObj["newValue"] = newPassword.value;
          passwordObj["username"] = props.username;
          const validateResult = validatePassword(passwordObj, PASSWORD_VALIDATION_URL);
          validateResult.then((res) => {
            const data = res.data;
            if (data.errno === 1) {
              // 修改密码成功
              alert("修改密码成功！");
              props.setPasswordSuccess();
            } else {
              // 修改密码失败
              alert("原密码输入不正确，请重新输入");
              oldPassword.value = "";
            }
          })
        }
      }
    }
  };
  
  return (
    <div className="change-info">
      {
        props.value === "" ?
          <div className="password-box" ref={ passwordRef }>
            <Input placeholder="输入旧密码"/>
            <Input placeholder="输入新的密码" type="password"/>
            <Input placeholder="确认密码" type="password"/>
          </div>
          :
          <Input ref={ inputRef } value={ inputValue } onChange={ handleInfoChange }/>
      }
      <Button onClick={ cancelChangeInfo }>取消</Button>
      <Button type="primary" onClick={ setNewInfoSuccess }>确定</Button>
    </div>
  )
};

const Personal = props => {
  useRedirect();
  
  const [ username, setUsername ] = useState(false);
  const [ email, setEmail ] = useState(false);
  const [ password, setPassword ] = useState(false);
  
  const userData = useUserData(props.userData);
  let oldUsername = userData.username;
  
  const handleInfoChange = event => {
    const target = event.target.value;
    switch (target) {
      case 'username':
        setUsername(true);
        break;
      case 'email':
        setEmail(true);
        break;
      case 'password':
        setPassword(true);
        break;
      default:
        return ;
    }
  };
  
  const setNewUserInfo = (newValue, type) => {
    userData[type] = newValue;
    userData["previousName"] = oldUsername;
    switch (type) {
      case 'username':
        setUsername(false);
        break;
      case 'email':
        setEmail(false);
        break;
      case 'password':
        setPassword(false);
        break;
      default:
        return ;
    }
  };
  
  const saveChange = () => {
    changeUserInfo(userData, USER_INFO_CHANGE_URL).then(res => {
      if (res.data.errno === 1) {
        // 修改个人信息成功
        oldUsername = userData.username;
        const { previousName, ...cacheData } = userData;
        setCache(cacheData, "userData");
        alert(res.data.message)
      } else {
        alert("修改个人信息失败");
      }
    })
  };
  
  return (
    <div className="personal-center">
      <Header title="个人中心" avatar={userData.avatar}/>
      <div className="info-container">
        <div className="inner-container">
          <h1 className="title">个人设置</h1>
          <div className="personal-settings">
            <div className="avatar-setting">
              <img src={userData.avatar} alt=""/>
            </div>
            <div className="setting-list userid">
              <span className="setting-item">用户Id</span>
              <span style={{ marginRight: 24 }}>{ userData.userId }</span>
            </div>
            <div className="setting-list userid">
              <span className="setting-item">用户名</span>
              {
                username ?
                  <ChangeInfo
                    type="username"
                    setNewInfo={ setNewUserInfo }
                    cancelInfoChange={ () => { setUsername(false) } }
                    value={ userData.username }
                    username={ userData.username }
                  />
                  :
                  <div style={{ display: 'inline-block' }}>
                    <span style={{ marginRight: 24 }}>{ userData.username }</span>
                    <Button value="username" onClick={ handleInfoChange }>修改</Button>
                  </div>
              }
            </div>
            <div className="setting-list userid">
              <span className="setting-item">Email</span>
              {
                email ?
                  <ChangeInfo
                    type="email"
                    setNewInfo={ setNewUserInfo }
                    cancelInfoChange={ () => { setEmail(false) } }
                    value={ userData.email }
                    username={ userData.username }
                  />
                  :
                  <div style={{ display: 'inline-block' }}>
                    <span style={{ marginRight: 24 }}>{ userData.email }</span>
                    <Button value="email" onClick={ handleInfoChange }>修改</Button>
                  </div>
              }
            </div>
            <div className="setting-list userid">
              <span className="setting-item">密码</span>
              {
                password ?
                  <ChangeInfo
                    type="password"
                    cancelInfoChange={ () => { setPassword(false) }}
                    value=""
                    username={ userData.username }
                    setPasswordSuccess={ () => { setPassword(false)} }
                  />
                  :
                  <div style={{ display: 'inline-block' }}>
                    <span style={{ marginRight: 24 }}>{ userData.password }</span>
                    <Button value="password" onClick={ handleInfoChange }>修改</Button>
                  </div>
              }
            </div>
          </div>
          <Button type="primary" onClick={ saveChange }>保存</Button>
        </div>
      </div>
      <Footer />
    </div>
  )
};

export default Personal;