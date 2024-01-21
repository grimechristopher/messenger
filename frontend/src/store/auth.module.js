
export const auth = {
  state() {
    return {
      user: {
        userId: null,
        username: null,
        email: null,
        isLoggedIn: false,
      }
    }
  },
  actions: {
    signIn({ commit }, user) {
      if (user) {
        commit('signInUser', user);
      }
    }
  },
  mutations: {
    signInUser(state, data) {
      state.user.userId = data.id;
      state.user.username = data.username;
      state.user.email = data.email;
      state.user.isLoggedIn = true;
    },
  }
};