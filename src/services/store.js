/*
/!**
 * Created by 梁伟 on 2017/4/28.
 * 此文件用来组件之间通信
 *!
*/

import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)

/**  const store = new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    increment (state) {
      state.counter++
    }
  }
})

export default store **/

// the root, initial state object
const state = {
  Info: false,
  test: 0
}

// define the possible mutations that can be applied to our state
const mutations = {
  set_userInfo (state, obj) {
    state.Info = obj
  },
  set_tets (state) {
    state.test ++
  },
  clear_state () {
    state.Info = null
  }
}

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
  state,
  mutations
})
