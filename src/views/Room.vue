<template>
  <div class="singleRoom">
    <div class="container pt-4 mb-5">
      <h2 class="text-center pb-3 mb-3 border-bottom">{{room.roomname}}</h2>
      <div class="row align-items-center bg-white">
        <div class="col-lg-6 col-12">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img height="400" :src="room.img1" class="d-block w-100" />
              </div>
              <div class="carousel-item">
                <img height="400" :src="room.img2" class="d-block w-100" />
              </div>
              <div class="carousel-item">
                <img height="400" :src="room.img3" class="d-block w-100" />
              </div>
              <div class="carousel-item">
                <img height="400" :src="room.img4" class="d-block w-100" />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div class="col-lg-6 col-12 pt-1">
          <div class="row">
            <div class="col-lg-12 col-md-6 text-center col-12">
              <vc-date-picker :min-date="new Date()" is-expanded v-model="dates" mode="range" is-inline />
            </div>
            <div class="col-lg-12 col-md-6 col-12 d-flex flex-column justify-content-end">
              <p class="text-danger h4 text-right my-3">${{room.roomprice}}<span v-if="pricePlus != 0">+{{priceAdd}}</span> / 天</p>
              <div class="form-group row mb-0">
                <div class="col-8">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        id="button-addon1"
                        @click="checkNumber('minus')"
                      >-</button>
                    </div>
                    <input
                      type="number"
                      class="form-control text-center"
                      placeholder="幾隻"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      v-model="quantity"
                      disabled
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        id="button-addon1"
                        @click="checkNumber('plus')"
                      >+</button>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <button type="button" class="w-100 btn btn-outline-primary">預定</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 col-sm-6 col-12 d-flex align-items-center">
          <img
            class="rounded-circle img-fluid h-25"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8Gm9_I4BxJRo6DCkyT3GVioVWztUNPy2gyg&usqp=CAU"
            alt
          />
          <div class="ml-3">
            <p class="text-warning d-sm-none d-block">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <span>4.8</span>
            </p>
            <h5>{{company.companybrand}}</h5>
            <router-link :to="`/FirmPage/${room.companyseq}`" class="btn border rounded-pill">進入寄宿主頁</router-link>
          </div>
        </div>
        <div class="col-md-4 col-6 d-none d-sm-flex flex-column justify-content-center">
          <p>評價 50 則</p>
          <p class="text-warning">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <span>4.8</span>
          </p>
        </div>
        <div class="col-md-4 d-none d-md-flex flex-column justify-content-center">
          <p v-if="!all" class="mb-0">
            回覆時段：
            <span v-if="company.morning">早上</span>
            <span v-if="company.morning && company.afternoon ">、</span>
            <span v-if="company.morning && !company.afternoon && company.night">、</span>
            <span
              v-if="company.morning && !company.afternoon && !company.night && company.midnight"
            >、</span>
            <span v-if="company.afternoon">下午</span>
            <span v-if="company.afternoon && company.night ">、</span>
            <span v-if="company.afternoon && !company.night && company.midnight ">、</span>
            <span v-if="company.night">晚上</span>
            <span v-if="company.night && company.midnight ">、</span>
            <span v-if="company.midnight">半夜</span>
          </p>
          <p v-if="all" class="mb-0">回覆時段：24小時</p>
        </div>
      </div>
      <div class="border rounded p-3">
        <h5>
          關於{{company.companybrand}}的
          <b>{{room.roomname}}</b>
        </h5>
        <p>{{room.introduce}}</p>
        <p>
          <i class="mr-1 fas fa-paw"></i>接受寵物類型：
          <span v-if="room.pettype_cat">貓</span>
          <span v-if="room.pettype_cat && room.pettype_dog ">、</span>
          <span v-if="room.pettype_dog">狗</span>
          <span v-if="room.pettype_dog && room.pettype_other ">、</span>
          <span v-if="room.pettype_cat && !room.pettype_dog && room.pettype_other ">、</span>
          <span v-if="room.pettype_other">其他</span>
        </p>
        <p>
          <i class="mr-1 fas fa-sort-numeric-down"></i>
          可容納數量：{{room.roomamount}}隻
        </p>
        <p>
          <i class="mr-1 fas fa-expand-alt"></i>
          接受寵物重量：{{room.petsizes}}~{{room.petsizee}}公斤
        </p>
        <p>
          <i class="mr-1 far fa-eye"></i>
          看管程度：{{room.visit}}小時
        </p>
        <p>
          <i class="mr-1 fas fa-baby-carriage"></i>
          散步次數：{{room.walk}} / 天
        </p>
        <p>
          <i class="mr-1 fas fa-bone"></i>提供飼料：
          <span v-if="room.feed">有</span>
          <span v-if="!room.feed">無</span>
        </p>
        <p>
          <i class="mr-1 fas fa-utensils"></i>提供罐頭：
          <span v-if="room.canned">有</span>
          <span v-if="!room.canned">無</span>
        </p>
        <p>
          <i class="mr-1 fas fa-poo"></i>提供貓砂：
          <span v-if="room.catlitter">有</span>
          <span v-if="!room.catlitter">無</span>
        </p>
        <p>
          <i class="mr-1 fas fa-pills"></i>餵藥服務：
          <span v-if="room.medicine_pill || room.medicine_infeed || room.medicine_paste">有</span>
          <span v-else>無</span>
        </p>
        <p>
          <i class="mr-1 fas fa-map-marker-alt"></i>
          地點：{{company.country}}{{company.area}}{{company.address}}
        </p>
        <iframe
          :src="`https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${company.country}${company.area}${company.address}&z=16&output=embed&t=`"
          width="600"
          height="400"
          frameborder="0"
          style="border:0;width: 100%;"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
input[type="number"] {
  -moz-appearance: textfield;
}
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>

<script>
export default {
  data () {
    return {
      dates: {},
      company: {},
      room: {},
      id: {},
      all: false,
      quantity: 1,
      pricePlus: 0,
      priceAdd: ''
    }
  },
  created () {
    this.id = this.$route.params
    this.getData()
  },
  methods: {
    getData: function () {
      const vm = this
      const config = {
        method: 'get',
        url: `http://pettrip.rocket-coding.com/api/Room/GetRoomsFront?id=${this.id.RoomId}`
      }
      this.$http(config)
        .then(function (response) {
          console.log(response)
          vm.company = response.data.company
          vm.room = response.data.room
          if (
            vm.company.morning &&
            vm.company.afternoon &&
            vm.company.night &&
            vm.company.midnight
          ) {
            vm.all = true
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    checkNumber: function (num) {
      if (num === 'plus' && this.quantity < this.room.roomamount) {
        this.quantity += 1
        this.pricePlus += 1
      } else if (num === 'minus' && this.quantity > 1) {
        this.quantity -= 1
        this.pricePlus -= 1
      }
      this.priceAdd = this.room.roomamount_amt * this.pricePlus
    },
    booking: function () {
      if (this.quantity === '0') {
      }
    }
  }
}
</script>
