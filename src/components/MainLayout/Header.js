import React from 'react';
import { withRouter, Link } from 'dva/router';
import { Menu, Icon } from 'antd';

function Header({ location }) {
  return (
    <Menu selectedKeys={[location.pathname]} mode="horizontal" theme="dark">
      <Menu.Item key="/users">
        <Link to="/users">
          <Icon type="bars" />用户
        </Link>
      </Menu.Item>
      <Menu.Item key="/">
        <Link to="/">
          <Icon type="home" />首页
        </Link>
      </Menu.Item>
      <Menu.Item key="/404">
        <Link to="/page-you-dont-know">
          <Icon type="frown" />404
        </Link>
      </Menu.Item>
      <Menu.Item key="/antd">
        <a href="https://github.com/dvajs/dva">
        <Icon type="github" />dva
        </a>
      </Menu.Item>
    </Menu>
  )
}

export default withRouter(Header);