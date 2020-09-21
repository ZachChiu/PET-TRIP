<template>
  <div class="layout">
    <div class="loader" v-show="isLoading">
      <hash-loader class="custom-class" :color="'#FFDE47'" :loading="isLoading" :size="70"></hash-loader>
    </div>
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
            <li
              class="nav-item hoveritem"
              v-if="identify.identity != '廠商' && identify.identity != '會員'"
            >
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
                <img
                  style="width:40px;height:40px;object-fit: cover;"
                  class="d-md-inline d-none img-fluid rounded-circle"
                  :src="identify.avatar"
                  alt
                />
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <router-link to="/FirmBackstage/FirmSet" class="dropdown-item">廠商設定</router-link>
                <router-link to="/FirmBackstage" class="dropdown-item">訂單列表</router-link>
                <router-link to="/FirmBackstage/FirmRoom" class="dropdown-item">空間管理</router-link>
                <router-link to="/FirmBackstage/FirmQA" class="dropdown-item">問與答</router-link>
                <div class="dropdown-divider"></div>
                <a @click="signout" class="dropdown-item" href="#">登出</a>
              </div>
            </li>
            <li class="memberDrop nav-item dropdown" v-if="identify.identity == '會員' ">
              <a
                class="nav-link dropdown-toggle"
                ref="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="d-inline d-md-none">
                  <i class="fas fa-paw mr-1"></i>我的頁面
                </span>
                <img
                  style="width:40px;height:40px;object-fit: cover;"
                  class="d-md-inline d-none img-fluid rounded-circle"
                  :src="identify.avatar"
                  alt
                />
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <router-link to="/MemberBackstage/MemberSet" class="dropdown-item">會員設定</router-link>
                <router-link to="/MemberBackstage" class="dropdown-item">訂單列表</router-link>
                <router-link to="/MemberBackstage/MemberQA" class="dropdown-item">問與答</router-link>
                <div class="dropdown-divider"></div>
                <a @click="signout" class="dropdown-item" href="#">登出</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main>
      <router-view :identify="identify" @page-refresh="getIdentify" @loadAction="loading"></router-view>
    </main>
    <footer class="py-4" style="background:rgb(0 29 78);">
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

<style lang="scss">
.loader {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.linkColor {
  color: rgb(12, 83, 189) !important;
  text-decoration: underline;
  &:hover {
    color: rgb(7, 65, 151) !important;
  }
}
</style>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default {
  data () {
    return {
      identify: {},
      isLoading: false
    }
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
          vm.isLoading = false
          vm.identify = response.data.result
          if (vm.identify.avatar == null) {
            vm.identify.avatar = 'https://upload.cc/i1/2020/09/09/wa8QmM.png'
          }
          if (get === '廠商') {
            vm.$router.push('/FirmBackstage')
          } else if (get === '會員') {
            vm.$router.push('/')
          }
        })
        .catch(function () {
          vm.isLoading = false
        })
    },
    signout: function () {
      document.cookie = `pet='';expires=${new Date(-1)}; path=/`
      this.getIdentify()
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: '登出成功',
        showConfirmButton: false,
        timer: 2000
      })
      this.$router.push('1')
    },
    loading: function (data) {
      switch (data) {
        case false:
          this.isLoading = false
          break
        default:
          this.isLoading = true
          break
      }
    }
  }
}
</script>
