import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SendMailer from '@/components/SendMailer'
import UserManage from '@/components/userManage'
import test from '@/components/test'
import WorkTextManage from '@/components/WorkTextManage'
import map from '@/components/map'
import Login from '@/components/Login'
import ShowWorkText from '@/components/ShowWorkText'
import RadioactiveInfo from '@/components/RadioactiveInfo'
import TransportTask from '@/components/TransportTask'
import Video from '@/components/Video'
import CarManage from '@/components/CarManage'
import test1 from '@/components/test1'
import roleManage from '@/components/roleManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
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
    },
    {
      path: '/RadioactiveInfo',
      name: 'RadioactiveInfo',
      component: RadioactiveInfo
    },
    {
      path: '/TransportTask',
      name: 'TransportTask',
      component: TransportTask
    },
    {
      path: '/Video',
      name: 'Video',
      component: Video
    },
    {
      path: '/CarManage',
      name: 'CarManage',
      component: CarManage
    },
    {
      path: '/test1',
      name: 'test1',
      component: test1
    },
    {
      path: '/roleManage',
      name: 'roleManage',
      component: roleManage
    }
  ]
})
