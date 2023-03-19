<template>
  <div class="memberRegister">
    <div class="container my-5">
      <div class="row">
        <div class="col-lg-6 col-11 mx-auto border rounded">
          <ValidationObserver v-slot="{invalid}">
            <form class="py-5 px-2 px-sm-5" @submit.prevent="memberRegister">
              <h3 class="text-center mb-3">會員註冊</h3>
              <ValidationProvider v-slot="{errors, classes}" rules="required">
                <div class="form-group">
                  <label for="name">姓名</label>
                  <input
                    id="name"
                    v-model="register.membername"
                    type="text"
                    class="form-control"
                    required
                    :class="classes"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{errors, classes}"
                rules="required|email"
              >
                <div class="form-group">
                  <label for="email">信箱 (帳號)</label>
                  <input
                    id="email"
                    v-model="register.email"
                    type="email"
                    class="form-control"
                    required
                    :class="classes"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{errors, classes}"
                name="密碼"
                rules="required|alpha_num"
              >
                <div class="form-group">
                  <label for="password">密碼</label>
                  <input
                    id="password"
                    v-model="register.pwd"
                    type="password"
                    class="form-control"
                    required
                    :class="classes"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{errors, classes}"
                rules="required|password:@密碼|alpha_num"
              >
                <div class="form-group">
                  <label for="密碼">再次確認密碼</label>
                  <input
                    id="密碼"
                    v-model="register.pwdcheck"
                    type="password"
                    class="form-control"
                    required
                    :class="classes"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <div class="form-group d-flex mt-4">
                <router-link
                  to="/Login"
                  class="w-50 mr-2 btn btn-outline-primary"
                  >返回上一頁</router-link
                >
                <button
                  type="submit"
                  class="w-50 ml-2 btn btn-primary"
                  :disabled="invalid"
                  :class="{disabled: invalid}"
                >
                  會員註冊
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

export default {
  data() {
    return {
      register: {
        membername: '',
        email: '',
        pwd: '',
        pwdcheck: '',
      },
    };
  },
  methods: {
    memberRegister() {
      const vm = this;
      vm.$emit('loadAction', true);
      const config = {
        method: 'post',
        url: 'http://pettrip.rocket-coding.com/api/Member/Register',
        data: {
          membername: `${this.register.membername}`,
          email: `${this.register.email}`,
          pwd: `${this.register.pwd}`,
        },
      };
      this.$http(config)
        .then(function(response) {
          if (response.data.result === '註冊成功') {
            vm.$emit('loadAction', false);
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: '註冊成功，請重新登入',
              showConfirmButton: false,
              timer: 2000,
            });
            vm.$router.push('/Login');
          } else {
            vm.$emit('loadAction', false);
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: response.data.result,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
        .catch(function() {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '註冊失敗',
            showConfirmButton: false,
            timer: 2000,
          });
          vm.$emit('loadAction', false);
        });
    },
  },
};
</script>
