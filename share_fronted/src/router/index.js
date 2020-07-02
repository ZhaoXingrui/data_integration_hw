import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import HomePage from '../views/HomePage/index'
import SharePage from '../views/SharePage/index'
import kline from '@/components/k-line'
import getdata from '@/components/test'
import map from "@/components/map";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/share',
      name: 'SharePage',
      component: SharePage
    },
    {
      path: '/test',
      name: 'test',
      component: kline
    },
    {
      path: '/test1',
      name: 'test1',
      component: getdata
    },
    {
      path: '/map',
      name: map,
      component: map
    }
  ],
  mode: 'history'
})
