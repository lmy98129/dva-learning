import React from 'react';
import { connect } from 'dva';

function NewsDetail({ match }) {
  return (
    <div>我是新闻详情页面{match.params.id}</div>
  );
}

export default connect()(NewsDetail);