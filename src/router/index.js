import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const createView = relativePath => () => import('@src/views/' + relativePath)

export default () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: createView('Home') },
    { path: '/posts', component: createView('Posts') },
    { path: '/about', component: createView('About') },
    { path: '/search', name: 'search', component: createView('Search') },
    { path: '/search/:query?', name: 'searchQuery', component: createView('Search') }
  ]
})
