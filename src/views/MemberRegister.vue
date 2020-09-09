<template>
  <div class="memberRegister">
    <div class="banner position-relative">
      <div class="bannerText position-absolute text-dark display-4 font-weight-bold">註冊</div>
      <img
        class="img-fluid"
        src="https://upload.cc/i1/2020/09/02/JE5b96.png"
        style="height: 200px;object-fit: cover; width: 100%;"
        alt
      />
    </div>
    <div class="container my-5">
      <div class="row">
        <div class="col-lg-6 col-11 mx-auto border rounded">
          <ValidationObserver v-slot="{ invalid }">
            <form class="py-5 px-2 px-sm-5" @submit.prevent="memberRegister">
              <h3 class="text-center mb-3">會員註冊</h3>
              <ValidationProvider rules="required" v-slot="{ errors,classes }">
                <div class="form-group">
                  <label for="name">姓名</label>
                  <input
                    type="text"
                    id="name"
                    class="form-control"
                    required
                    v-model="register.membername"
                    :class="classes"
                  />
                  <span class="text-danger">{{errors[0]}}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required|email" v-slot="{ errors,classes }">
                <div class="form-group">
                  <label for="email">信箱 (帳號)</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    required
                    v-model="register.email"
                    :class="classes"
                  />
                  <span class="text-danger">{{errors[0]}}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider name="密碼" rules="required|alpha_num" v-slot="{ errors,classes }">
                <div class="form-group">
                  <label for="password">密碼</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    required
                    v-model="register.pwd"
                    :class="classes"
                  />
                  <span class="text-danger">{{errors[0]}}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider
                rules="required|password:@密碼|alpha_num"
                v-slot="{ errors,classes }"
              >
                <div class="form-group">
                  <label for="密碼">再次確認密碼</label>
                  <input
                    type="password"
                    class="form-control"
                    id="密碼"
                    required
                    v-model="register.pwdcheck"
                    :class="classes"
                  />
                  <span class="text-danger">{{errors[0]}}</span>
                </div>
              </ValidationProvider>

              <div class="form-group d-flex mt-4">
                <router-link to="/Login" class="w-50 mr-2 btn btn-outline-primary">返回上一頁</router-link>
                <button
                  type="submit"
                  class="w-50 ml-2 btn btn-primary"
                  :disabled="invalid"
                  :class="{disabled:invalid}"
                >會員註冊</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      register: {
        membername: '',
        email: '1@gmail.com',
        pwd: '1',
        pwdcheck: '1'
      }
    }
  },
  methods: {
    memberRegister: function () {
      const vm = this
      const config = {
        method: 'post',
        url: 'http://pettrip.rocket-coding.com/api/Member/Register',
        data: {
          membername: `${this.register.membername}`,
          email: `${this.register.email}`,
          pwd: `${this.register.pwd}`
        }
      }
      this.$http(config)
        .then(function (response) {
          console.log(response)
          if (response.data.result === '註冊成功') {
            vm.$router.push('/Login')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
