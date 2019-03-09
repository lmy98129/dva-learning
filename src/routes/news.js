import React, { Fragment } from "react";
import { connect } from "dva";
import { Route } from "dva/router";
// import NewsList from './newsList';
// import NewsDetail from "./newsDetail";
import asyncComponent from '../utils/asyncComponent';
const NewsList = asyncComponent(() => import('./newsList'));
const NewsDetail = asyncComponent(() => import('./newsDetail'));

function News({ match }) {
  return (
    <Fragment>
      <span>我是新闻界面</span>
      <Route path={`${match.url}/list`} exact component={NewsList} />
      <Route path={`${match.url}/list/detail/:id`} exact component={NewsDetail} />
    </Fragment>
  )
}

export default connect()(News);