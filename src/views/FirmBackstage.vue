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
      <a href="#" class="sidebarBtn btn btn-dark rounded-0 position-absolute">
        <i class="change other fas fa-chevron-left d-none"></i>
        <i class="change fas fa-chevron-right d-none"></i>
      </a>
      <h5 class="text-center my-4">廠商後台管理</h5>
      <ul class="nav nav-pills nav-fill flex-column text-center">
        <li class="nav-item">
          <router-link to="/FirmBackstage" class="nav-link active"><i class="fas fa-clipboard-list"></i>
            訂單列表</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/FirmBackstage/FirmRoom" class="nav-link"><i class="fas fa-box-open"></i>空間管理</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/FirmBackstage" class="nav-link"><i class="fas fa-question"></i>問與答QA</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FirmBackstage/FirmSet" class="nav-link"><i class="fas fa-cog"></i>廠商設定</router-link>
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
$(document).ready(function () {
  $('.sidebarBtn').click(function (event) {
    event.preventDefault()
    $('.sideBar').toggleClass('show')
    $('.change').toggleClass('other')
  })
})
export default {
  data () {
    return {
    }
  }
}
</script>
