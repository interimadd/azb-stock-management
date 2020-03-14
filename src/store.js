import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // state:データ
  state: {
    user: {},
    init: false,
    status: false
  },
  // mutations:stateを更新する同期関数
  // actions:stateを更新する非同期関数
  mutations: {
    onAuthStateChanged(state, user) {
      state.init = true
      state.user = user //firebaseが返したユーザー情報
    },
    onUserStatusChanged(state, status) {
      state.init = true
      state.status = status; //ログインしてるかどうか true or false
    }
  },
  // getters:stateの値を使って計算する関数
  getters: {
    user(state) {
      return state.user;
    },
    isSignedIn(state) {
      return state.status;
    },
    isInit(state) {
      return state.init
    }
  }
});