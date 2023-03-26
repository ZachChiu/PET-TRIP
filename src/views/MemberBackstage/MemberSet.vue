<template>
  <div class="memberSet">
    <div
      v-if="memberData.membername != null"
      class="row no-gutters text-wrap align-items-center"
    >
      <div class="col-lg-6 col-12">
        <div
          class="backgroundIMG rounded-circle mx-auto overflow-hidden"
          :style="{backgroundImage: 'url(' + memberData.avatar + ')'}"
          style="max-width: 300px;"
        >
          <img
            :src="NoImageImg"
            :class="{opacityZero: memberData.avatar != null}"
            class="w-100 img-fluid"
            alt
          />
        </div>
        <div class="form-group d-flex my-4">
          <label
            for="upload"
            class="d-flex align-items-center btn btn-primary mx-auto"
            :class="{disabled: MemberPicUploading}"
            ><ring-loader
              class="custom-class"
              :color="'black'"
              :loading="MemberPicUploading"
              :size="20"
            ></ring-loader
            >更新頭像
            <input
              id="upload"
              type="file"
              class="d-none"
              :disabled="MemberPicUploading"
              @change="updateMemberAvatar"
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
            <p>{{ memberData.membername }}</p>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-md-4 col-12 font-weight-bold">
            <p>信箱(帳號)</p>
          </div>
          <div class="col-md-8 col-12">
            <p>{{ memberData.email }}</p>
          </div>
        </div>
        <ValidationObserver v-slot="{invalid}">
          <form action="#" @submit.prevent="saveMemberData">
            <ValidationProvider
              v-slot="{errors, classes}"
              name="密碼"
              rules="required|alpha_num"
            >
              <div class="form-group row no-gutters">
                <label
                  class="col-md-4 col-form-label font-weight-bold"
                  for="password"
                  >新密碼</label
                >
                <div class="col-md-8 col-12">
                  <input
                    id="password"
                    v-model="memberData.pwd"
                    type="password"
                    class="form-control"
                    :class="classes"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors, classes}"
              rules="required|password:@密碼|alpha_num"
            >
              <div class="form-group row no-gutters">
                <label
                  class="col-md-4 col-form-label font-weight-bold"
                  for="密碼"
                  >再次輸入新密碼</label
                >
                <div class="col-md-8 col-12">
                  <input
                    id="密碼"
                    v-model="memberData.pwdcheck"
                    type="password"
                    class="form-control"
                    :class="classes"
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
                :class="{disabled: invalid}"
              >
                更新
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import NoImageImg from '@/assets/img/no-image.png';
export default {
  props: ['identify'],
  data() {
    return {
      memberData: {},
      MemberPicUploading: false,
      NoImageImg,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$emit('loadAction', true);
      const vm = this;
      this.$emit('checkStatus');
      const config = {
        method: 'get',
        url: 'http://pettrip.rocket-coding.com/api/Member/GetOne',
      };

      this.$http(config)
        .then(function(response) {
          vm.memberData = response.data;
          vm.$emit('loadAction', false);
          setTimeout(() => {
            if (vm.identify.identity !== '會員') {
              vm.Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: '進入會員後台失敗',
                showConfirmButton: false,
                timer: 2000,
              });
              vm.$router.push('/');
            }
          }, 500);
        })
        .catch(function() {
          vm.$emit('loadAction', false);
        });
    },
    saveMemberData() {
      this.$emit('loadAction', true);
      const vm = this;
      const config = {
        method: 'patch',
        url: 'http://pettrip.rocket-coding.com/api/Member/Resetpwd',
        data: {
          pwd: `${this.memberData.pwd}`,
        },
      };
      this.$http(config)
        .then(function() {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: '更新密碼成功',
            showConfirmButton: false,
            timer: 2000,
          });
          vm.getData();
        })
        .catch(function() {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '更新密碼失敗',
            showConfirmButton: false,
            timer: 2000,
          });
          vm.$emit('loadAction', false);
        });
    },
    updateMemberAvatar() {
      const vm = this;
      const uploadedFile = event.target.files[0];
      const formData = new FormData();
      formData.append('file', uploadedFile);
      const url = 'http://pettrip.rocket-coding.com/api/Member/Uploadimg';
      this.MemberPicUploading = true;
      this.$http
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.MemberPicUploading = false;
          if (response.data.result === '圖片格式錯誤') {
            vm.Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: '圖片格式錯誤',
              showConfirmButton: false,
              timer: 2000,
            });
          } else if (
            response.data.result === 'Uploadimg錯誤，請至伺服器log查詢錯誤訊息'
          ) {
            vm.Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'info',
              title: '圖片不可超過 2 MB',
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            vm.getData();
            vm.Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: '頭像上傳成功',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
        .catch(() => {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '頭像上傳失敗',
            showConfirmButton: false,
            timer: 2000,
          });
          this.MemberPicUploading = false;
        });
    },
  },
};
</script>
