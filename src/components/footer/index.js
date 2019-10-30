import React from 'react';
import { a } from 'react-router-dom';

import './index.scss'

const Footer = props => {
  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div>
          <h4 className="title">
            <span className="iconfont">&#xe64a;</span>
            Github
          </h4>
          <a
            className="link"
            href="https://github.com/BinghuiXie/enterprise-personal-manage">项目地址</a>
        </div>
        <div>
          <h4 className="title">
            <span className="iconfont">&#xe911;</span>
            博客
          </h4>
          <a
            className="link"
            href="http://binghuixie.cn/">我的博客</a>
        </div>
        <div>
          <h4 className="title">
            <span className="iconfont">&#xe668;</span>
            Issue&PR
          </h4>
          <a
            className="link"
            href="https://github.com/BinghuiXie/enterprise-personal-manage/issues"
          >
            欢迎提Issues！
          </a>
          <a href="https://github.com/BinghuiXie/enterprise-personal-manage/pulls" className="link">
            Pull Requests
          </a>
        </div>
        <div>
          <h4 className="title">
            Copyright © 2019 不会拉小提琴的左脚
          </h4>
          <a
            className="link"
            href="https://github.com/BinghuiXie/enterprise-personal-manage/blob/master/README.md">README</a>
        </div>
      </div>
    </div>
  )
};

export default Footer