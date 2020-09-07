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
          <form class="py-5 px-2 px-sm-5" @submit.prevent="firmRegister">
            <h3 class="text-center mb-3">廠商註冊</h3>
            <div class="form-group">
              <label for="firmName">廠商名稱</label>
              <input
                type="text"
                id="firmName"
                class="form-control"
                required
                v-model="register.companyname"
              />
            </div>
            <div class="form-group">
              <label for="brandName">品牌名稱</label>
              <input
                type="text"
                id="brandName"
                class="form-control"
                v-model="register.companybrand"
              />
            </div>
            <div class="form-group">
              <label for="phone">電話</label>
              <input type="text" id="phone" class="form-control" v-model="register.phone" />
            </div>
            <div class="form-group">
              <label for="email">信箱(帳號)</label>
              <input type="email" class="form-control" id="email" v-model="register.email" />
            </div>
            <div class="form-group">
              <label for="password">密碼</label>
              <input type="password" class="form-control" id="password" v-model="register.pwd" />
            </div>
            <div class="form-group">
              <label for="passwordConfirm">再次確認密碼</label>
              <input
                type="password"
                class="form-control"
                id="passwordConfirm"
                v-model="register.pwdcheck"
              />
            </div>
            <div class="form-row">
              <div class="form-group col-6">
                <label for="inputCity">縣市</label>
                <select id="inputCity" class="form-control" v-model="register.country">
                  <option selected disabled>請選擇</option>
                  <option>高雄市</option>
                  <option>台北市</option>
                </select>
              </div>
              <div class="form-group col-6">
                <label for="inputState">區域</label>
                <select id="inputState" class="form-control" v-model="register.area">
                  <option selected disabled>請選擇</option>
                  <option>三民區</option>
                  <option>前鎮區</option>
                </select>
              </div>
              <div class="form-group col-12">
                <label for="address">地址</label>
                <input type="address" class="form-control" id="address" v-model="register.address" />
              </div>
            </div>
            <div class="form-group">
              <label for="identify">特定寵物業許可證號</label>
              <input type="text" class="form-control" id="identify" v-model="register.pblicense" />
            </div>
            <div class="form-group">
              <label for="date">有效日期</label>
              <input type="date" class="form-control" id="date" v-model="register.effectivedate" />
            </div>
            <div class="form-group d-flex mt-4">
              <router-link to="/Login" class="w-50 mr-2  btn btn-outline-primary">返回上一頁</router-link>
              <button type="submit" class="w-50 ml-2 btn btn-primary">廠商註冊</button>
            </div>
          </form>
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
        companyname: '子庭',
        companybrand: '子庭',
        phone: '1',
        email: '1111@gmail.com',
        pwd: '1',
        pwdcheck: '1',
        country: '高雄市',
        area: '三民區',
        address: '大昌路',
        pblicense: '1',
        effectivedate: '2020-08-01',
        avatar: null
      },
      fileUploading: false
    }
  },
  methods: {
    firmRegister: function () {
      const config = {
        method: 'post',
        url: 'http://pettrip.rocket-coding.com/api/Company/Register',
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
          effectivedate: `${this.register.effectivedate}`
        }
      }
      this.$http(config)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
