<template>
  <div class="layout">
    <div
      v-if="
        (identify.identity == '廠商' || identify.identity == '會員') &&
          noticeData.unread !== undefined
      "
      class="notice position-fixed"
    >
      <a
        href="#"
        class="noticeBtn animate__animated btn btn-dark rounded-circle"
        @click.prevent="toggleNotice"
        ><span
          v-if="noticeData.unread != 0 && noticeData.unread != null"
          class="read position-absolute btn bg-danger btn-outline-danger text-white rounded-circle"
          >{{ noticeData.unread }}</span
        ><i class="fas fa-bell"></i
      ></a>
      <div
        class="noticeList position-absolute animate__animated animate__rotateOutUpRight d-none"
      >
        <ul class="list-group">
          <li
            v-if="noticeData.notices != null"
            class="list-group-item list-group-item-action text-center"
          >
            <button
              class="d-flex align-items-center justify-content-center btn btn-outline-secondary w-100"
              :class="{disabled: load}"
              :disabled="load"
              @click="allIsread"
            >
              <ring-loader
                class="custom-class mr-1"
                :color="'black'"
                :loading="load"
                :size="20"
              ></ring-loader
              >全部已讀
            </button>
          </li>
          <li
            v-if="noticeData.notices == null"
            class="list-group-item list-group-item-action"
          >
            無通知
          </li>
          <li
            v-for="(item, index) in noticeData.notices"
            :key="index"
            class="list-group-item list-group-item-action p-0"
          >
            <a
              class="d-block p-3 text-dark"
              href="#"
              @click.prevent="getTo(item)"
              ><span v-if="item.state == '未讀'" class="text-danger"
                ><i class="mr-1 fas fa-envelope"></i>新通知：</span
              ><span v-if="item.state == '已讀'" class="mr-2 text-primary"
                ><i class="fas fa-envelope-open"></i
              ></span>
              <span v-if="item.type == '問通知'">你已收到一筆新的提問</span
              ><span v-if="item.type == '答通知'">你的提問已得到回覆</span
              ><span v-if="item.type == '下單通知'">你有一筆新的訂單</span
              ><i class="ml-2 fas fa-external-link-alt"></i>
              <p class="mb-0">
                <small class="text-muted">{{ item.time }}</small>
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-show="isLoading" class="loader">
      <hash-loader
        class="custom-class"
        :color="'#FFDE47'"
        :loading="isLoading"
        :size="70"
      ></hash-loader>
    </div>
    <nav
      class="headerNav navbar navbar-expand-md navbar-light bg-light position-sticky"
    >
      <div class="container">
        <h1 class="h6 mb-0">
          <router-link to="/" class="navbar-brand">
            <img width="80" :src="LOGO" alt />
            Pet Trip
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
        <div id="navbarSupportedContent" class="collapse navbar-collapse">
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
              v-if="identify.identity != '廠商' && identify.identity != '會員'"
              class="nav-item hoveritem"
            >
              <router-link to="/Login" class="nav-link">
                <i class="fas fa-paw mr-1"></i>註冊 / 登入
              </router-link>
            </li>
            <li
              v-if="identify.identity == '廠商'"
              class="firmDrop nav-item dropdown"
            >
              <a
                id="navbarDropdown"
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="d-inline d-md-none">
                  <i class="fas fa-paw mr-1"></i>管理後台
                </span>
                <img
                  style="width: 40px; height: 40px; object-fit: cover"
                  class="d-md-inline d-none img-fluid rounded-circle"
                  :src="identify.avatar"
                  alt
                />
              </a>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <router-link to="/FirmBackstage/FirmSet" class="dropdown-item"
                  >廠商設定</router-link
                >
                <router-link to="/FirmBackstage" class="dropdown-item"
                  >訂單列表</router-link
                >
                <router-link to="/FirmBackstage/FirmRoom" class="dropdown-item"
                  >空間管理</router-link
                >
                <router-link to="/FirmBackstage/FirmQA" class="dropdown-item"
                  >問與答</router-link
                >
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" @click="signout">登出</a>
              </div>
            </li>
            <li
              v-if="identify.identity == '會員'"
              class="memberDrop nav-item dropdown"
            >
              <a
                id="navbarDropdown"
                ref="#"
                class="nav-link dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="d-inline d-md-none">
                  <i class="fas fa-paw mr-1"></i>我的頁面
                </span>
                <img
                  style="width: 40px; height: 40px; object-fit: cover"
                  class="d-md-inline d-none img-fluid rounded-circle"
                  :src="identify.avatar"
                  alt
                />
              </a>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <router-link
                  to="/MemberBackstage/MemberSet"
                  class="dropdown-item"
                  >會員設定</router-link
                >
                <router-link to="/MemberBackstage" class="dropdown-item"
                  >訂單列表</router-link
                >
                <router-link
                  to="/MemberBackstage/MemberQA"
                  class="dropdown-item"
                  >問與答</router-link
                >
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" @click="signout">登出</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="hasLayoutBanner" class="banner position-relative">
      <div
        class="bannerText position-absolute text-dark display-4 font-weight-bold"
      >
        {{ title }}
      </div>
      <img
        class="img-fluid"
        :src="LayoutBg"
        style="height: 200px; object-fit: cover; width: 100%"
        alt
      />
    </div>
    <main>
      <router-view
        :identify="identify"
        @page-refresh="getIdentify"
        @loadAction="loading"
      ></router-view>
    </main>
    <footer class="layoutFooter py-5 text-white">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6 style="letter-spacing: 2px">
              <i class="mr-1 far fa-address-card"></i>關於 PET TRIP
            </h6>
            <p class="text-muted">
              歡迎來到<i class="mx-1">PET TRIP</i
              >寵物寄宿平台，為了使飼主能夠更快速、更安心的尋找合法的寵物寄宿廠商，並且讓寵物寄宿廠商有個完善的曝光平台，此平台正式於
              2020 年誕生。
            </p>
          </div>
          <div class="col-6 col-md-3">
            <h6 style="letter-spacing: 2px">
              <i class="mr-1 fas fa-fingerprint"></i>通用類別
            </h6>
            <ul class="list-unstyled my-0">
              <li class="my-2">
                <router-link to="/About" class="text-muted"
                  >關於我們
                </router-link>
              </li>
              <li class="my-2">
                <router-link to="/Rules" class="text-muted"
                  >服務條款
                </router-link>
              </li>
            </ul>
          </div>
          <div class="col-6 col-md-3">
            <h6 style="letter-spacing: 2px">
              <i class="mr-1 far fa-question-circle"></i>問題專區
            </h6>
            <ul class="list-unstyled my-0">
              <li class="my-2">
                <router-link to="/Common" class="text-muted"
                  >常見問題
                </router-link>
              </li>
              <li class="my-2">
                <router-link to="/Report" class="text-muted"
                  >問題回報
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <hr class="border-secondary" />
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="text-muted">
              Copyright &copy; 2020 All Rights Reserved by Pet Trip.
              <br />本網站僅供火箭隊專題使用
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="list-unstyled d-flex justify-content-end">
              <li class="mx-3">
                <a class="facebook h2" href="#"
                  ><i class="fab fa-facebook"></i
                ></a>
              </li>
              <li class="mx-3">
                <a class="twitter h2" href="#"
                  ><i class="fab fa-twitter"></i
                ></a>
              </li>
              <li class="mx-3">
                <a class="instagram h2" href="#"
                  ><i class="fab fa-instagram-square"></i
                ></a>
              </li>
              <li class="mx-3">
                <a
                  class="github h2"
                  target="_blank"
                  href="https://github.com/ZachChiu/PET-TRIP"
                  ><i class="fab fa-github"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
/* global $ */
import {hubConnection} from 'signalr-no-jquery';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import LayoutBg from '@/assets/img/Layout/layout-bg.png';
import LOGO from '@/assets/img/Pet Trip LOGO.png';
import Cookies from 'js-cookie';
import AvatarDefault from '@/assets/img/Home/Avatar-default.png';
import {getIdentity} from '@/lib/service/identity.js';
export default {
  data() {
    return {
      LayoutBg,
      LOGO,
      load: false,
      identify: {},
      isLoading: false,
      noticeData: {},
      isOpen: false,
      hub: hubConnection('http://pettrip.rocket-coding.com:80'),
    };
  },
  computed: {
    hasLayoutBanner() {
      return this.$route.meta?.hasLayoutBanner;
    },
    title() {
      return this.$route.meta.title;
    },
  },
  created() {
    $('html, body').animate(
      {
        scrollTop: $('#app').offset().top,
      },
      0
    );
    const jwt = Cookies.get('jwt');
    if (jwt) {
      this.getIdentify();
    }
  },
  methods: {
    async getIdentify(type) {
      try {
        this.isLoading = true;

        const res = await getIdentity();
        if (res.result === '無授權') {
          throw new Error('no auth');
        }
        this.identify = res;

        if (this.identify.avatar == null) {
          this.identify.avatar = AvatarDefault;
        }
        if (type === '廠商') {
          this.$router.push('/FirmBackstage');
        } else if (type === '會員') {
          this.$router.push('/');
        }
        this.connectHub();
        this.isLoading = false;
      } catch (error) {
        Cookies.remove('jwt');
      } finally {
        this.isLoading = false;
      }
    },
    allIsread() {
      const vm = this;
      vm.load = true;
      this.$http
        .get('http://pettrip.rocket-coding.com/api/Notice/Readall')
        .then(function() {
          vm.$http('http://pettrip.rocket-coding.com/api/Notice/GetNotice')
            .then(function(response) {
              vm.load = false;
              vm.noticeData = response.data;
            })
            .catch(function() {
              vm.load = false;
            });
        })
        .catch(function() {
          vm.load = false;
        });
    },
    toggleNotice() {
      $('.noticeList').removeClass('d-none');
      if (!this.isOpen) {
        $('.noticeList').removeClass('animate__rotateOutUpRight');
        $('.noticeList').addClass('animate__rotateInUpRight');
        this.isOpen = !this.isOpen;
      } else {
        $('.noticeList').removeClass('animate__rotateInUpRight');
        $('.noticeList').addClass('animate__rotateOutUpRight');
        this.isOpen = !this.isOpen;
      }
    },
    getTo(item) {
      const vm = this;
      const config = {
        method: 'post',
        url: 'http://pettrip.rocket-coding.com/api/Notice/Readone',
        headers: {},
        data: {
          noticeseq: item.noticeseq,
        },
      };
      this.$http(config).then(function() {
        vm.$http('http://pettrip.rocket-coding.com/api/Notice/GetNotice').then(
          function(response) {
            vm.noticeData = response.data;
          }
        );
      });
      $('.noticeList').removeClass('animate__rotateInUpRight');
      $('.noticeList').addClass('animate__rotateOutUpRight');
      this.isOpen = !this.isOpen;
      if (
        item.type === '問通知' &&
        this.$route.fullPath !== '/FirmBackstage/FirmQA'
      ) {
        this.$router.push('/FirmBackstage/FirmQA');
      } else if (
        item.type === '答通知' &&
        this.$route.fullPath !== '/MemberBackstage/MemberQA'
      ) {
        this.$router.push('/MemberBackstage/MemberQA');
      } else if (
        item.type === '下單通知' &&
        this.$route.fullPath !== '/FirmBackstage'
      ) {
        this.$router.push('/FirmBackstage');
      }
    },
    signout() {
      document.cookie = `pet='';expires=${new Date(-1)}; path=/`;
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: '登出成功',
        showConfirmButton: false,
        timer: 2000,
      });
      if (
        this.$route.path.indexOf('/FirmBackstage') !== -1 ||
        this.$route.path.indexOf('/MemberBackstage') !== -1
      ) {
        this.$router.push('1');
      }
      this.getIdentify();
      this.hub.stop();
    },
    connectHub() {
      const vm = this;
      const proxy = this.hub.createHubProxy('DefaultHub');
      proxy.on('Get', function(get) {
        $('.noticeBtn').addClass('animate__bounce ');
        setTimeout(() => {
          $('.noticeBtn').removeClass('animate__bounce ');
        }, 1500);
        vm.noticeData = get;
      });
      this.hub.start({jsonp: true}).done(function() {
        vm.getCall();
        const config = {
          method: 'post',
          url: 'http://pettrip.rocket-coding.com/api/Notice/Sendid',
          data: {
            connectid: vm.hub.id,
          },
        };
        vm.$http(config);
        // .then(function() {})
        // .catch(function() {});
      });
      // .fail(function() {});
    },
    getCall() {
      const vm = this;
      const config = {
        method: 'get',
        url: 'http://pettrip.rocket-coding.com/api/Notice/GetNotice',
      };
      this.$http(config).then(function(response) {
        vm.noticeData = response.data;
      });
      // .catch(function() {});
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
