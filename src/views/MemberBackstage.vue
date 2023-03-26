<template>
  <div class="memberBackstage">
    <div v-show="isLoading" class="loader">
      <hash-loader
        class="custom-class"
        :color="'#FFDE47'"
        :loading="isLoading"
        :size="70"
      ></hash-loader>
    </div>
    <div class="container py-4">
      <div class="row">
        <div class="col-md-3 col-12 mb-3">
          <nav class="border bg-light">
            <ul class="nav nav-pills flex-md-column text-center">
              <li
                class="nav-item w-100"
                @click="pageCurrent = '/MemberBackstage'"
              >
                <router-link
                  to="/MemberBackstage"
                  class="nav-link"
                  :class="{active: pageCurrent == '/MemberBackstage'}"
                >
                  <i class="fas fa-clipboard-list"></i>
                  訂單列表
                </router-link>
              </li>
              <li
                class="nav-item w-100 "
                @click="pageCurrent = '/MemberBackstage/MemberQA'"
              >
                <router-link
                  to="/MemberBackstage/MemberQA"
                  class="nav-link"
                  :class="{active: pageCurrent == '/MemberBackstage/MemberQA'}"
                >
                  <i class="fas fa-question"></i>
                  問與答QA
                </router-link>
              </li>
              <li
                class="nav-item w-100"
                @click="pageCurrent = '/MemberBackstage/MemberSet'"
              >
                <router-link
                  to="/MemberBackstage/MemberSet"
                  class="nav-link"
                  :class="{active: pageCurrent == '/MemberBackstage/MemberSet'}"
                >
                  <i class="fas fa-cog"></i>
                  會員設定
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-9 col-12">
          <router-view
            :identify="identify"
            @checkStatus="getMemberBackstageData"
            @loadAction="loading"
          ></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  props: ['identify'],
  data() {
    return {
      pageCurrent: '/MemberBackstage',
      isLoading: false,
    };
  },
  created() {
    this.getMemberBackstageData();
  },
  methods: {
    getMemberBackstageData() {
      this.pageCurrent = this.$route.path;
      const jwt = Cookies.get('jwt');

      if (jwt) {
        this.$http.defaults.headers.common.Authorization = jwt;
      }
    },
    loading(data) {
      switch (data) {
        case false:
          this.isLoading = false;
          break;
        default:
          this.isLoading = true;
          break;
      }
    },
  },
};
</script>
