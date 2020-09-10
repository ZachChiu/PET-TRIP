<template>
  <div class="firmPage" v-if="firmData.company != null">
    <div class="banner">
      <div
        class="mx-auto"
        :style="{backgroundImage: 'url(' + firmData.company.bannerimg + ')'}"
        style="background-size: cover;"
      >
        <img
          src="https://upload.cc/i1/2020/09/09/GIaohq.jpg"
          :class="{opacityZero:firmData.company.bannerimg != ''}"
          class="w-100 img-fluid"
          style="height: 200px;object-fit: cover;"
          alt
        />
      </div>
    </div>
    <div class="container pt-3 position-relative" style="top:-70px">
      <div class="row mx-0 justify-content-center">
        <div class="py-3 bg-dark col-lg-5 col-md-6 col-sm-10">
          <div class="row justify-content-center text-light align-items-center">
            <div class="col-sm-3 col-4">
              <div
                class="mx-auto rounded-circle overflow-hidden"
                :style="{backgroundImage: 'url(' + firmData.company.avatar + ')'}"
                style="background-size: cover; width:80px; height:80px"
              >
                <img
                  src="https://upload.cc/i1/2020/09/09/wa8QmM.png"
                  :class="{opacityZero:firmData.company.avatar != ''}"
                  class="w-100 h-100 img-fluid"
                  style="object-fit: cover;"
                  alt
                />
              </div>
            </div>
            <div class="col-sm-9 col-8 text-truncate">
              <h4 class="mb-0 text-truncate">{{firmData.company.companybrand}}</h4>
              <p class="mb-0 text-truncate">
                接受寵物：
                <span v-if="firmData.company.pettype_cat">貓</span>
                <span v-if="firmData.company.pettype_cat && firmData.company.pettype_dog ">、</span>
                <span v-if="firmData.company.pettype_dog">狗</span>
                <span v-if="firmData.company.pettype_dog && firmData.company.pettype_other ">、</span>
                <span v-if="firmData.company.pettype_cat && !firmData.company.pettype_dog && firmData.company.pettype_other ">、</span>
                <span v-if="firmData.company.pettype_other">其他</span>
              </p>
            </div>
          </div>
        </div>
        <div
          class="py-3 col-lg-5 col-md-6 col-sm-10 bg-white border d-flex flex-column justify-content-center"
        >
          <div class="d-md-block d-none">
            <p class="text-warning mb-0">
              <span class="text-dark mr-2">評價：70筆</span>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <span>4.8</span>
            </p>
            <p v-if="!all" class="mb-0">
              回覆時段：
               <span v-if="firmData.company.morning">早上</span>
                <span v-if="firmData.company.morning && firmData.company.afternoon ">、</span>
                <span v-if="firmData.company.morning && !firmData.company.afternoon && firmData.company.night">、</span>
                <span v-if="firmData.company.morning && !firmData.company.afternoon && !firmData.company.night && firmData.company.midnight">、</span>
                <span v-if="firmData.company.afternoon">下午</span>
                <span v-if="firmData.company.afternoon && firmData.company.night ">、</span>
                <span v-if="firmData.company.afternoon && !firmData.company.night && firmData.company.midnight ">、</span>
                <span v-if="firmData.company.night">晚上</span>
                <span v-if="firmData.company.night && firmData.company.midnight ">、</span>
                <span v-if="firmData.company.midnight">半夜</span>
            </p>
            <p v-if="all"  class="mb-0">回覆時段：24小時</p>
            <p class="mb-0">空間：{{firmData.company.Count}}間</p>
          </div>
          <div class="d-md-none d-flex text-center justify-content-around align-items-center">
            <p class="mb-0">
              4.8/5.0
              <br />70筆評價
            </p>
            <div>|</div>
            <p v-if="!all" class="mb-0">
              回覆時段
              <br />             <span v-if="firmData.company.morning">早上</span>
                <span v-if="firmData.company.morning && firmData.company.afternoon ">、</span>
                <span v-if="firmData.company.morning && !firmData.company.afternoon && firmData.company.night">、</span>
                <span v-if="firmData.company.morning && !firmData.company.afternoon && !firmData.company.night && firmData.company.midnight">、</span>
                <span v-if="firmData.company.afternoon">下午</span>
                <span v-if="firmData.company.afternoon && firmData.company.night ">、</span>
                <span v-if="firmData.company.afternoon && !firmData.company.night && firmData.company.midnight ">、</span>
                <span v-if="firmData.company.night">晚上</span>
                <span v-if="firmData.company.night && firmData.company.midnight ">、</span>
                <span v-if="firmData.company.midnight">半夜</span>
            </p>
            <p v-if="all"  class="mb-0">回覆時段 <br />24小時</p>
            <div>|</div>
            <p class="mb-0">
              空間
              <br />
              共{{firmData.company.Count}}間
            </p>
          </div>
        </div>
      </div>
      <div class="row mx-0">
        <div
          style="height:150px"
          class="mx-auto col-lg-10 col-md-12 col-sm-10 overflow-auto my-3 p-3 introduce border"
        >
          <p class v-if="firmData.company.introduce != null">{{firmData.company.introduce}}</p>
          <p class="text-secondary h2 text-center" v-if="firmData.company.introduce == null">無廠商介紹</p>
        </div>
      </div>
      <hr />
      <div class="container">
        <div class="row justify-content-lg-start justify-content-md-between">
          <div class="col-12 mb-3" v-for="(room,index) in firmData.roomlists" :key="index">
            <div class="card mb-3">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <div
                    class="h-100"
                    :style="{backgroundImage: 'url(' + room.img1 + ')'}"
                    style="background-size: cover;"
                  >
                    <img
                      src="https://upload.cc/i1/2020/09/09/GIaohq.jpg"
                      :class="{opacityZero:room.bannerimg != ''}"
                      class="card-img"
                      alt
                    />
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">
                      <router-link
                        :to="`/FirmPage/${room.companyseq}/Room/${room.roomseq}`"
                        class="text-body stretched-link"
                      >
                        <i class="text-warning fas fa-star"></i>
                        {{room.roomname}}
                      </router-link>
                    </h5>
                    <p class="card-text">
                      <i class="mr-1 fas fa-paw"></i>可接受：
                             <span v-if="room.pettype_cat">貓</span>
                <span v-if="room.pettype_cat && room.pettype_dog ">、</span>
                <span v-if="room.pettype_dog">狗</span>
                <span v-if="room.pettype_dog && room.pettype_other ">、</span>
                <span v-if="room.pettype_cat && !room.pettype_dog && room.pettype_other">、</span>
                <span v-if="room.pettype_other">其他</span>
                    </p>
                    <p class="card-text">
                      <i class="mr-1 fas fa-sort-numeric-down"></i>可容納：{{room.roomamount}}隻
                    </p>
                    <p class="card-text">
                      <i class="mr-1 fas fa-expand-alt"></i>接受重量：<span>{{room.petsizes}}</span><span v-if="room.petsizes != room.petsizee">~</span><span v-if="room.petsizes != room.petsizee">{{room.petsizee}}</span>公斤
                    </p>

                    <p class="card-text text-danger h5 text-right">$ {{room.roomprice}} / 天</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      firmData: {},
      id: {},
      all: false
    }
  },
  created () {
    this.id = this.$route.params
    this.getData()
  },
  methods: {
    getData: function () {
      const url = `http://pettrip.rocket-coding.com/api/Room/GetRoomslist?id=${this.id.FirmId}`
      this.$http
        .get(url)
        .then((res) => {
          console.log(res)
          this.firmData = res.data
          if (this.firmData.company.morning && this.firmData.company.afternoon && this.firmData.company.night && this.firmData.company.midnight) {
            this.all = true
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
