import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowFooter: true,
    city: {
      cityId: 0,
      cityName: ""
    },
    jwt: "",

  },
  mutations: {
    hideFooter(state, bool) {
      state.isShowFooter = bool;
    },
    setCity(state, city) {
      state.city = city;
    },
    setJwt(state, jwt) {
      state.jwt = jwt;
      localStorage.setItem('jwt', jwt);
    }
  },
  actions: {
  },
  modules: {
  }
})
