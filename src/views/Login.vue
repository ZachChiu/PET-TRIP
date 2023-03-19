<template>
  <div class="login">
    <div class="container py-5">
      <div class="row no-gutters">
        <div class="col-lg-6 col-12 mx-auto border rounded">
          <ul id="myTab" class="nav nav-pills text-center" role="tablist">
            <li class="nav-item w-50">
              <a
                id="member-tab"
                class="nav-link active"
                data-toggle="tab"
                href="#member"
                role="tab"
                aria-controls="member"
                aria-selected="true"
                >會員登入</a
              >
            </li>
            <li class="nav-item w-50">
              <a
                id="firm-tab"
                class="nav-link"
                data-toggle="tab"
                href="#firm"
                role="tab"
                aria-controls="firm"
                aria-selected="false"
                >廠商登入</a
              >
            </li>
          </ul>
          <div id="myTabContent" class="tab-content">
            <div
              id="member"
              class="tab-pane fade show active"
              role="tabpanel"
              aria-labelledby="member-tab"
            >
              <ValidationObserver v-slot="{invalid}">
                <form class="py-5 px-2 px-sm-5" @submit.prevent="memberLogin">
                  <h3 class="text-center mb-3">會員登入</h3>
                  <ValidationProvider
                    v-slot="{errors, classes}"
                    rules="required|email"
                  >
                    <div class="form-group">
                      <label for="memberEmail">
                        帳號
                        <span class="text-danger">{{ errors[0] }}</span>
                      </label>
                      <input
                        id="memberEmail"
                        v-model="login.email"
                        type="text"
                        class="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        :class="classes"
                      />
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{errors, classes}"
                    rules="required"
                  >
                    <div class="form-group">
                      <label for="memberPassword">
                        密碼
                        <span class="text-danger">{{ errors[0] }}</span>
                      </label>
                      <input
                        id="memberPassword"
                        v-model="login.password"
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        :class="classes"
                      />
                      <a class="text-danger" href="#">忘記密碼?</a>
                    </div>
                  </ValidationProvider>

                  <div class="form-group d-flex">
                    <router-link
                      to="/MemberRegister"
                      class="w-50 mr-2 btn btn btn-outline-primary"
                      >會員註冊</router-link
                    >
                    <button
                      type="submit"
                      class="w-50 ml-2 btn btn-primary"
                      :disabled="invalid"
                      :class="{disabled: invalid}"
                    >
                      會員登入
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
            <div
              id="firm"
              class="tab-pane fade"
              role="tabpanel"
              aria-labelledby="firm-tab"
            >
              <ValidationObserver v-slot="{invalid}">
                <form class="py-5 px-2 px-sm-5" @submit.prevent="firmLogin">
                  <h3 class="text-center mb-3">廠商登入</h3>
                  <ValidationProvider
                    v-slot="{errors, classes}"
                    rules="required|email"
                  >
                    <div class="form-group">
                      <label for="firmEmail">
                        帳號
                        <span class="text-danger">{{ errors[0] }}</span>
                      </label>
                      <input
                        id="firmEmail"
                        v-model="login.email"
                        type="text"
                        class="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        :class="classes"
                      />
                    </div>
                  </ValidationProvider>

                  <ValidationProvider
                    v-slot="{errors, classes}"
                    rules="required"
                  >
                    <div class="form-group">
                      <label for="firmPassword">
                        密碼
                        <span class="text-danger">{{ errors[0] }}</span>
                      </label>
                      <input
                        id="firmPassword"
                        v-model="login.password"
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        :class="classes"
                      />
                      <a class="text-danger" href="#">忘記密碼?</a>
                    </div>
                  </ValidationProvider>

                  <div class="form-group d-flex">
                    <router-link
                      to="/FirmRegister"
                      class="w-50 mr-2 btn btn btn-outline-primary"
                      >廠商註冊</router-link
                    >
                    <button
                      type="submit"
                      class="w-50 ml-2 btn btn-primary"
                      :disabled="invalid"
                      :class="{disabled: invalid}"
                    >
                      廠商登入
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

export default {
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    };
  },
  created() {
    $('html, body').animate(
      {
        scrollTop: $('#app').offset().top,
      },
      0
    );
  },
  methods: {
    firmLogin() {
      const vm = this;
      vm.$emit('loadAction', true);
      const config = {
        method: 'post',
        url: 'http://pettrip.rocket-coding.com/api/Company/Login',
        data: {
          email: `${this.login.email}`,
          pwd: `${this.login.password}`,
        },
      };
      this.$http(config)
        .then(function(response) {
          if (response.data.result === '登入成功') {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: '登入成功',
              showConfirmButton: false,
              timer: 2000,
            });
            const token = response.data.token;
            document.cookie = `pet=${token};expires=${new Date() *
              1000}; path=/`;
            vm.$emit('page-refresh', '廠商');
          } else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: response.data.result,
              showConfirmButton: false,
              timer: 2000,
            });
            vm.$emit('loadAction', false);
          }
        })
        .catch(function() {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '登入失敗',
            timer: 2000,
            showConfirmButton: false,
          });
          vm.$emit('loadAction', false);
        });
    },
    memberLogin() {
      const vm = this;
      vm.$emit('loadAction', true);
      const config = {
        method: 'post',
        url: 'http://pettrip.rocket-coding.com/api/Member/Login',
        data: {
          email: `${this.login.email}`,
          pwd: `${this.login.password}`,
        },
      };
      this.$http(config)
        .then(function(response) {
          if (response.data.result === '登入成功') {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: '登入成功',
              showConfirmButton: false,
              timer: 2000,
            });
            const token = response.data.token;
            document.cookie = `pet=${token};expires=${new Date() *
              1000}; path=/`;
            vm.$emit('page-refresh', '會員');
          } else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: response.data.result,
              showConfirmButton: false,
              timer: 2000,
            });
            vm.$emit('loadAction', false);
          }
        })
        .catch(function() {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '登入失敗',
            timer: 2000,
            showConfirmButton: false,
          });
          vm.$emit('loadAction', false);
        });
    },
  },
};
</script>
