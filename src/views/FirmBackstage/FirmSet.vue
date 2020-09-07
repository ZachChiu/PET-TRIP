<template>
  <div class="firmSet">
    <div class="container mx-auto py-5">
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
                <input type="text" class="form-control" id="spaceName" placeholder="圖片連結" />
              </div>
            </div>

            <div class="form-group d-flex">
              <label for="upload" class="ml-auto btn btn-dark">
                主頁照片上傳
                <input type="file" id="upload" class="d-none" @change="updateFirmAvatar" />
              </label>
            </div>
            <div
              class="mx-auto"
              :style="{backgroundImage: 'url(' + companyData.bannerimg + ')'}"
              style="background-size: cover;"
            >
              <img
                src="https://upload.cc/i1/2020/09/04/0MY4iy.png"
                :class="{opacityZero:companyData.imgurl != null}"
                class="w-100 img-fluid"
                alt
              />
            </div>

            <div class="form-group d-flex justify-content-center mt-4">
              <button type="button" class="btn btn-primary" @click="saveFirmData">儲存</button>
            </div>
          </form>
        </div>
        <div class="tab-pane p-3 fade" id="firmData" role="tabpanel" aria-labelledby="firmData-tab">
          <div class="row no-gutters text-wrap">
            <div class="col-12">
              <div
                class="rounded-circle mx-auto overflow-hidden"
                :style="{backgroundImage: 'url(' + companyData.avatar + ')'}"
                style="background-size: cover;max-width: 300px;"
              >
                <img
                  src="https://upload.cc/i1/2020/09/01/IaZYfp.png"
                  :class="{opacityZero:companyData.avatar != null}"
                  class="w-100 img-fluid"
                  alt
                />
              </div>
              <div class="form-group d-flex my-4">
                <label for="upload" class="btn btn-primary mx-auto">
                  更新頭像
                  <input type="file" id="upload" class="d-none" @change="updateFirmAvatar" />
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
          <form action="#" class>
            <div class="form-group row">
              <label class="col-md-3 col-lg-2 col-form-label font-weight-bold" for="password">新密碼</label>
              <div class="col-md-9 col-lg-10">
                <input type="text" class="form-control" id="password" />
              </div>
            </div>
            <div class="form-group row">
              <label
                class="col-md-3 col-lg-2 col-form-label font-weight-bold"
                for="passwordAgain"
              >再次輸入新密碼</label>
              <div class="col-md-9 col-lg-10">
                <input type="text" class="form-control" id="passwordAgain" />
              </div>
            </div>
            <div class="form-group d-flex justify-content-center mt-4">
              <button type="button" class="btn btn-primary" @click="saveFirmData">儲存</button>
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
      companyData: {},
      token: ''
    }
  },
  created () {
    this.getOne()
  },
  methods: {
    updateFirmAvatar: function () {

    },
    saveFirmData: function () {

    },
    getOne: function () {
      const vm = this
      this.token = document.cookie.replace(
        /(?:(?:^|.*;\s*)pet\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      const config = {
        method: 'get',
        url: 'http://pettrip.rocket-coding.com/api/Company/GetOne',
        // url: 'https://9409bc01ef8b.ngrok.io/api/Company/GetOne',
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
      this.$http(config)
        .then(function (res) {
          console.log(res)
          vm.companyData = res.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
