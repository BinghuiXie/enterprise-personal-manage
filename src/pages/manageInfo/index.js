import React, { useState, useEffect, useRef } from 'react';
import { Layout, Input, Button, Table, Divider, Radio } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  isAdministrator,
  getCookie,
  generateJobNumber,
  getCurrentTime,
  generateRandomInt,
  compareByKey,
  search
} from "../../utli";
import { getUserList, addNewUser } from "../../axios";
import { useUserData, useRedirect } from "../../customHook";
import { ADD_NEW_USER_URL } from "../../constants";

import Header from "../../components/header";
import Footer from "../../components/footer";
import './index.scss'

const { Sider, Content } = Layout;
const { Search } = Input;
const { Column } = Table;

const AddWindow = props => {
  
  const [ currentTime, setCurrentTime ] = useState(0);
  const [ jobNumber, setJobNumber ] = useState(0);
  const [ married, setMarried ] = useState(0);
  const [ admin, setAdmin ] = useState(0);
  const [ gender, setGender ] = useState(0);
  const [ showWindow, setShowWindow ] = useState(props.showWindow);
  
  const addList = useRef(null);
  useEffect(() => {
    const time = getCurrentTime();
    setCurrentTime(time);
    if (currentTime) {
      setJobNumber(generateJobNumber(currentTime));
    }
  }, [ currentTime ]);
  useEffect(() => {
    setShowWindow(props.showWindow)
  }, [ props.showWindow ]);
  const onRadioChange = (e) => {
    setMarried(e.target.value);
  };
  const onAdminChange = e => {
    setAdmin( e.target.value );
  };
  const onGenderChange = e => {
    setGender( e.target.value );
  };
  const handleAddUser = () => {
    const dataList = addList.current.children;
    let inputList = [];
    let newUserData = {};
    newUserData["fired"] = 0;
    newUserData["userId"] = generateRandomInt(100, 10000);
    newUserData["boss"] = generateRandomInt(0, 10);
    newUserData["avatar"] = 'http://suo.im/58j6ky';
    Array.from(dataList).map(item => {
      if (item.lastChild.childNodes.length <= 1) {
        // 非单选框
        inputList.push(item.lastChild)
      }
    });
    inputList.map(item => {
      newUserData[item.name] = item.value;
    });
    newUserData['gender'] =  gender === 0 ? '女' : '男';
    newUserData['married'] =  married === 0 ? '否' : '是';
    newUserData['ability'] =  admin === 0 ? '否' : '是';
  
    addNewUser(newUserData, ADD_NEW_USER_URL).then(res => {
      if (res.data.errno){
        alert('添加用户成功');
        setShowWindow(false);
      }
    })
  };
  
  return (
    showWindow ?
    <div className="add-window">
      <div className="inner-window">
        <div className="window-content">
          <h2 className="title">添加新成员</h2>
          <div className="add-info-list">
            <ul ref={ addList }>
              <li className="add-info-item">
                <span className="label">姓名：</span>
                <Input placeholder="请输入新成员的姓名" name="name"/>
              </li>
              <li className="add-info-item">
                <span className="label">性别：</span>
                <Radio.Group onChange={ onGenderChange } value={ gender } name="gender">
                  <Radio value={1}>男</Radio>
                  <Radio value={0}>女</Radio>
                </Radio.Group>
              </li>
              <li className="add-info-item">
                <span className="label">年龄：</span>
                <Input placeholder="请输入新成员的年龄" name="age"/>
              </li>
              <li className="add-info-item">
                <span className="label">邮箱：</span>
                <Input placeholder="请输入新成员的邮箱" type="email" name="email"/>
              </li>
              <li className="add-info-item">
                <span className="label">用户名(初始)：</span>
                <Input value={ jobNumber } name="username"/>
              </li>
              <li className="add-info-item">
                <span className="label">密码(初始)：</span>
                <Input value={ jobNumber } name="password"/>
              </li>
              <li className="add-info-item">
                <span className="label">家庭住址：</span>
                <Input placeholder="请输入新成员的地址" type="email" name="address"/>
              </li>
              <li className="add-info-item">
                <span className="label">是否已婚：</span>
                <Radio.Group onChange={ onRadioChange } value={ married } name="married">
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </li>
              <li className="add-info-item">
                <span className="label">职位：</span>
                <Input placeholder="请输入新成员的职位" type="text" name="position"/>
              </li>
              <li className="add-info-item">
                <span className="label">入职时间：</span>
                <Input value={ currentTime } name="time"/>
              </li>
              <li className="add-info-item">
                <span className="label">是否为管理员：</span>
                <Radio.Group onChange={ onAdminChange } value={ admin } name="ability">
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </li>
            </ul>
            <Button type="primary" onClick={ handleAddUser }>确定</Button>
          </div>
        </div>
      </div>
    </div> : null
  )
};

const ListHeader = props => {
  const [ userList, setUserList ] = useState([]);
  const staticUserData = userList;
  useEffect(() => {
    setUserList(props.userList)
  }, [ props.userList ]);
  const deleteSelected = () => {
    props.selectedRowKeys.map(item => {
      userList.map((userItem, index) => {
        if (userItem.key === item) {
          userList.splice(index, 1);
        }
      })
    });
    setUserList(userList);
    props.setDeletedUserList(userList);
  };
  const showAddWindow = () => {
    props.showAddWindow();
  };
  const sortByTime = () => {
    props.sortByTime();
  };
  const handleSearchInput = (e) => {
    if (e.target.value === ''){
      props.setSearchResult( props.staticUserList, true );
    } else {
      const searchResult = search( props.staticUserList, e.target.value);
      props.setSearchResult( searchResult, true );
    }
  };
  
  return (
    <div className="header">
      <div className="search-box">
        <Search
          placeholder="输入关键字进行搜索"
          size="large"
          enterButton
          style={{ width: 500 }}
          onChange={ handleSearchInput }
        />
      </div>
      <div className="button-list">
        <Button size="large" className="button" type="primary" onClick={ showAddWindow }>添加</Button>
        <Button size="large" className="button" onClick={ sortByTime }>排序</Button>
        <Button size="large" className="button" type="danger" onClick={ () => { deleteSelected() }}>删除所选</Button>
      </div>
    </div>
  )
};

const UserInfoList = props => {
  const [ selectedRowKeys, setSelectedRowKeys ] = useState([]);
  const [ userList, setUserList ] = useState([]);
  const [ searchResultList, setSearchResultList ] = useState([]);
  const [ showSearchResult, setShowSearchResult ] = useState(false);
  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys( selectedRowKeys );
  };
  useEffect(() => {
    if (props.userList.length){
      setUserList(props.userList);
    }
  }, [ props.userList ]);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideDefaultSelections: true
  };
  /* 删除用户 */
  const deleteCurrentUser = (record) => {
    setUserList(userList.filter(item => item.key !== record.key));
  };
  // 删除所选用户
  const deletedSelectedItems = (data) => {
    setUserList([...data]);
  };
  const showWindow = () => {
    props.showWindow();
  };
  const sortByTime = () => {
    props.sortUserData();
  };
  const setSearchResult = ( searchResult, showSearchResult ) => {
    setShowSearchResult(showSearchResult);
    setSearchResultList(searchResult);
  };
  return (
    <div className="userInfoList">
      <ListHeader
        sortByTime={ sortByTime }
        showAddWindow={ showWindow }
        setDeletedUserList={ deletedSelectedItems }
        selectedRowKeys={ selectedRowKeys }
        userList={ userList }
        setSearchResult={ setSearchResult }
        staticUserList={ props.staticUserList }
      />
      <div className="list-content">
        <Table dataSource={ showSearchResult ? searchResultList : userList } rowSelection={rowSelection}>
          <Column title="用户Id" dataIndex="id" key="id" />
          <Column title="姓名" dataIndex="name" key="name" />
          <Column title="用户名" dataIndex="username" key="username" />
          <Column title="入职时间" dataIndex="time" key="time" />
          <Column title="年龄" dataIndex="age" key="age" />
          <Column title="职位" dataIndex="position" key="position" />
          <Column
            title="是否已婚"
            dataIndex="married"
            key="married"
            onFilter={ (value, record) => record.name.indexOf(value) === 0 }
            filters={[{ text: '是',  value: '是'},  { text: '否', value: '否',}]}
          />
          <Column
            title="是否离职"
            dataIndex="fired"
            key="fired"
            onFilter={ (value, record) => record.name.indexOf(value) === 0 }
            filters={[{ text: '是',  value: '是'},  { text: '否', value: '否',}]}
          />
          <Column title="家庭住址" dataIndex="address" key="address" />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <span>
                <Button type="primary" >修改</Button>
                <Divider type="vertical" />
                <Button type="primary" >查看</Button>
                <Divider type="vertical" />
                <Button
                  type="danger"
                  onClick={ () => { deleteCurrentUser(record) } }>删除</Button>
              </span>
            )}
          />
        </Table>
      </div>
    </div>
  )
};

const ManageInfo = props => {
  const history = useHistory();
  const [ userList, setUserList ] = useState([]);
  const [ window, setWindow ] = useState(false);
  useRedirect();
  const userData = useUserData(props.userData);
  const showWindow = () => {
    setWindow(true);
  };
  useEffect(() => {
    const cookie = getCookie();
    if (!isAdministrator(cookie.AuthKey, ",")) {
      // 不是管理员
      history.push('/info');
    }
  }, [ history ]);
  useEffect(() => {
    getUserList().then(res => {
      if (res.data.data.length) {
        setUserList(res.data.data);
      }
    })
  }, []);
  const sortUserData = () => {
    setUserList([...userList.sort(compareByKey("time"))])
  };
  return (
    <div className="manage-info">
      <AddWindow showWindow={ window }/>
      <Header title="人事管理系统" avatar={ userData.avatar }/>
      <div className="layout-content">
        <Layout className="layout">
          <Sider className="sider">
            <ul className="sider-list">
              <li className="sider-item">用户信息</li>
            </ul>
          </Sider>
          <Content className="content">
            <div className="inner-content">
              <UserInfoList
                sortUserData={ sortUserData }
                showWindow={ showWindow }
                userList={ userList }
                staticUserList={ userList }
              />
            </div>
          </Content>
        </Layout>
      </div>
      <Footer />
    </div>
  )
};

export default ManageInfo