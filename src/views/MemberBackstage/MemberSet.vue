<template>
  <div class="memberSet">
    <div class="row no-gutters text-wrap align-items-center">
      <div class="col-lg-6 col-12">
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
            <input type="file" id="upload" class="d-none" @change="updateMemberAvatar" />
          </label>
        </div>
      </div>
      <div class="col-lg-6 col-12">
        <div class="row no-gutters">
          <div class="col-md-4 col-12 font-weight-bold">
            <p>姓名</p>
          </div>
          <div class="col-md-8 col-12">
            <p>邱廷鈺</p>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-md-4 col-12 font-weight-bold">
            <p>信箱(帳號)</p>
          </div>
          <div class="col-md-8 col-12">
            <p>xxxxxxxxxxxxx@gmail.com</p>
          </div>
        </div>
        <form action="#" class>
          <div class="form-group row">
            <label class="col-md-4 col-form-label font-weight-bold" for="password">新密碼</label>
            <div class="col-md-8 col-12">
              <input type="text" class="form-control" id="password" />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-4 col-form-label font-weight-bold" for="passwordAgain">再次輸入新密碼</label>
            <div class="col-md-8 col-12">
              <input type="text" class="form-control" id="passwordAgain" />
            </div>
          </div>
          <div class="form-group d-flex justify-content-center mt-4">
            <button type="button" class="btn btn-primary" @click="saveMemberData">儲存</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      companyData: {}
    }
  },
  methods: {
    saveMemberData: function () {
    },
    updateMemberAvatar: function () {
    }
  }
}
</script>
