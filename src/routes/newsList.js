import React from 'react';
import { connect } from "dva";

function NewsList() {
  return (
    <div>我是新闻列表页面</div>
  )
}

export default connect()(NewsList);