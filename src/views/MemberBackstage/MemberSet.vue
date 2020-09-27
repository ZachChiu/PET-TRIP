<template>
  <div class="memberSet">
    <div class="row no-gutters text-wrap align-items-center" v-if="memberData.membername != null">
      <div class="col-lg-6 col-12">
        <div
          class="rounded-circle mx-auto overflow-hidden"
          :style="{backgroundImage: 'url(' + memberData.avatar + ')'}"
          style="background-size: cover;max-width: 300px; background-position:center"
        >
          <img
            src="https://upload.cc/i1/2020/09/01/IaZYfp.png"
            :class="{opacityZero:memberData.avatar != null}"
            class="w-100 img-fluid"
            alt
          />
        </div>
        <div class="form-group d-flex my-4">
          <label
            for="upload"
            class="d-flex align-items-center btn btn-primary mx-auto"
            :class="{disabled:MemberPicUploading}"
          ><ring-loader class="custom-class" :color="'black'" :loading="MemberPicUploading" :size="20"></ring-loader>更新頭像
            <input
              type="file"
              id="upload"
              class="d-none"
              @change="updateMemberAvatar"
              :disabled="MemberPicUploading"
            />
          </label>
        </div>
      </div>
      <div class="col-lg-6 col-12">
        <div class="row no-gutters">
          <div class="col-md-4 col-12 font-weight-bold">
            <p>姓名</p>
          </div>
          <div class="col-md-8 col-12">
            <p>{{memberData.membername}}</p>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-md-4 col-12 font-weight-bold">
            <p>信箱(帳號)</p>
          </div>
          <div class="col-md-8 col-12">
            <p>{{memberData.email}}</p>
          </div>
        </div>
        <ValidationObserver v-slot="{ invalid }">
          <form action="#" @submit.prevent="saveMemberData">
            <ValidationProvider name="密碼" rules="required|alpha_num" v-slot="{ errors,classes }">
              <div class="form-group row no-gutters">
                <label class="col-md-4 col-form-label font-weight-bold" for="password">新密碼</label>
                <div class="col-md-8 col-12">
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    :class="classes"
                    v-model="memberData.pwd"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider rules="required|password:@密碼|alpha_num" v-slot="{ errors,classes }">
              <div class="form-group row no-gutters">
                <label class="col-md-4 col-form-label font-weight-bold" for="密碼">再次輸入新密碼</label>
                <div class="col-md-8 col-12">
                  <input
                    type="password"
                    class="form-control"
                    id="密碼"
                    :class="classes"
                    v-model="memberData.pwdcheck"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>

            <div class="form-group d-flex justify-content-center mt-4">
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="invalid"
                :class="{disabled:invalid}"
              >更新</button>
            </div>
          </form>
        </ValidationObserver>
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
      memberData: {},
      MemberPicUploading: false
    }
  },
  created () {
    this.getData()
  },
  props: ['identify'],
  methods: {
    getData: function () {
      this.$emit('loadAction', true)
      const vm = this
      this.$emit('checkStatus')
      const config = {
        method: 'get',
        url: 'http://pettrip.rocket-coding.com/api/Member/GetOne'
      }

      this.$http(config)
        .then(function (response) {
          vm.memberData = response.data
          vm.$emit('loadAction', false)
          setTimeout(() => {
            if (vm.identify.identity !== '會員') {
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: '進入會員後台失敗',
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
          vm.$emit('loadAction', false)
        })
    },
    saveMemberData: function () {
      this.$emit('loadAction', true)
      const vm = this
      const config = {
        method: 'patch',
        url: 'http://pettrip.rocket-coding.com/api/Member/Resetpwd',
        data: {
          pwd: `${this.memberData.pwd}`
        }
      }
      this.$http(config)
        .then(function (response) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: '更新密碼成功',
            showConfirmButton: false,
            timer: 2000
          })
          vm.getData()
        })
        .catch(function () {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '更新密碼失敗',
            showConfirmButton: false,
            timer: 2000
          })
          vm.$emit('loadAction', false)
        })
    },
    updateMemberAvatar: function () {
      const vm = this
      const uploadedFile = event.target.files[0]
      const formData = new FormData()
      formData.append('file', uploadedFile)
      const url = 'http://pettrip.rocket-coding.com/api/Member/Uploadimg'
      this.MemberPicUploading = true
      this.$http
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          this.MemberPicUploading = false
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
            vm.getData()
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: '頭像上傳成功',
              showConfirmButton: false,
              timer: 2000
            })
          }
        })
        .catch(() => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '頭像上傳失敗',
            showConfirmButton: false,
            timer: 2000
          })
          this.MemberPicUploading = false
        })
    }
  }
}
</script>
