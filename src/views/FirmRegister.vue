<template>
  <div class="firmRegister">
    <div class="banner position-relative">
      <div class="bannerText position-absolute text-dark display-4 font-weight-bold">註冊</div>
      <img
        class="img-fluid"
        src="https://upload.cc/i1/2020/09/02/JE5b96.png"
        style="height: 200px;object-fit: cover; width: 100%;"
        alt
      />
    </div>
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-6 col-11 mx-auto border rounded">
          <ValidationObserver v-slot="{ invalid }">
            <form class="py-5 px-2 px-sm-5" @submit.prevent="firmRegister">
              <h3 class="text-center mb-3">廠商註冊</h3>
              <ValidationProvider rules="required" v-slot="{ errors,classes }">
                <div class="form-group">
                  <label for="firmName" class="xrequired">廠商名稱</label>
                  <input
                    type="text"
                    id="firmName"
                    class="form-control"
                    required
                    v-model="register.companyname"
                    :class="classes"
                    autocomplete="off"
                    placeholder="xx股份有限公司"
                  />
                  <span class="text-danger">{{errors[0]}}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors,classes }">
                <div class="form-group">
                  <label for="brandName">品牌名稱</label>
                  <input
                    type="text"
                    id="brandName"
                    class="form-control"
                    v-model="register.companybrand"
                    :class="classes"
                    autocomplete="off"
                  />
                  <span class="text-danger">{{errors[0]}}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors,classes }">
                <div class="form-group">
                  <label for="phone">電話</label>
                  <input
                    type="text"
                    id="phone"
                    class="form-control"
                    v-model="register.phone"
                    :class="classes"
                    autocomplete="off"
                  />
                  <span class="text-danger">{{errors[0]}}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required|email" v-slot="{ errors,classes }">
                <div class="form-group">
                  <label for="email">信箱 (帳號)</label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    v-model="register.email"
                    :class="classes"
                    autocomplete="off"
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
                    v-model="register.pwd"
                    :class="classes"
                    autocomplete="off"
                  />
                  <span class="text-danger">{{errors[0]}}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider
                rules="required|password:@密碼|alpha_num"
                v-slot="{ errors,classes }"
              >
                <div class="form-group">
                  <label for="確認密碼">再次確認密碼</label>
                  <input
                    type="password"
                    class="form-control"
                    id="確認密碼"
                    v-model="register.pwdcheck"
                    :class="classes"
                    autocomplete="off"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <div class="form-row">
                <div class="form-group col-6">
                  <ValidationProvider rules="required" v-slot="{ classes }">
                    <label for="inputCity">縣市</label>
                    <select
                      id="inputCity"
                      class="form-control"
                      v-model="register.country"
                      :class="classes"
                    >
                      <option value selected disabled>請選擇</option>
                      <option>高雄市</option>
                      <option>台北市</option>
                    </select>
                  </ValidationProvider>
                </div>
                <div class="form-group col-6">
                  <ValidationProvider rules="required" v-slot="{ errors,classes }">
                    <label for="inputState">區域</label>
                    <select
                      id="inputState"
                      class="form-control"
                      v-model="register.area"
                      :class="classes"
                    >
                      <option value selected disabled>請選擇</option>
                      <option>三民區</option>
                      <option>前鎮區</option>
                    </select>
                    <span class="text-danger">{{errors[0]}}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group col-12">
                  <ValidationProvider rules="required" v-slot="{ errors,classes }">
                    <label for="address">地址</label>
                    <input
                      type="address"
                      class="form-control"
                      id="address"
                      v-model="register.address"
                      :class="classes"
                    />
                    <span class="text-danger">{{errors[0]}}</span>
                  </ValidationProvider>
                </div>
              </div>
              <ValidationProvider rules="required" v-slot="{ errors,classes }">
                <div class="form-group">
                  <label for="identify">特定寵物業許可證號</label>
                  <input
                    type="text"
                    class="form-control"
                    id="identify"
                    v-model="register.pblicense"
                    :class="classes"
                    autocomplete="off"
                    placeholder="特寵業繁字第********號"
                  />
                  <span class="text-danger">{{errors[0]}}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors,classes }">
                <div class="form-group">
                  <label for="date">有效日期</label>
                  <vc-date-picker  :min-date="new Date()" :value="Object" v-model="register.effectivedate"><input
          id="date"
          slot-scope="{ inputProps, inputEvents }"
           class="form-control"
          :class="classes"
          v-bind="inputProps"
          v-on="inputEvents" ></vc-date-picker>
                  <span class="text-danger">{{errors[0]}}</span>
                </div>
              </ValidationProvider>
              <div class="form-group d-flex mt-4">
                <router-link to="/Login" class="w-50 mr-2 btn btn-outline-primary">返回上一頁</router-link>
                <button
                  type="submit"
                  :disabled="invalid"
                  :class="{disabled:invalid}"
                  class="w-50 ml-2 btn btn-primary"
                >廠商註冊</button>
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
      change: '',
      register: {
        companyname: '',
        companybrand: '',
        phone: '',
        email: '',
        pwd: '',
        pwdcheck: '',
        country: '',
        area: '',
        address: '',
        pblicense: '',
        effectivedate: new Date()
      },
      fileUploading: false
    }
  },
  methods: {
    firmRegister: function () {
      const vm = this
      const config = {
        method: 'post',
        url: 'http://pettrip.rocket-coding.com/api/Company/Register',
        // url: 'https://9409bc01ef8b.ngrok.io/api/Company/Register',

        data: {
          companyname: `${this.register.companyname}`,
          companybrand: `${this.register.companybrand}`,
          phone: `${this.register.phone}`,
          email: `${this.register.email}`,
          pwd: `${this.register.pwd}`,
          country: `${this.register.country}`,
          area: `${this.register.area}`,
          address: `${this.register.address}`,
          pblicense: `${this.register.pblicense}`,
          effectivedate: `new Date(${this.register.effectivedate}).toLocaleDateString()`
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
