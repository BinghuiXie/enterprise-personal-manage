import React from 'react';
import './index.scss'

const Header = props => {
  return (
    <div className="header-wrapper">
      <div className="header-container">
        <div className="title">{ props.title }</div>
        <div className="personal-space">
          <img className="avatar" src={ props.avatar } alt="头像"/>
          <span className="iconfont">&#xe671;</span>
        </div>
      </div>
    </div>
  )
};

export default Header