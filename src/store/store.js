import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    updateUserField(state, { field, value }) {
      if (state.user) {
        state.user[field] = value;
      }
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    updateUserField({ commit }, payload) {
      commit('updateUserField', payload);
    }
  }
});
