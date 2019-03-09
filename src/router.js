import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';
// import News from './routes/news';
import Layout from './components/MainLayout/MainLayout';
import asyncComponent from './utils/asyncComponent';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
const IndexPage = asyncComponent(() => import('./routes/IndexPage'));
const News = asyncComponent(() => import('./routes/news'));
const Users = asyncComponent(() => import('./routes/Users'));

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <LocaleProvider locale={zhCN}>
        <Layout>
          <Switch>
            {/* <Route path="/" exact component={IndexPage} /> */}
            <Route path="/" exact component={IndexPage} />
            <Route path="/news" component={News} />
            <Route path="/users" component={Users} />
          </Switch>
        </Layout>
      </LocaleProvider>
    </Router>
  );
}

export default RouterConfig;
