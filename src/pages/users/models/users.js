import * as userService from '../services/users';
import jsonSearch from '../../../utils/search';

export default {
  namespace: 'users',

  state: {
    list: [],
    total: null, 
    page: null, //（现在使用）当前的页数
    loading: false, // 控制加载状态
    current: null, // （即将废弃）当前分页
    pageSize: 10, // 当前每页条数
    currentItem: {}, // 当前操作的用户对象
    modalVisible: false, // 弹出窗的显示状态
    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
    listType: 'preview', // 用户列表的类型（展示全部，搜索结果）
    searchResult: [], // 搜索结果
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    }
  },

  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call (userService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        }
      })
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(userService.remove, id);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(userService.patch, id, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *create({ payload: values }, { call, put, select }) {
      yield call(userService.create, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *search({ payload }, { select, put }) {
      const { text } = payload;
      const list = yield select(state => state.users.list);
      const searchResult = jsonSearch(list, text);
      const total = searchResult.length;
      const current = 1;
      yield put({
        type: 'searchSuccess',
        payload: { searchResult, total, current },
      })
    }
  },

  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  }
}