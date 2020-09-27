<template>
  <div class="firmSet pb-5">
    <div class="container mx-auto">
      <ul class="nav nav-tabs nav-fill text-center" id="myTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="firmIntroduce-tab"
            data-toggle="tab"
            href="#firmIntroduce"
            role="tab"
            aria-controls="firmIntroduce"
            aria-selected="true"
          >廠商介紹</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="firmData-tab"
            data-toggle="tab"
            href="#firmData"
            role="tab"
            aria-controls="firmData"
            aria-selected="false"
          >廠商資料</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="passwordChange-tab"
            data-toggle="tab"
            href="#passwordChange"
            role="tab"
            aria-controls="passwordChange"
            aria-selected="false"
          >密碼修改</a>
        </li>
      </ul>
      <div class="bg-white text-nowrap tab-content border border-top-0" id="myTabContent">
        <div
          class="tab-pane p-3 fade show active"
          id="firmIntroduce"
          role="tabpanel"
          aria-labelledby="firmIntroduce-tab"
        >
          <form action="#" class>
            <div class="form-group row">
              <label
                class="col-md-3 col-lg-2 col-form-label font-weight-bold"
                for="mainIntroduce"
              >主頁介紹</label>
              <div class="col-md-9 col-lg-10">
                <textarea
                  class="form-control"
                  id="mainIntroduce"
                  rows="3"
                  v-model="companyData.introduce"
                ></textarea>
              </div>
            </div>
            <div class="form-group align-items-center row text-wrap">
              <label class="col-md-3 col-lg-2 col-form-label font-weight-bold" for="response">回覆時間</label>
              <div class="col-md-9 col-lg-10">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="morning"
                    value="cat"
                    v-model="companyData.morning"
                  />
                  <label class="form-check-label" for="morning">早上</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="afternoon"
                    value="dog"
                    v-model="companyData.afternoon"
                  />
                  <label class="form-check-label" for="afternoon">下午</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="night"
                    value="other"
                    v-model="companyData.night"
                  />
                  <label class="form-check-label" for="night">晚上</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="midnight"
                    value="other"
                    v-model="companyData.midnight"
                  />
                  <label class="form-check-label" for="midnight">半夜</label>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 col-lg-2 col-form-label font-weight-bold" for="spaceName">主頁相片</label>
              <div class="col-md-9 col-lg-10">
                <input
                  type="text"
                  class="form-control"
                  id="spaceName"
                  placeholder="圖片連結"
                  v-model.trim="companyData.bannerimg"
                />
              </div>
            </div>

            <div class="form-group d-flex mb-0">
              <label for="upload" class="d-flex align-items-center ml-auto btn btn-dark" :class="{disabled:FirmPicUploading}">
               <ring-loader class="custom-class" :color="'black'" :loading="FirmPicUploading" :size="20"></ring-loader>主頁照片上傳
                <input
                  type="file"
                  id="upload"
                  class="d-none"
                  @change="updateFirmPic"
                  :disabled="FirmPicUploading"
                />
              </label>
            </div>
            <p class="text-muted text-right mb-0">
              <small>儲存才能成功上傳圖片歐</small>
            </p>
            <div
              class="mx-auto"
              :style="{backgroundImage: 'url(' + companyData.bannerimg + ')'}"
              style="background-size: cover;background-position:center"
            >
              <img
                src="https://upload.cc/i1/2020/09/04/0MY4iy.png"
                :class="{opacityZero:companyData.bannerimg != ''}"
                class="w-100 img-fluid"
                alt
              />
            </div>

            <div class="form-group d-flex justify-content-center mt-4">
              <button type="button" class="btn btn-primary" @click="saveFirmData" :class="{disabled:FirmPicUploading}" :disabled="FirmPicUploading">儲存</button>
            </div>
          </form>
        </div>
        <div class="tab-pane p-3 fade" id="firmData" role="tabpanel" aria-labelledby="firmData-tab">
          <div class="row no-gutters text-wrap">
            <div class="col-12">
              <div
                class="rounded-circle mx-auto overflow-hidden"
                :style="{backgroundImage: 'url(' + companyData.avatar + ')'}"
                style="background-size: cover;max-width: 300px;background-position:center"
              >
                <img
                  src="https://upload.cc/i1/2020/09/01/IaZYfp.png"
                  :class="{opacityZero:companyData.avatar != ''}"
                  class="w-100 img-fluid"
                  alt
                />
              </div>
              <div class="form-group d-flex my-4">
                <label
                  for="uploadAvatar"
                  class="d-flex align-items-center btn btn-primary mx-auto"
                  :class="{disabled:FirmAvatarUploading}"
                >
<ring-loader class="custom-class" :color="'black'" :loading="FirmAvatarUploading" :size="20"></ring-loader>更新頭像
                  <input
                    type="file"
                    id="uploadAvatar"
                    class="d-none"
                    @change="updateFirmAvatar"
                    :disabled="FirmAvatarUploading"
                  />
                </label>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="row no-gutters">
                <div class="col-md-4 col-12 font-weight-bold">
                  <p>廠商名稱</p>
                </div>
                <div class="col-md-8 col-12">
                  <p>{{companyData.companyname}}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="row no-gutters">
                <div class="col-md-4 col-12 font-weight-bold">
                  <p>品牌名稱</p>
                </div>
                <div class="col-md-8 col-12">
                  <p>{{companyData.companybrand}}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="row no-gutters">
                <div class="col-md-4 col-12 font-weight-bold">
                  <p>帳號</p>
                </div>
                <div class="col-md-8 col-12">
                  <p>{{companyData.email}}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="row no-gutters">
                <div class="col-md-4 col-12 font-weight-bold">
                  <p>廠商編號</p>
                </div>
                <div class="col-md-8 col-12">
                  <p>{{companyData.companyseq}}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="row no-gutters">
                <div class="col-md-4 col-12 font-weight-bold">
                  <p>電話</p>
                </div>
                <div class="col-md-8 col-12">
                  <p>{{companyData.phone}}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="row no-gutters">
                <div class="col-md-4 col-12 font-weight-bold">
                  <p>廠商地址</p>
                </div>
                <div class="col-md-8 col-12">
                  <p>
                    <span>{{companyData.country}}</span>
                    <span>{{companyData.area}}</span>
                    <span>{{companyData.address}}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="row no-gutters">
                <div class="col-md-4 col-12 font-weight-bold">
                  <p>寵物業許可證號</p>
                </div>
                <div class="col-md-8 col-12">
                  <p>{{companyData.pblicense}}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="row no-gutters">
                <div class="col-md-4 col-12 font-weight-bold">
                  <p>有效日期</p>
                </div>
                <div class="col-md-8 col-12">
                  <p>{{companyData.effectivedate}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="tab-pane p-3 fade"
          id="passwordChange"
          role="tabpanel"
          aria-labelledby="passwordChange-tab"
        >
          <ValidationObserver v-slot="{ invalid }">
            <form action="#" class @submit.prevent="savePassword">
              <ValidationProvider name="密碼" rules="required|alpha_num" v-slot="{ errors,classes }">
                <div class="form-group row">
                  <label class="col-md-3 col-form-label font-weight-bold" for="password">新密碼</label>
                  <div class="col-md-9">
                    <input
                      type="password"
                      class="form-control"
                      :class="classes"
                      id="password"
                      v-model="updatePwd.pwd"
                      autocomplete="off"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </div>
              </ValidationProvider>
              <ValidationProvider
                rules="required|password:@密碼|alpha_num"
                v-slot="{ errors,classes }"
              >
                <div class="form-group row">
                  <label class="col-md-3 col-form-label font-weight-bold" for="密碼">再次輸入新密碼</label>
                  <div class="col-md-9">
                    <input
                      type="password"
                      class="form-control"
                      :class="classes"
                      id="密碼"
                      v-model="updatePwd.pwdCheck"
                      autocomplete="off"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </div>
              </ValidationProvider>
              <div class="form-group d-flex justify-content-center mt-4">
                <button
                  type="submit"
                  :disabled="invalid"
                  :class="{disabled:invalid}"
                  class="btn btn-primary"
                >修改</button>
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
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default {
  data () {
    return {
      companyData: {
        introduce: '',
        morning: false,
        afternoon: false,
        night: false,
        midnight: false,
        bannerimg: ''
      },
      updatePwd: {
        pwd: '',
        pwdCheck: ''
      },
      token: '',
      FirmPicUploading: false,
      FirmAvatarUploading: false
    }
  },
  props: ['identify'],
  created () {
    this.getOne()
  },
  methods: {
    updateFirmAvatar: function (event) {
      const uploadedFile = event.target.files[0]
      const formData = new FormData()
      formData.append('file', uploadedFile)
      const url = 'http://pettrip.rocket-coding.com/api/Company/Uploadimg'
      this.FirmAvatarUploading = true
      this.$http
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          if (response.data.result === '圖片格式錯誤') {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: '圖片格式錯誤',
              showConfirmButton: false,
              timer: 2000
            })
          } else if (response.data.result === 'Uploadimg錯誤，請至伺服器log查詢錯誤訊息') {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'info',
              title: '圖片不可超過 2 MB',
              showConfirmButton: false,
              timer: 2000
            })
          } else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: '更新成功',
              showConfirmButton: false,
              timer: 2000
            })
            this.getOne()
          }
          this.FirmAvatarUploading = false
        })
        .catch(() => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '更新失敗',
            showConfirmButton: false,
            timer: 2000
          })
          this.FirmAvatarUploading = false
        })
    },
    updateFirmPic: function (event) {
      const uploadedFile = event.target.files[0]
      if (uploadedFile === undefined) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'info',
          title: '未選擇圖片',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        const formData = new FormData()
        formData.append('file', uploadedFile)
        const url = 'http://pettrip.rocket-coding.com/api/Uploadimg'
        this.FirmPicUploading = true
        this.$http
          .post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            if (response.data.result === 'Uploadimg錯誤，請至伺服器log查詢錯誤訊息') {
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'info',
                title: '圖片不可超過 2 MB',
                showConfirmButton: false,
                timer: 2000
              })
            } else {
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: '上傳成功',
                showConfirmButton: false,
                timer: 2000
              })
              this.companyData.bannerimg = response.data.result
            }
            this.FirmPicUploading = false
          })
          .catch(() => {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: '上傳失敗',
              showConfirmButton: false,
              timer: 2000
            })
            this.FirmPicUploading = false
          })
      }
    },
    saveFirmData: function () {
      this.$emit('loadAction', true)
      const vm = this
      var config = {
        method: 'patch',
        url: 'http://pettrip.rocket-coding.com/api/Company/Patchcompany',
        headers: {},
        data: {
          introduce: `${this.companyData.introduce}`,
          morning: `${this.companyData.morning}`,
          afternoon: `${this.companyData.afternoon}`,
          night: `${this.companyData.night}`,
          midnight: `${this.companyData.midnight}`,
          bannerimg: `${this.companyData.bannerimg}`
        }
      }
      this.$http(config)
        .then(function (response) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: '儲存成功',
            showConfirmButton: false,
            timer: 2000
          })
          vm.getOne()
        })
        .catch(function () {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '失敗成功',
            showConfirmButton: false,
            timer: 2000
          })
          vm.$emit('loadAction', false)
        })
    },
    savePassword: function () {
      this.$emit('loadAction', true)
      const vm = this
      var config = {
        method: 'patch',
        url: 'http://pettrip.rocket-coding.com/api/Company/Resetpwd',
        data: {
          pwd: `${this.updatePwd.pwd}`
        }
      }
      this.$http(config)
        .then(function (response) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: '密碼修改成功',
            showConfirmButton: false,
            timer: 2000
          })
          vm.getOne()
        })
        .catch(function () {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '密碼修改失敗',
            showConfirmButton: false,
            timer: 2000
          })
          vm.$emit('loadAction', false)
        })
    },
    getOne: function () {
      this.$emit('checkStatus', 'check')
      this.$emit('loadAction', true)
      const vm = this
      const config = {
        method: 'get',
        url: 'http://pettrip.rocket-coding.com/api/Company/GetOne'
      }
      this.$http(config)
        .then(function (res) {
          vm.companyData = res.data
          vm.$emit('loadAction', false)
          setTimeout(() => {
            if (vm.identify.identity !== '廠商') {
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: '進入廠商後台失敗',
                showConfirmButton: false,
                timer: 2000
              })
              vm.$router.push('/')
            }
          }, 500)
          $('html, body').animate(
            {
              scrollTop: $('.headerNav').offset().top
            },
            0
          )
        })
        .catch(function () {
          this.$emit('loadAction', false)
        })
    }
  }
}
</script>
