/**
 * renderer process preference store to save data in the localstorage
 * TODO would think about using electron-store to keep the data in the native store to share
 * data between main and renderer.
 */

import api from '@/api'

const state = {
  config: {port:2376,host:'127.0.0.1',ca:'', pem:'', key:''}
}

const mutations = {
  UPDATE_PREFERENCE_DATA (state, config) {
    state.config = { ...state.config, ...config }
  }
}

const actions = {
  fetchPreference ({ commit }) {
    return new Promise((resolve) => {
      api.fetchPreference()
        .then((config) => {
          commit('UPDATE_PREFERENCE_DATA', config)
          resolve(config)
        })
    })
  },
  save ({ commit, dispatch }, config) {
    commit('UPDATE_PREFERENCE_DATA', config)
    return api.savePreference(config)
  },
//   changeThemeConfig ({ commit }, theme) {
//     commit('UPDATE_PREFERENCE_DATA', { theme })
//   },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
