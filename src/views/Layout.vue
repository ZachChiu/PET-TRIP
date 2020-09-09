<template>
  <div class="layout">
    <loading :active.sync="isLoading"
       loader="bars"></loading>
    <nav class="headerNav navbar navbar-expand-md navbar-light bg-light position-sticky">
      <div class="container">
        <h1 class="h6 mb-0">
          <router-link to="/" class="navbar-brand">
            <img width="80" src="https://upload.cc/i1/2020/09/02/X38KBL.png" alt /> Pet Trip
          </router-link>
        </h1>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="hoverLine navbar-nav ml-auto align-items-md-center">
            <li class="nav-item hoveritem active">
              <router-link to="/" class="nav-link">
                <i class="fas fa-paw mr-1"></i>首頁
              </router-link>
            </li>
            <li class="nav-item hoveritem">
              <router-link to="/FirmList" class="nav-link">
                <i class="fas fa-paw mr-1"></i>尋找寄宿
              </router-link>
            </li>
            <li class="nav-item hoveritem" v-if="identify.identity != '廠商' && identify.identity != '會員'">
              <router-link to="/Login" class="nav-link">
                <i class="fas fa-paw mr-1"></i>註冊 / 登入
              </router-link>
            </li>
            <li class="firmDrop nav-item dropdown" v-if="identify.identity == '廠商' ">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="d-inline d-md-none">
                  <i class="fas fa-paw mr-1"></i>管理後台
                </span>
                <img style="width:40px;height:40px;object-fit: cover;"
                  class="d-md-inline d-none img-fluid rounded-circle"
                  :src="identify.avatar"
                  alt
                />
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <router-link to="/FirmBackstage/FirmSet" class="dropdown-item">廠商設定</router-link>
                <router-link to="/FirmBackstage" class="dropdown-item">訂單列表</router-link>
                <router-link to="/FirmBackstage/FirmRoom" class="dropdown-item">空間管理</router-link>
                <router-link to="/FirmBackstage" class="dropdown-item">問與答</router-link>
                <div class="dropdown-divider"></div>
                <a @click="signout" class="dropdown-item" href="#">登出</a>
              </div>
            </li>
            <li class="memberDrop nav-item dropdown" v-if="identify.identity == '會員' ">
                        <a class="nav-link dropdown-toggle" ref="#" id="navbarDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="d-inline d-md-none"><i class="fas fa-paw mr-1"></i>我的頁面</span>
                            <img style="width:40px;height:40px;object-fit: cover;" class="d-md-inline d-none img-fluid rounded-circle" :src="identify.avatar" alt="">
                        </a>
                        <div class="dropdown-menu  dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <router-link to="/MemberBackstage/MemberSet" class="dropdown-item">會員設定</router-link>
                            <router-link to="/MemberBackstage" class="dropdown-item">訂單列表</router-link>
                            <router-link to="/MemberBackstage" class="dropdown-item">問與答</router-link>
                            <div class="dropdown-divider"></div>
                            <a @click="signout" class="dropdown-item" href="#">登出</a>
                        </div>
                    </li>
          </ul>
        </div>
      </div>
    </nav>
    <main>
      <router-view  @page-refresh="getIdentify"></router-view>
    </main>
    <footer style="background:rgb(4 24 58);">
      <div class="container">
        <div class="row no-gutters align-items-sm-center">
          <div class="col-6 col-sm-9">
            <ul class="list-unstyled d-flex flex-sm-row flex-column my-0 text-white flex-wrap">
              <li class="my-2">
                <a href="#" class="text-white">
                  <i class="mr-1 fas fa-fingerprint"></i>關於我們
                </a>
                <span class="mx-2 d-sm-inline d-none">|</span>
              </li>
              <li class="my-2">
                <a href="#" class="text-white">
                  <i class="mr-1 far fa-question-circle"></i>常見問題
                </a>
                <span class="mx-2 d-sm-inline d-none">|</span>
              </li>
              <li class="my-2">
                <a href="#" class="text-white">
                  <i class="mr-1 far fa-envelope-open"></i>問題回報
                </a>
                <span class="mx-2 d-sm-inline d-none">|</span>
              </li>
              <li class="my-2">
                <a href="#" class="text-white">
                  <i class="mr-1 fas fa-bullhorn"></i>免責聲明
                </a>
                <span class="mx-2 d-sm-inline d-none">|</span>
              </li>
              <li class="my-2">
                <a href="#" class="text-white">
                  <i class="mr-1 fas fa-list-ol"></i>服務條款
                </a>
              </li>
            </ul>
          </div>
          <div class="col-6 col-sm-3 d-flex flex-column align-items-center justify-content-end">
            <ul class="mb-0 list-unstyled text-white d-flex justify-content-between h2">
              <li class="my-2">
                <a href="mailto:hexschool@home.com" class="text-white">
                  <i class="fas fa-at"></i>
                </a>
              </li>
              <li class="my-2">
                <a href="https://www.facebook.com/" target="_blank" class="ml-3 text-white">
                  <i class="fab fa-facebook"></i>
                </a>
              </li>
              <li class="my-2">
                <a href="https://www.instagram.com/" target="_blank" class="ml-3 text-white">
                  <i class="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
            <p class="text-muted mb-1">©2020 Pet Trip</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data () {
    return {
      identify: {},
      isLoading: false
    }
  },
  components: {
    loading: VueLoading
  },
  created () {
    this.getIdentify()
  },
  methods: {
    getIdentify: function (get) {
      this.isLoading = true
      const vm = this
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)pet\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      const config = {
        method: 'get',
        url: 'http://pettrip.rocket-coding.com/api/GetIdentity',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      this.$http(config)
        .then(function (response) {
          console.log(response)
          vm.identify = response.data.result
          if (vm.identify.avatar == null) {
            vm.identify.avatar = 'https://upload.cc/i1/2020/09/08/AqaTzN.png'
          }
          vm.isLoading = false
          if (get === '廠商') {
            vm.$router.push('/FirmBackstage')
          } else if (get === '會員') {
            vm.$router.push('/')
          }
        })
        .catch(function (error) {
          console.log(error)
          vm.isLoading = false
        })
    },
    signout: function () {
      this.isLoading = true
      document.cookie = `pet='';expires=${new Date(-1)}; path=/`
      this.getIdentify()
      this.$router.push('46546')
    }
  }
}
</script>
