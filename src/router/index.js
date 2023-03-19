import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../views/Layout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/FirmList',
        component: () => import('../views/FirmList.vue'),
      },
      {
        path: '/Login',
        component: () => import('../views/Login.vue'),
      },
      {
        path: '/About',
        component: () => import('../views/About.vue'),
      },
      {
        path: '/Common',
        component: () => import('../views/Common.vue'),
      },
      {
        path: '/Report',
        component: () => import('../views/Report.vue'),
      },
      {
        path: '/Rules',
        component: () => import('../views/Rules.vue'),
      },
      {
        path: '/FirmRegister',
        component: () => import('../views/FirmRegister.vue'),
      },
      {
        path: '/MemberRegister',
        component: () => import('../views/MemberRegister.vue'),
      },
      {
        path: '/FirmPage/:FirmId',
        component: () => import('../views/FirmPage.vue'),
      },
      {
        path: '/FirmPage/:FirmId/Room/:RoomId',
        component: () => import('../views/Room.vue'),
      },
      {
        path: '/FirmBackstage',
        component: () => import('../views/FirmBackstage.vue'),
        children: [
          {
            path: '',
            component: () => import('../views/FirmBackstage/FirmOrder.vue'),
          },
          {
            path: 'FirmRoom',
            component: () => import('../views/FirmBackstage/FirmRoom.vue'),
          },
          {
            path: 'FirmQA',
            component: () => import('../views/FirmBackstage/FirmQA.vue'),
          },
          {
            path: 'FirmSet',
            component: () => import('../views/FirmBackstage/FirmSet.vue'),
          },
        ],
      },
      {
        path: '/MemberBackstage',
        component: () => import('../views/MemberBackstage.vue'),
        children: [
          {
            path: '',
            component: () => import('../views/MemberBackstage/MemberOrder.vue'),
          },
          {
            path: 'MemberSet',
            component: () => import('../views/MemberBackstage/MemberSet.vue'),
          },
          {
            path: 'MemberQA',
            component: () => import('../views/MemberBackstage/MemberQA.vue'),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
