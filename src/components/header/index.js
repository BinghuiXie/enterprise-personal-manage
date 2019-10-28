import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { handleLogout } from '../../axios'

import './index.scss'

const Menu = props => {
  const history = useHistory();
  
  const onUserLogout = () => {
    handleLogout();
  
    history.push('/login');
  };
  
  const onMenuItemClick = (event) => {
    switch (event.currentTarget.children[1].innerText) {
      case '个人中心':
        // 跳转到个人中心
        history.push('/personal');
      case '退出登录':
        onUserLogout();
      default:
        return ;
    }
  };
  
  return (
    props.showMenu ?
      <div className="menu-wrapper">
        <ul className="menu-list">
          <li className="menu-item" onClick={ onMenuItemClick }>
            <span className="iconfont">&#xe672;</span>
            <span>个人中心</span>
          </li>
          <li className="menu-item" onClick={ onMenuItemClick }>
            <span className="iconfont">&#xe637;</span>
            <span>退出登录</span>
          </li>
        </ul>
      </div>
      : null
  )
};

const Header = props => {
  const [ menu, setMenu ] = useState(false);
  const showMenu = () => {
    setMenu(!menu);
  };
  
  return (
    <div className="header-wrapper">
      <div className="header-container">
        <div className="title">{ props.title }</div>
        <div
          className="personal-space"
          onClick={showMenu}
        >
          <img className="avatar" src={ props.avatar } alt="头像"/>
          <span className="iconfont">&#xe671;</span>
        </div>
        <Menu showMenu={ menu }/>
      </div>
    </div>
  )
};

export default Header