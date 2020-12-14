import routers from '@/router/routes'
import {getMenuByRouter } from '@/js/util'

export const authToken = state => state.auth.token
export const username = state => state.user.username
export const events = state => state.events.events
export const info = state => state.info.info
export const menuList = (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access)