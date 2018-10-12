// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import './fetch/util'
import utilFn from './fetch/utilFn'
import { sync } from 'vuex-router-sync'

import {createStore} from './store'
import {createRouter} from './router'
import { getToken } from '@/fetch/auth';



export function createApp () {


  Vue.config.productionTip = false

  Vue.use(utilFn)

  // 创建 router 和 store 实例
  const router = createRouter()
  const store = createStore()

  // 同步路由状态(route state)到 store
  sync(store, router)

  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // 暴露 app, router 和 store。
  return { app, router, store }
}



