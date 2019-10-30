import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, Table, Divider, Popconfirm } from 'antd';
import { useHistory } from 'react-router-dom';
import { isAdministrator, getCookie } from "../../utli";
import { getUserList } from "../../axios";
import { useUserData, useRedirect } from "../../customHook";

import Header from "../../components/header";
import Footer from "../../components/footer";
import './index.scss'

const { Sider, Content } = Layout;
const { Search } = Input;
const { Column } = Table;

const data = [
  {
    key: '1',
    username: 'tikitaka',
    name: '谢炳辉',
    address: '南京邮电大学',
    age: 21,
    married: '否',
    fired: '否',
    position: "高级前端开发工程师",
    time: "2019.10.25",
    id: 0
  },
  {
    key: '2',
    username: 'tikitaka',
    name: '谢炳辉',
    address: '南京邮电大学',
    age: 21,
    married: '否',
    fired: '否',
    position: "高级前端开发工程师",
    time: "2019.10.25",
    id: 0
  },
  {
    key: '3',
    username: 'tikitaka',
    name: '谢炳辉',
    address: '南京邮电大学',
    age: 21,
    married: '否',
    fired: '否',
    position: "高级前端开发工程师",
    time: "2019.10.25",
    id: 0
  },
  {
    key: '4',
    username: 'tikitaka',
    name: '谢炳辉',
    address: '南京邮电大学',
    age: 21,
    married: '否',
    fired: '否',
    position: "高级前端开发工程师",
    time: "2019.10.25",
    id: 0
  },
  {
    key: '5',
    username: 'tikitaka',
    name: '谢炳辉',
    address: '南京邮电大学',
    age: 21,
    married: '否',
    fired: '否',
    position: "高级前端开发工程师",
    time: "2019.10.25",
    id: 0
  },
  {
    key: '6',
    username: 'tikitaka',
    name: '谢炳辉',
    address: '南京邮电大学',
    age: 21,
    married: '否',
    fired: '否',
    position: "高级前端开发工程师",
    time: "2019.10.25",
    id: 0
  },
];

const ListHeader = props => {
  const [ userList, setUserList ] = useState([]);
  useEffect(() => {
    setUserList(props.userList)
  }, [ props.userList ]);
  const deleteSelected = () => {
    console.log(props.selectedRowKeys);
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
  
  return (
    <div className="header">
      <div className="search-box">
        <Search placeholder="输入关键字进行搜索" size="large" enterButton style={{ width: 500 }}/>
      </div>
      <div className="button-list">
        <Button size="large" className="button" type="primary">添加</Button>
        <Button size="large" className="button">排序</Button>
        <Button size="large" className="button" type="danger" onClick={ () => { deleteSelected() }}>删除所选</Button>
      </div>
    </div>
  )
};

const UserInfoList = props => {
  const [ selectedRowKeys, setSelectedRowKeys ] = useState([]);
  const [ userList, setUserList ] = useState([]);
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
    console.log(userList);
  };
  // 删除所选用户
  console.log(userList);
  const deletedSelectedItems = (data) => {
    setUserList([...data]);
  };
  return (
    <div className="userInfoList">
      <ListHeader setDeletedUserList={ deletedSelectedItems } selectedRowKeys={ selectedRowKeys } userList={ userList }/>
      <div className="list-content">
        <Table dataSource={ userList } rowSelection={rowSelection}>
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
  useRedirect();
  const userData = useUserData(props.userData);
  useEffect(() => {
    const cookie = getCookie();
    if (!isAdministrator(cookie.AuthKey, ",")) {
      // 不是管理员
      history.push('/info');
    }
  }, [history]);
  useEffect(() => {
    getUserList().then(res => {
      if (res.data.data.length) {
        setUserList(res.data.data);
      }
    })
  }, []);
  return (
    <div className="manage-info">
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
              <UserInfoList userList={ userList }/>
            </div>
          </Content>
        </Layout>
      </div>
      <Footer />
    </div>
  )
};

export default ManageInfo