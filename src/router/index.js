import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


export const constantRouterMap = [
  {
    path: '/',
    name: '',
    redirect:'/home',
    component: function (resolve) {
      require(['@/views/home'], resolve)
    },
  },
  {
    path: '/home',
    name: 'home',
    component: function (resolve) {
      require(['@/views/home'], resolve)
    },
   /* meta:{
      whitelist:true,
      menu:true,
      cnName:'首页',
      icon: require('@/assets/img/public/home.png'),
      activeIcon: require('@/assets/img/public/home-active.png'),
    }*/
  },
];

export const asyncRouterMap = [
   {
    path: '/',
    name: '',
    component: function (resolve) {
      require(['@/views/home'], resolve)
    }
  },
];

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap.concat(asyncRouterMap)
  })
}
