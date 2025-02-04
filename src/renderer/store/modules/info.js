import * as types from '../mutation-types'

/**
 * The doker engine info containers
 */
const state = {
  info: {}
}

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [types.UPDATE_INFO] (state, info) {
    state.info = info
  }
}

export default {
  state,
  mutations
}
