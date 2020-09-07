<template>
  <div class="firmBackstage">
    <div class="banner position-relative">
      <div class="bannerText position-absolute text-dark display-4 font-weight-bold">廠商後台</div>
      <img
        class="img-fluid"
        src="https://upload.cc/i1/2020/09/02/JE5b96.png"
        style="height: 200px;object-fit: cover; width: 100%;"
        alt
      />
    </div>
    <nav class="sideBar show bg-light position-absolute">
      <a href="#" id="sidebarBtn" class="sidebarBtn btn btn-dark rounded-0 position-absolute" @click.prevent="toggleSidebar">
        <i class="change other fas fa-chevron-left d-none"></i>
        <i class="change fas fa-chevron-right d-none"></i>
      </a>
      <h5 class="text-center my-4">廠商後台管理</h5>
      <ul class="nav nav-pills nav-fill flex-column text-center">
        <li class="nav-item" @click="pageCurrent = '/FirmBackstage'">
          <router-link to="/FirmBackstage" class="nav-link" :class="{active:pageCurrent == '/FirmBackstage'}"><i class="fas fa-clipboard-list"></i>
            訂單列表</router-link>
        </li>
        <li class="nav-item" @click="pageCurrent = '/FirmBackstage/FirmRoom'">
            <router-link to="/FirmBackstage/FirmRoom" class="nav-link" :class="{active:pageCurrent == '/FirmBackstage/FirmRoom'}"><i class="fas fa-box-open"></i>空間管理</router-link>
        </li>
        <li class="nav-item" @click="pageCurrent = '/FirmBackstage/FirmQA'">
            <router-link to="/FirmBackstage" class="nav-link" :class="{active:pageCurrent == '/FirmBackstage/FirmQA'}"><i class="fas fa-question"></i>問與答QA</router-link>
        </li>
        <li class="nav-item" @click="pageCurrent = '/FirmBackstage/FirmSet'">
          <router-link to="/FirmBackstage/FirmSet" class="nav-link" :class="{active:pageCurrent == '/FirmBackstage/FirmSet'}"><i class="fas fa-cog"></i>廠商設定</router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.sidebarBtn {
  top: 5px;
  left: 100%;
  .other {
    display: block !important;
  }
}
.sideBar {
  z-index: 3;
  transition: all 1s;
  left: -180px;
  width: 180px;
  &.show {
    left: 0;
  }
}
</style>

<script>
/* global $ */
export default {
  data () {
    return {
      pageCurrent: 'order'
    }
  },
  created () {
    this.getFirmBakcstageData()
  },
  methods: {
    toggleSidebar: function () {
      $('.sideBar').toggleClass('show')
      $('.change').toggleClass('other')
    },
    getFirmBakcstageData: function () {
      this.pageCurrent = this.$route.path
      console.log(this.$route.path)
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)pet\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      this.$http.defaults.headers.common.Authorization = `Bearer ${token}`
      console.log(token)
    }
  }
}
</script>
