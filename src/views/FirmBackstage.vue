<template>
  <div class="firmBackstage">
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
          <nav class="firmNavbar border bg-light">
            <ul class="nav nav-pills flex-md-column text-center">
              <li class="nav-item w-50" @click="pageCurrent = '/FirmBackstage'">
                <router-link
                  to="/FirmBackstage"
                  class="nav-link"
                  :class="{active: pageCurrent == '/FirmBackstage'}"
                >
                  <i class="mr-1 fas fa-clipboard-list"></i>
                  訂單列表
                </router-link>
              </li>
              <li
                class="nav-item w-50"
                @click="pageCurrent = '/FirmBackstage/FirmRoom'"
              >
                <router-link
                  to="/FirmBackstage/FirmRoom"
                  class="nav-link"
                  :class="{active: pageCurrent == '/FirmBackstage/FirmRoom'}"
                >
                  <i class="mr-1 fas fa-box-open"></i>空間管理
                </router-link>
              </li>
              <li
                class="nav-item w-50"
                @click="pageCurrent = '/FirmBackstage/FirmQA'"
              >
                <router-link
                  to="/FirmBackstage/FirmQA"
                  class="nav-link"
                  :class="{active: pageCurrent == '/FirmBackstage/FirmQA'}"
                >
                  <i class="mr-1 fas fa-question"></i>問與答QA
                </router-link>
              </li>
              <li
                class="nav-item w-50"
                @click="pageCurrent = '/FirmBackstage/FirmSet'"
              >
                <router-link
                  to="/FirmBackstage/FirmSet"
                  class="nav-link"
                  :class="{active: pageCurrent == '/FirmBackstage/FirmSet'}"
                >
                  <i class="mr-1 fas fa-cog"></i>廠商設定
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-9 col-12">
          <router-view
            :identify="identify"
            @checkStatus="getFirmBackstageData"
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
      pageCurrent: '/FirmBackstage',
      isLoading: false,
    };
  },
  created() {
    this.getFirmBackstageData();
  },
  methods: {
    getFirmBackstageData() {
      this.pageCurrent = this.$route.path;
      const jwt = Cookies.get('jwt');

      if (jwt) {
        this.$http.defaults.headers.common.Authorization = jwt;
      } else {
        this.$router.push('/');
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
