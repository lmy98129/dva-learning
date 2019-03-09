import { query } from '../services/users';
import jsonSearch from '../utils/search';

export default {
  namespace: 'users',

  state: {
    list: [],
    total: null, 
    loading: false, // 控制加载状态
    current: null, // 当前分页信息
    pageSize: 10, // 当前每页条数
    currentItem: {}, // 当前操作的用户对象
    modalVisible: false, // 弹出窗的显示状态
    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
    listType: 'preview', // 用户列表的类型（展示全部，搜索结果）
    searchResult: [], // 搜索结果
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'query',
            payload: {}
          });
        }
      });
    }
  },

  effects: {
    *query({}, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(query);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current
          }
        });
      }
    },
    *create({ payload }, { select, put }) {
      let { record } = payload;
      let { list, pageSize, listType} = yield select(state => {
        return { list, pageSize, listType } = state.users;
      });
      record.id = list.length + 1;
      list.push(record);
      let total = list.length, 
        current = Math.floor((total + pageSize - 1) / pageSize);
      let newPayload = { list, total, current };
      if (listType === "search") {
        newPayload = {...newPayload, listType: "preview"}
      }
      yield put({
        type: 'createSuccess',
        payload: newPayload,
      })
    },
    *'delete'({ payload }, { select, put }) {
      const { id } = payload;
      let { list, listType, searchResult} = yield select(state => {
        return { list, listType, searchResult } = state.users
      });
      let currentIndex = list.findIndex(x => x.id === id);
      let newPayload = {}, total;
      if (currentIndex >= 0) {
        list.splice(currentIndex, 1);
        newPayload = {...newPayload, list};
        if (listType === "preview") {
          total = list.length;
          newPayload = {...newPayload, total};
        }
      }
      if (listType === "search") {
        currentIndex = searchResult.findIndex(x => x.id === id);
        if (currentIndex >= 0) {
          searchResult.splice(currentIndex, 1);
          total = searchResult.length;
          newPayload = {...newPayload, total}
        }
      }
      yield put({
        type: 'deleteSuccess',
        payload: newPayload,
      })
    },
    *update({ payload }, { select, put }) {
      const { record } = payload;
      let { list, listType, searchResult} = yield select(state => {
        return { list, listType, searchResult } = state.users;
      });
      let currentIndex = list.findIndex(x => x.id === record.id);
      let newPayload = {};
      if (currentIndex >= 0) {
        list[currentIndex] = record;
        newPayload = {...newPayload, list};
      }
      if (listType === "search") {
        currentIndex = searchResult.findIndex(x => x.id === record.id);
        if (currentIndex >= 0) {
          searchResult[currentIndex] = record;
          newPayload = {...newPayload, list};
        }
      }
      yield put({
        type: 'updateSuccess',
        payload: newPayload,
      })
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
    showLoading(state, action) {
      return {...state, loading: true};
    }, // 控制加载状态的 reducer
    showModal(state, { payload }) {
      const { modalType } = payload;
      switch(modalType) {
        case "edit":
          return {...state, modalVisible: true, 
            currentItem: payload.record,
            modalType: payload.modalType
          };
        case "add":
          return {
            ...state, modalVisible: true,
            modalType: payload.modalType,
            currentItem: {}
          };
      }
    }, // 控制Modal显示状态的 reducer
    hideModal(state) {
      return {...state, modalVisible: false};
    },
    querySuccess(state, action) {
      return {...state, ...action.payload, loading: false};
    },
    createSuccess(state, action) {
      return {...state, ...action.payload};
    },
    deleteSuccess(state, action) {
      return {...state, ...action.payload};
    },
    updateSuccess(state, action) {
      return {...state, ...action.payload};
    },
    changePage(state, action) {
      return {...state, ...action.payload};
    },
    searchSuccess(state, action) {
      return {...state, ...action.payload, listType: "search"};
    },
    searchCanceled(state) {
      const total = state.list.length;
      const current = 1;
      return {...state, 
        listType: "preview", searchResult: [],
        total, current,
      };
    },
  }
}