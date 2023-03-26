<template>
  <div class="firmSet pb-5">
    <div class="container mx-auto">
      <ul id="myTab" class="nav nav-tabs nav-fill text-center" role="tablist">
        <li class="nav-item">
          <a
            id="firmIntroduce-tab"
            class="nav-link active"
            data-toggle="tab"
            href="#firmIntroduce"
            role="tab"
            aria-controls="firmIntroduce"
            aria-selected="true"
            >廠商介紹</a
          >
        </li>
        <li class="nav-item">
          <a
            id="firmData-tab"
            class="nav-link"
            data-toggle="tab"
            href="#firmData"
            role="tab"
            aria-controls="firmData"
            aria-selected="false"
            >廠商資料</a
          >
        </li>
        <li class="nav-item">
          <a
            id="passwordChange-tab"
            class="nav-link"
            data-toggle="tab"
            href="#passwordChange"
            role="tab"
            aria-controls="passwordChange"
            aria-selected="false"
            >密碼修改</a
          >
        </li>
      </ul>
      <div
        id="myTabContent"
        class="bg-white text-nowrap tab-content border border-top-0"
      >
        <div
          id="firmIntroduce"
          class="tab-pane px-3 py-5 fade show active"
          role="tabpanel"
          aria-labelledby="firmIntroduce-tab"
        >
          <form action="#" class>
            <div class="form-group row">
              <label
                class="col-md-3 col-lg-2 col-form-label font-weight-bold"
                for="mainIntroduce"
                >主頁介紹</label
              >
              <div class="col-md-9 col-lg-10">
                <textarea
                  id="mainIntroduce"
                  v-model="companyData.introduce"
                  class="form-control"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div class="form-group align-items-center row text-wrap">
              <label
                class="col-md-3 col-lg-2 col-form-label font-weight-bold"
                for="response"
                >回覆時間</label
              >
              <div class="col-md-9 col-lg-10">
                <div class="form-check form-check-inline">
                  <input
                    id="morning"
                    v-model="companyData.morning"
                    class="form-check-input"
                    type="checkbox"
                    value="cat"
                  />
                  <label class="form-check-label" for="morning">早上</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    id="afternoon"
                    v-model="companyData.afternoon"
                    class="form-check-input"
                    type="checkbox"
                    value="dog"
                  />
                  <label class="form-check-label" for="afternoon">下午</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    id="night"
                    v-model="companyData.night"
                    class="form-check-input"
                    type="checkbox"
                    value="other"
                  />
                  <label class="form-check-label" for="night">晚上</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    id="midnight"
                    v-model="companyData.midnight"
                    class="form-check-input"
                    type="checkbox"
                    value="other"
                  />
                  <label class="form-check-label" for="midnight">半夜</label>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label
                class="col-md-3 col-lg-2 col-form-label font-weight-bold"
                for="spaceName"
                >主頁相片</label
              >
              <div class="col-md-9 col-lg-10">
                <input
                  id="spaceName"
                  v-model.trim="companyData.bannerimg"
                  type="text"
                  class="form-control"
                  placeholder="圖片連結"
                />
              </div>
            </div>

            <div class="form-group d-flex mb-0">
              <label
                for="upload"
                class="d-flex align-items-center ml-auto btn btn-dark"
                :class="{disabled: FirmPicUploading}"
              >
                <ring-loader
                  class="custom-class"
                  :color="'black'"
                  :loading="FirmPicUploading"
                  :size="20"
                ></ring-loader
                >主頁照片上傳
                <input
                  id="upload"
                  type="file"
                  class="d-none"
                  :disabled="FirmPicUploading"
                  @change="updateFirmPic"
                />
              </label>
            </div>
            <p class="text-muted text-right mb-0">
              <small>儲存才能成功上傳圖片歐</small>
            </p>
            <div
              class="backgroundIMG mx-auto"
              :style="{backgroundImage: 'url(' + companyData.bannerimg + ')'}"
            >
              <img
                :src="ImageInputImg"
                :class="{opacityZero: companyData.bannerimg != ''}"
                class="w-100 img-fluid"
                alt
              />
            </div>

            <div class="form-group d-flex justify-content-center mt-4">
              <button
                type="button"
                class="btn btn-primary"
                :class="{disabled: FirmPicUploading}"
                :disabled="FirmPicUploading"
                @click="saveFirmData"
              >
                儲存
              </button>
            </div>
          </form>
        </div>
        <div
          id="firmData"
          class="tab-pane p-3 fade"
          role="tabpanel"
          aria-labelledby="firmData-tab"
        >
          <div class="row no-gutters text-wrap">
            <div class="col-12">
              <div
                class="backgroundIMG rounded-circle mx-auto overflow-hidden"
                :style="{backgroundImage: 'url(' + companyData.avatar + ')'}"
                style="max-width: 300px;"
              >
                <img
                  :src="NoImageImg"
                  :class="{opacityZero: companyData.avatar != ''}"
                  class="w-100 img-fluid"
                  alt
                />
              </div>
              <div class="form-group d-flex my-4">
                <label
                  for="uploadAvatar"
                  class="d-flex align-items-center btn btn-primary mx-auto"
                  :class="{disabled: FirmAvatarUploading}"
                >
                  <ring-loader
                    class="custom-class"
                    :color="'black'"
                    :loading="FirmAvatarUploading"
                    :size="20"
                  ></ring-loader
                  >更新頭像
                  <input
                    id="uploadAvatar"
                    type="file"
                    class="d-none"
                    :disabled="FirmAvatarUploading"
                    @change="updateFirmAvatar"
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
                  <p>{{ companyData.companyname }}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="row no-gutters">
                <div class="col-md-4 col-12 font-weight-bold">
                  <p>品牌名稱</p>
                </div>
                <div class="col-md-8 col-12">
                  <p>{{ companyData.companybrand }}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="row no-gutters">
                <div class="col-md-4 col-12 font-weight-bold">
                  <p>帳號</p>
                </div>
                <div class="col-md-8 col-12">
                  <p>{{ companyData.email }}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="row no-gutters">
                <div class="col-md-4 col-12 font-weight-bold">
                  <p>廠商編號</p>
                </div>
                <div class="col-md-8 col-12">
                  <p>{{ companyData.companyseq }}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="row no-gutters">
                <div class="col-md-4 col-12 font-weight-bold">
                  <p>電話</p>
                </div>
                <div class="col-md-8 col-12">
                  <p>{{ companyData.phone }}</p>
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
                    <span>{{ companyData.country }}</span>
                    <span>{{ companyData.area }}</span>
                    <span>{{ companyData.address }}</span>
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
                  <p>{{ companyData.pblicense }}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="row no-gutters">
                <div class="col-md-4 col-12 font-weight-bold">
                  <p>有效日期</p>
                </div>
                <div class="col-md-8 col-12">
                  <p>{{ companyData.effectivedate }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="passwordChange"
          class="tab-pane p-3 fade"
          role="tabpanel"
          aria-labelledby="passwordChange-tab"
        >
          <ValidationObserver v-slot="{invalid}">
            <form action="#" class @submit.prevent="savePassword">
              <ValidationProvider
                v-slot="{errors, classes}"
                name="密碼"
                rules="required|alpha_num"
              >
                <div class="form-group row">
                  <label
                    class="col-md-3 col-form-label font-weight-bold"
                    for="password"
                    >新密碼</label
                  >
                  <div class="col-md-9">
                    <input
                      id="password"
                      v-model="updatePwd.pwd"
                      type="password"
                      class="form-control"
                      :class="classes"
                      autocomplete="off"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </div>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{errors, classes}"
                rules="required|password:@密碼|alpha_num"
              >
                <div class="form-group row">
                  <label
                    class="col-md-3 col-form-label font-weight-bold"
                    for="密碼"
                    >再次輸入新密碼</label
                  >
                  <div class="col-md-9">
                    <input
                      id="密碼"
                      v-model="updatePwd.pwdCheck"
                      type="password"
                      class="form-control"
                      :class="classes"
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
                  :class="{disabled: invalid}"
                  class="btn btn-primary"
                >
                  修改
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
import NoImageImg from '@/assets/img/no-image.png';
import ImageInputImg from '@/assets/img/image-input.png';
export default {
  props: ['identify'],
  data() {
    return {
      NoImageImg,
      ImageInputImg,
      companyData: {
        introduce: '',
        morning: false,
        afternoon: false,
        night: false,
        midnight: false,
        bannerimg: '',
      },
      updatePwd: {
        pwd: '',
        pwdCheck: '',
      },
      FirmPicUploading: false,
      FirmAvatarUploading: false,
    };
  },
  created() {
    this.getOne();
  },
  methods: {
    updateFirmAvatar(event) {
      const uploadedFile = event.target.files[0];
      const formData = new FormData();
      formData.append('file', uploadedFile);
      const url = 'Company/Uploadimg';
      this.FirmAvatarUploading = true;
      const vm = this;
      this.$http
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
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
            response.data.result === '上傳圖片錯誤，請至伺服器log查詢錯誤訊息'
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
            vm.Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: '更新成功',
              showConfirmButton: false,
              timer: 2000,
            });
            this.getOne();
          }
          this.FirmAvatarUploading = false;
        })
        .catch(() => {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '更新失敗',
            showConfirmButton: false,
            timer: 2000,
          });
          this.FirmAvatarUploading = false;
        });
    },
    updateFirmPic(event) {
      const uploadedFile = event.target.files[0];
      const vm = this;
      if (uploadedFile === undefined) {
        vm.Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'info',
          title: '未選擇圖片',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        const formData = new FormData();
        formData.append('file', uploadedFile);
        const url = 'Uploadimg';
        this.FirmPicUploading = true;
        this.$http
          .post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            if (
              response.data.result === '上傳圖片錯誤，請至伺服器log查詢錯誤訊息'
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
              vm.Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: '上傳成功',
                showConfirmButton: false,
                timer: 2000,
              });
              this.companyData.bannerimg = response.data.result;
            }
            this.FirmPicUploading = false;
          })
          .catch(() => {
            vm.Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: '上傳失敗',
              showConfirmButton: false,
              timer: 2000,
            });
            this.FirmPicUploading = false;
          });
      }
    },
    saveFirmData() {
      this.$emit('loadAction', true);
      const vm = this;
      const config = {
        method: 'patch',
        url: 'Company/Patchcompany',
        headers: {},
        data: {
          introduce: `${this.companyData.introduce}`,
          morning: `${this.companyData.morning}`,
          afternoon: `${this.companyData.afternoon}`,
          night: `${this.companyData.night}`,
          midnight: `${this.companyData.midnight}`,
          bannerimg: `${this.companyData.bannerimg}`,
        },
      };
      this.$http(config)
        .then(function() {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: '儲存成功',
            showConfirmButton: false,
            timer: 2000,
          });
          vm.getOne();
        })
        .catch(function() {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '失敗成功',
            showConfirmButton: false,
            timer: 2000,
          });
          vm.$emit('loadAction', false);
        });
    },
    savePassword() {
      this.$emit('loadAction', true);
      const vm = this;
      const config = {
        method: 'patch',
        url: 'Company/Resetpwd',
        data: {
          pwd: `${this.updatePwd.pwd}`,
        },
      };
      this.$http(config)
        .then(function() {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: '密碼修改成功',
            showConfirmButton: false,
            timer: 2000,
          });
          vm.updatePwd.pwd = '';
          (vm.updatePwd.pwdCheck = ''), vm.getOne();
        })
        .catch(function() {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '密碼修改失敗',
            showConfirmButton: false,
            timer: 2000,
          });
          vm.$emit('loadAction', false);
        });
    },
    getOne() {
      this.$emit('checkStatus', 'check');
      this.$emit('loadAction', true);
      const vm = this;
      const config = {
        method: 'get',
        url: 'Company/GetOne',
      };
      this.$http(config)
        .then(function(res) {
          vm.companyData = res.data;
          vm.$emit('loadAction', false);
          setTimeout(() => {
            if (vm.identify.identity !== '廠商') {
              vm.Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: '進入廠商後台失敗',
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
  },
};
</script>
