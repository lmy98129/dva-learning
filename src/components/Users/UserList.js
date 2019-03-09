import React, { Fragment } from 'react';
import { Table, message, Popconfirm, Button } from 'antd';
import style from './UserList.less'


const UserList = ({
  total,
  current,
  loading,
  dataSource,
  showModal,
  deleteItem,
  changePage,
  pageSize,
  searchResult,
  listType,
}) => {

  const showModalHandler = (e, record) => {
    if (e) e.stopPropagation();
    showModal("edit", record);
  }

  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    className: style.limitColumn,
    render: (text) => <a href="#"><div className={style.limitColumnDiv}>{text}</div></a>
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <Fragment>
        <Button.Group>
          <Button 
            onClick={(e) => {showModalHandler(e, record)}}
          >
            编辑
          </Button>
            <Popconfirm 
              title="确定要删除吗？" 
              okText="删除"
              okType="danger"
              cancelText="取消"
              onConfirm={() => deleteItem(record.id)}>
              <Button>
                  删除
              </Button>
            </Popconfirm>
        </Button.Group>
      </Fragment>
    )
  }];

  const pagination = {
    total, current, pageSize, showSizeChanger: true, onChange: (page, pageSize) => {
      changePage(page, pageSize);
    }
  };

  let realDataSource;
  switch(listType) {
    case "preview":
      realDataSource = dataSource;
      break;
    case "search":
      realDataSource = searchResult;
      break;
  }

  return (
    <Table 
      columns={columns}
      dataSource={realDataSource}
      loading={loading}
      rowKey={record => record.id}
      pagination={pagination}
    />
  )
}

export default UserList;