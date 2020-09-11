<template>
  <div class="singleRoom">
    <div class="container pt-4 mb-5">
      <div
        class="modal fade show"
        id="bookingModel"
        tabindex="-1"
        aria-labelledby="bookingModelLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <form-wizard
              :start-index="0"
              title="預定寄宿"
              subtitle="付款完成才算建立訂單歐"
              back-button-text="上一步"
              next-button-text="下一步"
              @on-complete="pay"
              finish-button-text="付款去"
            >
              <tab-content title="填寫資料">
                <form>
                  <div class="form-group">
                    <label for="name">訂購人</label>
                    <input
                      type="text"
                      id="name"
                      class="form-control"
                      required
                      v-model.trim="bookingList.booker"
                    />
                  </div>
                  <div class="form-group">
                    <label for="phone">電話</label>
                    <input type="text" id="phone" class="form-control" v-model.trim="bookingList.phone" />
                  </div>
                  <div class="form-group">
                    <label for="type">寵物品種</label>
                    <input type="text" id="type" class="form-control" v-model.trim="bookingList.petType" />
                  </div>
                  <div class="form-group">
                    <label for="weight">寵物重量(kg)</label>
                    <input
                      type="number"
                      id="weight"
                      class="form-control"
                      v-model.trim="bookingList.weight" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                    />
                  </div>
                  <div class="form-group align-items-center row">
                    <label class="col-12 col-form-label" for="medical">餵藥服務</label>
                    <div class="col-12">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="inside"
                          value="飼料內"
                          @change="addService"
                          v-model="bookingList.addInfeed"
                          :disabled="!room.medicine_infeed"
                        />
                        <label
                          class="form-check-label"
                          for="inside"
                        >飼料內(${{room.medicine_infeed_amt}})</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="pill"
                          value="藥丸"
                          @change="addService"
                          v-model="bookingList.addIPill"
                          :disabled="!room.medicine_pill"
                        />
                        <label class="form-check-label" for="pill">
                          藥丸
                          <span v-if="room.medicine_pill == true">($ {{room.medicine_pill_amt}})</span>
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="outside"
                          value="外用"
                          @change="addService"
                          v-model="bookingList.addPaste"
                          :disabled="!room.medicine_paste"
                        />
                        <label class="form-check-label" for="outside">
                          外用
                          <span v-if="room.medicine_paste == true">($ {{room.medicine_paste_amt}})</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group align-items-center row">
                    <label class="col-12 col-form-label" for="plus">加購服務</label>
                    <div class="col-12">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="bath"
                          value="洗澡"
                          @change="addService"
                          v-model="bookingList.addBath"
                          :disabled="!room.bath"
                        />
                        <label class="form-check-label" for="bath">
                          洗澡
                          <span v-if="room.bath == true">(${{room.bath_amt}})</span>
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="cutNails"
                          value="剪指甲"
                          @change="addService"
                          v-model="bookingList.addNails"
                          :disabled="!room.nails"
                        />
                        <label class="form-check-label" for="cutNails">
                          剪指甲
                          <span v-if="room.nails == true">(${{room.nails_amt}})</span>
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="cutHair"
                          value="剪毛"
                          @change="addService"
                          v-model="bookingList.addHair"
                          :disabled="!room.hair"
                        />
                        <label class="form-check-label" for="cutHair">
                          剪毛
                          <span v-if="room.hair == true">(${{room.hair_amt}})</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-12 col-form-label" for="remarks">備註</label>
                    <div class="col-12">
                      <textarea
                        class="form-control"
                        id="remarks"
                        rows="3"
                        v-model.trim="bookingList.comment"
                      ></textarea>
                    </div>
                  </div>
                  <p class="text-center h4 text-danger my-3">小計：共 ${{bookingList.addTotal}} 元</p>
                </form>
              </tab-content>
              <tab-content title="訂單確認">
                <p>寄宿廠商：{{company.companybrand}}</p>
                <p>空間名稱：{{room.roomname}}</p>
                <p>預定日期：{{bookingList.dateStart}}~{{bookingList.dateEnd}}</p>
                <p>地點：{{company.country}}{{company.area}}{{company.address}}</p>
                <p>寄宿總價：{{bookingList.totalPrice}}</p>
                <hr />
                <p>訂購人：{{bookingList.booker}}</p>
                <p>電話：{{bookingList.phone}}</p>
                <p>數量：{{quantity}}隻</p>
                <p>寵物品種：{{bookingList.petType}}</p>
                <p>
                  餵藥服務：
                  <span v-if="bookingList.addInfeed">飼料內(${{room.medicine_infeed_amt}})</span>
                  <span class="ml-1" v-if="bookingList.addPill">藥丸(${{room.medicine_pill_amt}})</span>
                  <span class="ml-1" v-if="bookingList.addPaste">外用(${{room.medicine_paste_amt}})</span>
                  <span  v-if="!bookingList.addPaste && !bookingList.addPill && !bookingList.addInfeed">無</span>
                </p>
                <p>
                  加購服務：
                  <span v-if="bookingList.addBath">洗澡(${{room.bath_amt}})</span>
                  <span class="ml-1" v-if="bookingList.addNails">剪指甲(${{room.nails_amt}})</span>
                  <span class="ml-1" v-if="bookingList.addHair">剪毛(${{room.hair_amt}})</span>
                  <span  v-if="!bookingList.addHair && !bookingList.addNails && !bookingList.addBath">無</span>
                </p>
                <p>備註：<span v-if="bookingList.comment != ''">{{bookingList.comment}}</span><span v-if="bookingList.comment == ''">無</span> </p>
                <hr />
                <p class="text-center h4 text-danger my-3">訂單總額：共 $ {{bookingTotalPrice}} 元</p>
              </tab-content>
              <tab-content title="金流付款">
                <p class="text-center text-danger h4">付款完成才算預定成功歐!!</p>
              </tab-content>
            </form-wizard>
          </div>
        </div>
      </div>
      <h2 class="text-center pb-3 mb-3 border-bottom">{{room.roomname}}</h2>
      <div class="row align-items-center bg-white">
        <div class="col-lg-6 col-12">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner" style="height:400px">
              <div
                v-for="(img,index) in imgList"
                :key="index"
                class="carousel-item h-100"
                :class="{active:index == 0}"
              >
                <img :src="img" style="object-fit: cover;" class="h-100 d-block w-100" />
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
              <vc-date-picker
                :min-date="new Date()"
                is-expanded
                v-model="dates"
                mode="range"
                is-inline
              />
            </div>
            <div class="col-lg-12 col-md-6 col-12 d-flex flex-column justify-content-end">
              <p class="text-danger h4 text-right my-3">
                ${{room.roomprice}}
                <span v-if="pricePlus != 0">+{{priceAdd}}</span> / 天
              </p>
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
                      class="inputAmount form-control text-center"
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
                  <button type="button" class="w-100 btn btn-outline-primary" @click="booking">預定</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row py-3">
        <div class="col-md-4 col-sm-6 col-12 d-flex align-items-center">
          <div class="mx-auto d-flex align-items-center">
            <div
              class="rounded-circle w-25 overflow-hidden"
              :style="{backgroundImage: 'url(' + company.avatar + ')'}"
              style="background-size: cover;max-width: 300px;"
            >
              <img
                src="https://upload.cc/i1/2020/09/09/wa8QmM.png"
                :class="{opacityZero:company.avatar != ''}"
                class="img-fluid"
                alt
              />
            </div>
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
              <router-link
                :to="`/FirmPage/${room.companyseq}`"
                class="btn border rounded-pill"
              >進入寄宿主頁</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-6 d-none d-sm-flex flex-column justify-content-center text-center">
          <p>評價 50 則</p>
          <p class="text-warning">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <span class="ml-1">4.8</span>
          </p>
        </div>
        <div class="col-md-4 d-none d-md-flex flex-column justify-content-center text-center">
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
    <form class="d-none" method="POST" action="https://ccore.spgateway.com/MPG/mpg_gateway">
      <input type="text" :name="payData[0].Key" v-model="payData[0].Value" />
      <input type="text" :name="payData[1].Key" v-model="payData[1].Value" />
      <input type="text" :name="payData[2].Key" v-model="payData[2].Value" />
      <input type="text" :name="payData[3].Key" v-model="payData[3].Value" />
      <button id="send" type="submit"></button>
    </form>
  </div>
</template>

<style lang="scss">
.inputAmount {
  -moz-appearance: textfield;
}
.inputAmount::-webkit-inner-spin-button,
.inputAmount::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

<script>
/* global $ */
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  data () {
    return {
      imgList: [],
      dates: {},
      company: {},
      room: {},
      id: {},
      payData: [
        {
          Key: '1',
          Value: '2'
        },
        {
          Key: '1',
          Value: '2'
        },
        {
          Key: '1',
          Value: '2'
        },
        {
          Key: '1',
          Value: '2'
        }
      ],
      bookingList: {
        booker: '',
        phone: '',
        petType: '',
        weight: '',
        dateStart: '',
        dateEnd: '',
        comment: '',
        addInfeed: false,
        addPaste: false,
        addPill: false,
        addBath: false,
        addHair: false,
        addNails: false,
        addTotal: 0,
        totalPrice: 0
      },
      all: false,
      quantity: 1,
      pricePlus: 0,
      priceAdd: ''
    }
  },
  components: {
    FormWizard,
    TabContent
  },
  created () {
    this.id = this.$route.params
    this.getData()
  },
  computed: {
    bookingTotalPrice: function () {
      return (
        Number(this.bookingList.addTotal) + Number(this.bookingList.totalPrice)
      )
    }
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
          for (let i = 1; i <= 4; i++) {
            if (
              vm.room[`img${i}`] !== '' &&
              vm.room[`img${i}`] !== undefined &&
              vm.room[`img${i}`] !== null
            ) {
              console.log(vm.room[`img${i}`])
              vm.imgList.push(vm.room[`img${i}`])
            }
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
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)pet\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      if (token === '') {
        this.$router.push('/Login')
      } else if (this.dates === null) {
        alert('請選擇日期')
      } else if (this.dates != null) {
        this.bookingList.dateStart = new Date(
          this.dates.start
        ).toLocaleDateString()
        this.bookingList.dateEnd = new Date(
          this.dates.end
        ).toLocaleDateString()
        $('#bookingModel').modal('show')
        this.bookingList.totalDay =
          (new Date(this.dates.end) - new Date(this.dates.start)) /
          (1000 * 60 * 60 * 24)
        this.bookingList.totalPrice =
          (this.room.roomprice +
            (this.quantity - 1) * this.room.roomamount_amt) *
          this.bookingList.totalDay
      }
      console.log(this.bookingList.totalPrice)
    },
    addService: function () {
      this.bookingList.addTotal = 0
      if (this.bookingList.addInfeed === true) {
        this.bookingList.addTotal += this.room.medicine_infeed_amt
      }
      if (this.bookingList.addPill === true) {
        this.bookingList.addTotal += this.room.medicine_pill_amt
      }
      if (this.bookingList.addPaste === true) {
        this.bookingList.addTotal += this.room.medicine_paste_amt
      }
      if (this.bookingList.addBath === true) {
        this.bookingList.addTotal += this.room.bath_amt
      }
      if (this.bookingList.addNails === true) {
        this.bookingList.addTotal += this.room.nails_amt
      }
      if (this.bookingList.addHair === true) {
        this.bookingList.addTotal += this.room.hair_amt
      }
      console.log(this.bookingList.addTotal)
    },
    pay: function () {
      const vm = this
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)pet\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      const config = {
        method: 'post',
        url: 'http://pettrip.rocket-coding.com/api/Pay/Getinfo',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          roomseq: `${this.room.roomseq}`,
          name: `${this.bookingList.booker}`,
          tel: `${this.bookingList.phone}`,
          pettype: `${this.bookingList.petType}`,
          petsize: `${this.bookingList.weight}`,
          petamount: `${this.quantity}`,
          medicine_infeed: this.bookingList.addInfeed,
          medicine_paste: this.bookingList.addPaste,
          medicine_pill: this.bookingList.addPill,
          orderdates: `${this.bookingList.dateStart}`,
          orderdatee: `${this.bookingList.dateEnd}`,
          bath: this.bookingList.addBath,
          hair: this.bookingList.addHair,
          nails: this.bookingList.addNails,
          memo: `${this.bookingList.comment}`
        }
      }
      console.log(config)
      this.$http(config)
        .then(function (response) {
          console.log(response)
          vm.payData = response.data
          setTimeout(() => {
            document.getElementById('send').click()
          }, 1500)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
