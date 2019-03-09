import React, { Component } from 'react';
import propTypes from 'prop-types';

// Users 的 Presentational Component

import UserList from '../components/Users/UserList';
import UserSearch from '../components/Users/UserSearch';
import UserModal from '../components/Users/UserModal';

import styles from './Users.less';
import { connect } from 'dva';

function Users({ location, dispatch, users }) {

  const { loading, list, total, current, listType,
    currentItem, modalVisible, modalType, 
    pageSize, searchResult } = users;

  const showModal = (modalType, record) => {
    switch(modalType) {
      case "edit":
        dispatch({ type: 'users/showModal', payload: { modalType, record } });
        break;
      case 'add':
        dispatch({ type: 'users/showModal', payload: { modalType } });
        break;
    }
  }

  const deleteItem = (id) => {
    dispatch({ type: 'users/delete', payload: { id } });
  }

  const hideModal = () => {
    dispatch({ type: 'users/hideModal' });
  }

  const onSubmit = (record, modalType) => {
    switch(modalType) {
      case "edit":
        dispatch({ type: 'users/update', payload: { record } })
        break;
      case "add":
        dispatch({ type: 'users/create', payload: { record } })
        break;
    }
  }

  const changePage = (current, pageSize) => {
    dispatch({ type: 'users/changePage', payload: { current, pageSize } })
  }

  const onSearch = (text) => {
    dispatch({ type: 'users/search', payload: { text } });
  }

  const cancelSearch = () => {
    if (listType === "search") {
      dispatch({ type: 'users/searchCanceled' });
    }
  }

  const userListProps = {
    dataSource: list, 
    total, loading, current, showModal, deleteItem,
    changePage, pageSize, listType, searchResult,
  }

  const userSearchProps = {
    showModal, onSearch, cancelSearch,
  };

  const userModalProps = {
    visible: modalVisible, showModal, hideModal,
    record: currentItem, modalType, onSubmit
  };

  return (
    <div className={styles.normal}>
      {/* 用户筛选搜索框 */}
      <UserSearch {...userSearchProps} />
      {/* 用户信息展示列表 */}
      <UserList {...userListProps} />
      {/* 添加用户 & 修改用户弹出的浮窗 */}
      <UserModal {...userModalProps} />
    </div>
    
  );
}

Users.propTypes = {
  users: propTypes.object
};

function mapStateToProps({ users }) {
  return {users}
}

export default connect(mapStateToProps)(Users);