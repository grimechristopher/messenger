
export const auth = {
  state () {
    return {
      user: {
        username: null,
        email: null,
        isLoggedIn: false,
      }
    }
  },
  actions: {
    signIn ({ commit }, user) {
      if (user) {
        console.log('user', user)
        commit('signInUser', user);
      }
    }
  },
  mutations: {
    signInUser (state, data) {
      console.log('data', data)
      state.user.username = data.username;
      state.user.email = data.email;
      state.user.isLoggedIn = true;
    }
  }
};