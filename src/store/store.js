import { createStore } from 'vuex';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    updateUserField(state, { field, value }) {
      if (state.user) {
        state.user[field] = value;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    updateUserField({ commit }, payload) {
      commit('updateUserField', payload);
    },
  },
});
