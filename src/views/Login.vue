<template>
  <div class="login">
    <div class="banner position-relative">
      <div class="bannerText position-absolute text-dark display-4 font-weight-bold">登入</div>
      <img
        class="img-fluid"
        src="https://upload.cc/i1/2020/09/02/JE5b96.png"
        style="height: 200px;object-fit: cover; width: 100%;"
        alt
      />
    </div>
    <div class="container py-5">
      <div class="row no-gutters">
        <div class="col-lg-6 col-12 mx-auto border rounded">
          <ul class="nav nav-pills text-center" id="myTab" role="tablist">
            <li class="nav-item w-50">
              <a
                class="nav-link active"
                id="member-tab"
                data-toggle="tab"
                href="#member"
                role="tab"
                aria-controls="member"
                aria-selected="true"
              >會員登入</a>
            </li>
            <li class="nav-item w-50">
              <a
                class="nav-link"
                id="firm-tab"
                data-toggle="tab"
                href="#firm"
                role="tab"
                aria-controls="firm"
                aria-selected="false"
              >廠商登入</a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="member"
              role="tabpanel"
              aria-labelledby="member-tab"
            >
              <ValidationObserver v-slot="{ invalid }">
                <form class="py-5 px-2 px-sm-5" @submit.prevent="memberLogin">
                  <h3 class="text-center mb-3">會員登入</h3>
                  <ValidationProvider rules="required|email" v-slot="{ errors,classes }">
                    <div class="form-group">
                      <label for="memberEmail">
                        帳號
                        <span class="text-danger">{{errors[0]}}</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="memberEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        v-model="login.email"
                        :class="classes"
                      />
                    </div>
                  </ValidationProvider>
                  <ValidationProvider rules="required" v-slot="{ errors,classes }">
                    <div class="form-group">
                      <label for="memberPassword">
                        密碼
                        <span class="text-danger">{{errors[0]}}</span>
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="memberPassword"
                        placeholder="Password"
                        v-model="login.password"
                        :class="classes"
                      />
                      <a href="#">忘記密碼?</a>
                    </div>
                  </ValidationProvider>

                  <div class="form-group d-flex">
                    <router-link
                      to="/MemberRegister"
                      class="w-50 mr-2 btn btn btn-outline-primary"
                    >會員註冊</router-link>
                    <button
                      type="submit"
                      class="w-50 ml-2 btn btn-primary"
                      :disabled="invalid"
                      :class="{disabled:invalid}"
                    >會員登入</button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
            <div class="tab-pane fade" id="firm" role="tabpanel" aria-labelledby="firm-tab">
              <ValidationObserver v-slot="{ invalid }">
                <form class="py-5 px-2 px-sm-5" @submit.prevent="firmLogin">
                  <h3 class="text-center mb-3">廠商登入</h3>
                  <ValidationProvider rules="required|email" v-slot="{ errors,classes }">
                    <div class="form-group">
                      <label for="firmEmail">
                        帳號
                        <span class="text-danger">{{errors[0]}}</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="firmEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        v-model="login.email"
                        :class="classes"
                      />
                    </div>
                  </ValidationProvider>

                  <ValidationProvider rules="required" v-slot="{ errors,classes }">
                    <div class="form-group">
                      <label for="firmPassword">
                        密碼
                        <span class="text-danger">{{errors[0]}}</span>
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="firmPassword"
                        placeholder="Password"
                        v-model="login.password"
                        :class="classes"
                      />
                      <a href="#">忘記密碼?</a>
                    </div>
                  </ValidationProvider>

                  <div class="form-group d-flex">
                    <router-link
                      to="/FirmRegister"
                      class="w-50 mr-2 btn btn btn-outline-primary"
                    >廠商註冊</router-link>
                    <button type="submit" class="w-50 ml-2 btn btn-primary" :disabled="invalid"
                      :class="{disabled:invalid}">廠商登入</button>
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
export default {
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    firmLogin: function () {
      const config = {
        method: 'post',
        url: 'http://pettrip.rocket-coding.com/api/Company/Login',
        // url: 'https://9409bc01ef8b.ngrok.io/api/Company/Login',
        data: {
          email: `${this.login.email}`,
          pwd: `${this.login.password}`
        }
      }
      this.$http(config)
        .then(function (response) {
          console.log(response)
          if (response.data.result === '登入成功') {
            const token = response.data.token
            document.cookie = `pet=${token};expires=${
              new Date() * 1000
            }; path=/`
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    memberLogin: function () {
      const config = {
        method: 'post',
        url: 'http://pettrip.rocket-coding.com/api/Member/Login',
        // url: 'https://9409bc01ef8b.ngrok.io/api/Company/Login',
        data: {
          email: `${this.login.email}`,
          pwd: `${this.login.password}`
        }
      }
      this.$http(config)
        .then(function (response) {
          console.log(response)
          if (response.data.result === '登入成功') {
            const token = response.data.token
            document.cookie = `pet=${token};expires=${
              new Date() * 1000
            }; path=/`
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
