import React from 'react';
import styles from './UserSearch.less';
import { Button, Row, Col } from 'antd'
import Search from 'antd/lib/input/Search';

function UserSearch({
  onSearch, showModal, cancelSearch
}) {

  const onSearchInput = (e) => {
    const { value } = e.target;
    if (value.length <= 0) {
      cancelSearch();
    }
  }

  return (
    <Row 
      gutter={10} 
      className={styles.normal}
      type="flex"
      justify="space-between"
    >
      <Col span={2}>
        <Button 
          type="ghost" 
          onClick={() => showModal("add")}
          >
          添加
        </Button>
      </Col>
      <Col span={6}>
        <Search 
          placeholder="请输入关键字"
          onSearch={value => onSearch(value)}
          className={styles.search}
          onChange={e => onSearchInput(e)}
        />
      </Col>
    </Row>

  )
}

export default UserSearch;