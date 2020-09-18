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
    <div class="container py-4">
      <div class="row">
        <div class="col-md-3 col-12 mb-3">
          <nav class="bg-light">
            <ul class="nav nav-pills flex-md-column text-center">
              <li class="nav-item" @click="pageCurrent = '/FirmBackstage'">
                <router-link
                  to="/FirmBackstage"
                  class="nav-link"
                  :class="{active:pageCurrent == '/FirmBackstage'}"
                >
                  <i class="fas fa-clipboard-list"></i>
                  訂單列表
                </router-link>
              </li>
              <li class="nav-item" @click="pageCurrent = '/FirmBackstage/FirmRoom'">
                <router-link
                  to="/FirmBackstage/FirmRoom"
                  class="nav-link"
                  :class="{active:pageCurrent == '/FirmBackstage/FirmRoom'}"
                >
                  <i class="fas fa-box-open"></i>空間管理
                </router-link>
              </li>
              <li class="nav-item" @click="pageCurrent = '/FirmBackstage/FirmQA'">
                <router-link
                  to="/FirmBackstage/FirmQA"
                  class="nav-link"
                  :class="{active:pageCurrent == '/FirmBackstage/FirmQA'}"
                >
                  <i class="fas fa-question"></i>問與答QA
                </router-link>
              </li>
              <li class="nav-item" @click="pageCurrent = '/FirmBackstage/FirmSet'">
                <router-link
                  to="/FirmBackstage/FirmSet"
                  class="nav-link"
                  :class="{active:pageCurrent == '/FirmBackstage/FirmSet'}"
                >
                  <i class="fas fa-cog"></i>廠商設定
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-9 col-12">
          <router-view :identify="identify" @checkStatus="getFirmBackstageData"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageCurrent: '/FirmBackstage'
    }
  },
  props: ['identify'],
  created () {
    this.getFirmBackstageData()
  },
  methods: {
    getFirmBackstageData: function () {
      this.pageCurrent = this.$route.path
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)pet\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      this.$http.defaults.headers.common.Authorization = `Bearer ${token}`
      if (token === '' || token == null || token === undefined) {
        this.$router.push('/')
      }
    }
  }
}
</script>
