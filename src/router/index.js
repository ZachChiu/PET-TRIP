import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../views/Layout.vue';
import {scrollToTop} from '@/lib/scrollToTop.js';
import Cookies from 'js-cookie';

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
        meta: {
          hasLayoutBanner: true,
          title: '尋找寄宿',
        },
      },
      {
        path: '/Login',
        component: () => import('../views/Login.vue'),
        meta: {
          hasLayoutBanner: true,
          title: '登入',
        },
      },
      {
        path: '/About',
        component: () => import('../views/About.vue'),
        meta: {
          hasLayoutBanner: true,
          title: '關於我們',
        },
      },
      {
        path: '/Common',
        component: () => import('../views/Common.vue'),
        meta: {
          hasLayoutBanner: true,
          title: '常見問題',
        },
      },
      {
        path: '/Report',
        component: () => import('../views/Report.vue'),
        meta: {
          hasLayoutBanner: true,
          title: '問題回報',
        },
      },
      {
        path: '/Rules',
        component: () => import('../views/Rules.vue'),
        meta: {
          hasLayoutBanner: true,
          title: '服務條款',
        },
      },
      {
        path: '/FirmRegister',
        component: () => import('../views/FirmRegister.vue'),
        meta: {
          hasLayoutBanner: true,
          title: '註冊',
        },
      },
      {
        path: '/MemberRegister',
        component: () => import('../views/MemberRegister.vue'),
        meta: {
          hasLayoutBanner: true,
          title: '註冊',
        },
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
        meta: {
          hasLayoutBanner: true,
          title: '廠商後台',
          requireAuth: true,
        },
        children: [
          {
            path: '',
            component: () => import('../views/FirmBackstage/FirmOrder.vue'),
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'FirmRoom',
            component: () => import('../views/FirmBackstage/FirmRoom.vue'),
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'FirmQA',
            component: () => import('../views/FirmBackstage/FirmQA.vue'),
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'FirmSet',
            component: () => import('../views/FirmBackstage/FirmSet.vue'),
            meta: {
              requireAuth: true,
            },
          },
        ],
      },
      {
        path: '/MemberBackstage',
        component: () => import('../views/MemberBackstage.vue'),
        meta: {
          hasLayoutBanner: true,
          title: '會員後台',
          requireAuth: true,
        },
        children: [
          {
            path: '',
            component: () => import('../views/MemberBackstage/MemberOrder.vue'),
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'MemberSet',
            component: () => import('../views/MemberBackstage/MemberSet.vue'),
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'MemberQA',
            component: () => import('../views/MemberBackstage/MemberQA.vue'),
            meta: {
              requireAuth: true,
            },
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const jwt = Cookies.get('jwt');
    if (jwt) {
      return next();
    } else {
      return next('/');
    }
  }
  next();
});

router.afterEach(() => {
  scrollToTop();
});
export default router;
