import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import PublicPage from '@/components/PublicPage'
import SendMailer from '@/components/SendMailer'
import UserManage from '@/components/userManage'
import test from '@/components/test'
import WorkTextManage from '@/components/WorkTextManage'
import map from '@/components/map'
import Login from '@/components/Login'
import ShowWorkText from '@/components/ShowWorkText'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'PublicPage',
      component: PublicPage
    },
    {
      path: '/SendMailer',
      name: 'SendMailer',
      component: SendMailer
    },
    {
      path: '/UserManage',
      name: 'UserManage',
      component: UserManage
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/WorkTextManage',
      name: 'WorkTextManage',
      component: WorkTextManage
    },
    {
      path: '/map',
      name: 'map',
      component: map
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/ShowWorkText',
      name: 'ShowWorkText',
      component: ShowWorkText
    }
  ]
})
