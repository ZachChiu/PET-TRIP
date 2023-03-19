<template>
  <div class="firmRegister">
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-6 col-11 mx-auto border rounded">
          <ValidationObserver v-slot="{invalid}">
            <form class="py-5 px-2 px-sm-5" @submit.prevent="firmRegister">
              <h3 class="text-center mb-3">廠商註冊</h3>
              <ValidationProvider v-slot="{errors, classes}" rules="required">
                <div class="form-group">
                  <label for="firmName" class="xrequired">廠商名稱</label>
                  <input
                    id="firmName"
                    v-model="register.companyname"
                    type="text"
                    class="form-control"
                    required
                    :class="classes"
                    autocomplete="off"
                    placeholder="Pet trip 股份有限公司"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider v-slot="{errors, classes}" rules="required">
                <div class="form-group">
                  <label for="brandName">品牌名稱</label>
                  <input
                    id="brandName"
                    v-model="register.companybrand"
                    type="text"
                    class="form-control"
                    :class="classes"
                    autocomplete="off"
                    placeholder="Pet trip"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{errors, classes}"
                rules="required|numeric"
              >
                <div class="form-group">
                  <label for="電話">電話</label>
                  <input
                    id="電話"
                    v-model="register.phone"
                    type="text"
                    class="form-control"
                    :class="classes"
                    autocomplete="off"
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
                    type="text"
                    class="form-control"
                    :class="classes"
                    autocomplete="off"
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
                    :class="classes"
                    autocomplete="off"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{errors, classes}"
                rules="required|password:@密碼|alpha_num"
              >
                <div class="form-group">
                  <label for="確認密碼">再次確認密碼</label>
                  <input
                    id="確認密碼"
                    v-model="register.pwdcheck"
                    type="password"
                    class="form-control"
                    :class="classes"
                    autocomplete="off"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <div class="form-row">
                <div class="form-group col-6">
                  <ValidationProvider
                    v-slot="{errors, classes}"
                    rules="required"
                  >
                    <label for="inputCity">縣市</label>
                    <select
                      id="inputCity"
                      v-model="register.country"
                      class="form-control"
                      :class="classes"
                      @change="selectRegion"
                    >
                      <option value selected disabled>請選擇</option>
                      <option
                        v-for="(region, index) in regionList"
                        :key="index"
                        :value="region"
                        >{{ region }}</option
                      >
                    </select>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group col-6">
                  <ValidationProvider
                    v-slot="{errors, classes}"
                    rules="required"
                  >
                    <label for="inputState">區域</label>
                    <select
                      id="inputState"
                      v-model="register.area"
                      class="form-control"
                      :class="classes"
                    >
                      <option value disabled>請選擇</option>
                      <option
                        v-for="(area, index) in areaList"
                        :key="index"
                        :selected="area == '中正區'"
                        :value="area"
                        >{{ area }}</option
                      >
                    </select>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group col-12">
                  <ValidationProvider
                    v-slot="{errors, classes}"
                    rules="required"
                  >
                    <label for="address">地址</label>
                    <input
                      id="address"
                      v-model="register.address"
                      type="address"
                      class="form-control"
                      :class="classes"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <ValidationProvider v-slot="{errors, classes}" rules="required">
                <div class="form-group">
                  <label for="identify">特定寵物業許可證號</label>
                  <input
                    id="identify"
                    v-model="register.pblicense"
                    type="text"
                    class="form-control"
                    :class="classes"
                    autocomplete="off"
                    placeholder="特寵業繁字第********號"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider v-slot="{errors, classes}" rules="required">
                <div class="form-group">
                  <label for="date">有效日期</label>
                  <vc-date-picker
                    v-model="register.effectivedate"
                    :min-date="new Date()"
                    :value="Object"
                  >
                    <input
                      id="date"
                      slot-scope="{inputProps, inputEvents}"
                      class="form-control"
                      :class="classes"
                      v-bind="inputProps"
                      v-on="inputEvents"
                    />
                  </vc-date-picker>
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
                  :disabled="invalid"
                  :class="{disabled: invalid}"
                  class="w-50 ml-2 btn btn-primary"
                >
                  廠商註冊
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
/* global $ */
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import taiwan from '@/taiwan_districts.json';

export default {
  data() {
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
        effectivedate: new Date(),
      },
      regionList: [],
      areaList: [],
      fileUploading: false,
      taiwan,
    };
  },
  created() {
    $('html, body').animate(
      {
        scrollTop: $('#app').offset().top,
      },
      0
    );
    this.getRegion();
  },
  methods: {
    firmRegister() {
      const vm = this;
      vm.$emit('loadAction', true);
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
          effectivedate: new Date(
            this.register.effectivedate
          ).toLocaleDateString(),
        },
      };
      this.$http(config)
        .then(function(response) {
          if (response.data.result === '註冊成功') {
            vm.$router.push('/Login');
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: '註冊成功，請登入',
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: response.data.result,
              showConfirmButton: false,
              timer: 2000,
            });
          }
          vm.$emit('loadAction', false);
        })
        .catch(function() {
          vm.$emit('loadAction', false);
        });
    },
    getRegion() {
      this.taiwan.forEach((item) => this.regionList.push(item.name));
    },
    selectRegion() {
      const vm = this;
      vm.areaList = [];
      this.taiwan.forEach(function(item) {
        if (vm.register.country.indexOf(item.name) !== -1) {
          item.districts.forEach((area) => vm.areaList.push(area.name));
          vm.register.area = item.districts[0].name;
        }
      });
    },
  },
};
</script>
