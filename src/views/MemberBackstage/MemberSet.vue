<template>
  <div class="memberSet">
    <loading :active.sync="isLoading" loader="bars"></loading>
    <div class="row no-gutters text-wrap align-items-center">
      <div class="col-lg-6 col-12">
        <div
          class="rounded-circle mx-auto overflow-hidden"
          :style="{backgroundImage: 'url(' + memberData.avatar + ')'}"
          style="background-size: cover;max-width: 300px;"
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
            class="btn btn-primary mx-auto"
            :class="{disabled:MemberPicUploading}"
          >
            <i v-if="MemberPicUploading" class="mr-1 fas fa-spinner fa-spin"></i>更新頭像
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
import Swal from 'sweetalert2/dist/sweetalert2.js'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'sweetalert2/src/sweetalert2.scss'

export default {
  data () {
    return {
      memberData: {},
      MemberPicUploading: false,
      isLoading: false
    }
  },
  created () {
    this.getData()
  },
  components: {
    loading: VueLoading
  },
  methods: {
    getData: function () {
      this.isLoading = true
      const vm = this
      this.$emit('checkStatus', 'check')
      const config = {
        method: 'get',
        url: 'http://pettrip.rocket-coding.com/api/Member/GetOne'
      }

      this.$http(config)
        .then(function (response) {
          console.log(response)
          vm.memberData = response.data
          vm.isLoading = false
        })
        .catch(function (error) {
          console.log(error)
          vm.isLoading = false
        })
    },
    saveMemberData: function () {
      this.isLoading = true
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
          console.log(response)
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
        .catch(function (error) {
          console.log(error)
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '更新密碼失敗',
            showConfirmButton: false,
            timer: 2000
          })
          vm.isLoading = false
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
          vm.getData()
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
          } else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: '頭像上傳成功',
              showConfirmButton: false,
              timer: 2000
            })
          }
          console.log(response)
        })
        .catch(() => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
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
