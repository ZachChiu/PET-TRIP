import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: Layout,
    children:
    [
      {
        path: '',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/FirmList',
        component: () => import('../views/FirmList.vue')
      },
      {
        path: '/Login',
        component: () => import('../views/Login.vue')
      },
      {
        path: '/FirmRegister',
        component: () => import('../views/FirmRegister.vue')
      },
      {
        path: '/MemberRegister',
        component: () => import('../views/MemberRegister.vue')
      },
      {
        path: '/FirmId/:FirmId',
        component: () => import('../views/FirmPage.vue')
      },
      {
        path: '/FirmId/:FirmId/RoomId/:RoomId',
        component: () => import('../views/Room.vue')
      },
      {
        path: '/FirmBackstage',
        component: () => import('../views/FirmBackstage.vue'),
        children:
        [
          {
            path: '',
            component: () => import('../views/FirmBackstage/FirmOrder.vue')
          },
          {
            path: 'FirmRoom',
            component: () => import('../views/FirmBackstage/FirmRoom.vue')
          },
          {
            path: 'FirmSet',
            component: () => import('../views/FirmBackstage/FirmSet.vue')
          }
        ]
      },
      {
        path: '/MemberBackstage',
        component: () => import('../views/MemberBackstage.vue'),
        children:
        [
          {
            path: '',
            component: () => import('../views/MemberBackstage/MemberOrder.vue')
          },
          {
            path: 'MemberSet',
            component: () => import('../views/MemberBackstage/MemberSet.vue')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
