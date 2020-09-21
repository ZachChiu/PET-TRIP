<template>
  <div id="bookingModal" class="modal" tabindex="-1" v-if="room != null">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-center">預定寄宿</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item w-50" role="presentation">
              <button
                class="nav-link w-100 active btn"
                id="bookingInfo-tab"
                data-toggle="tab"
                href="#bookingInfo"
                role="tab"
                aria-controls="bookingInfo"
                aria-selected="true"
                disabled
              >填寫資料</button>
            </li>
            <li class="nav-item w-50" role="presentation">
              <button
                class="nav-link w-100 btn"
                id="orderCheck-tab"
                data-toggle="tab"
                href="#orderCheck"
                role="tab"
                aria-controls="orderCheck"
                aria-selected="false"
                disabled
              >訂單確認</button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="bookingInfo"
              role="tabpanel"
              aria-labelledby="bookingInfo-tab"
            >
              <ValidationObserver v-slot="{ invalid }">
                <form @submit.prevent="nextStep">
                  <ValidationProvider rules="required" v-slot="{ errors,classes }">
                    <div class="form-group">
                      <label for="name">
                        訂購人
                        <span class="text-danger">{{errors[0]}}</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        class="form-control"
                        required
                        v-model.trim="bookingList.booker"
                        :class="classes"
                      />
                    </div>
                  </ValidationProvider>
                  <ValidationProvider rules="required|numeric" v-slot="{ errors,classes }">
                    <div class="form-group">
                      <label for="電話">
                        電話
                        <span class="text-danger">{{errors[0]}}</span>
                      </label>
                      <input
                        type="text"
                        id="電話"
                        class="form-control"
                        v-model.trim="bookingList.phone"
                        :class="classes"
                      />
                    </div>
                  </ValidationProvider>
                  <ValidationProvider rules="required" v-slot="{ errors,classes }">
                    <div class="form-group">
                      <label for="type">
                        寵物品種
                        <span class="text-danger">{{errors[0]}}</span>
                      </label>
                      <input
                        type="text"
                        id="type"
                        class="form-control"
                        v-model.trim="bookingList.petType"
                        :class="classes"
                      />
                    </div>
                  </ValidationProvider>
                  <ValidationProvider rules="required" v-slot="{ errors,classes }">
                    <div class="form-group">
                      <label for="weight">
                        寵物重量(kg)
                        <span class="text-danger">{{errors[0]}}</span>
                      </label>
                      <input
                        type="number"
                        id="weight"
                        class="form-control"
                        v-model.trim="bookingList.weight"
                        onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                        :class="classes"
                      />
                    </div>
                  </ValidationProvider>

                  <div class="form-group align-items-center row">
                    <label class="col-12 col-form-label" for="medical">
                      餵藥服務({{quantity}}隻)
                      <span></span>
                    </label>
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
                        >飼料內(${{room.medicine_infeed_amt * quantity}})</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="pill"
                          value="藥丸"
                          @change="addService"
                          v-model="bookingList.addPill"
                          :disabled="!room.medicine_pill"
                        />
                        <label class="form-check-label" for="pill">
                          藥丸
                          <span
                            v-if="room.medicine_pill == true"
                          >($ {{room.medicine_pill_amt * quantity}})</span>
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
                          <span
                            v-if="room.medicine_paste == true"
                          >($ {{room.medicine_paste_amt * quantity}})</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group align-items-center row">
                    <label class="col-12 col-form-label" for="plus">加購服務({{quantity}}隻)</label>
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
                          <span v-if="room.bath == true">(${{room.bath_amt * quantity}})</span>
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
                          <span v-if="room.nails == true">(${{room.nails_amt * quantity}})</span>
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
                          <span v-if="room.hair == true">(${{room.hair_amt * quantity}})</span>
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
                  <div class="text-right">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      :disabled="invalid"
                      :class="{disabled:invalid}"
                    >下一步</button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
            <div
              class="tab-pane fade"
              id="orderCheck"
              role="tabpanel"
              aria-labelledby="orderCheck-tab"
            >
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
                <span
                  v-if="!bookingList.addPaste && !bookingList.addPill && !bookingList.addInfeed"
                >無</span>
              </p>
              <p>
                加購服務：
                <span v-if="bookingList.addBath">洗澡(${{room.bath_amt}})</span>
                <span class="ml-1" v-if="bookingList.addNails">剪指甲(${{room.nails_amt}})</span>
                <span class="ml-1" v-if="bookingList.addHair">剪毛(${{room.hair_amt}})</span>
                <span v-if="!bookingList.addHair && !bookingList.addNails && !bookingList.addBath">無</span>
              </p>
              <p>
                備註：
                <span v-if="bookingList.comment != ''">{{bookingList.comment}}</span>
                <span v-if="bookingList.comment == ''">無</span>
              </p>
              <hr />
              <p class="text-center h4 text-danger my-3">訂單總額：共 $ {{bookingTotalPrice}} 元</p>
              <div class="d-flex justify-content-between">
                <button class="btn btn-outline-secondary" @click="lastStep">上一步</button>

                <button class="d-flex align-items-center btn btn-primary" :class="{disabled:paying}" :disabled="paying" @click="pay"><ring-loader class="custom-class" :color="'black'" :loading="paying" :size="20"></ring-loader>付款</button>
              </div>
            </div>
          </div>
        </div>
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

<script>
/* global $ */
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
export default {
  data () {
    return {
      paying: false,
      bookingList: this.temData,
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
      ]
    }
  },
  name: 'bookingModal',
  props: ['temData', 'room', 'quantity', 'company', 'bookingTotalPrice'],
  watch: {
    temData: function (newVal, oldVal) {
      this.bookingList = newVal
    }
  },
  methods: {
    addService: function () {
      this.bookingList.addTotal = 0
      if (this.bookingList.addInfeed === true) {
        this.bookingList.addTotal +=
          this.room.medicine_infeed_amt * this.quantity
      }
      if (this.bookingList.addPill === true) {
        this.bookingList.addTotal +=
          this.room.medicine_pill_amt * this.quantity
      }
      if (this.bookingList.addPaste === true) {
        this.bookingList.addTotal +=
          this.room.medicine_paste_amt * this.quantity
      }
      if (this.bookingList.addBath === true) {
        this.bookingList.addTotal += this.room.bath_amt * this.quantity
      }
      if (this.bookingList.addNails === true) {
        this.bookingList.addTotal += this.room.nails_amt * this.quantity
      }
      if (this.bookingList.addHair === true) {
        this.bookingList.addTotal += this.room.hair_amt * this.quantity
      }
      console.log(this.bookingList.addTotal)
    },
    pay: function () {
      const vm = this
      vm.paying = true
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
      this.$http(config)
        .then(function (response) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: '即將進入金流頁面',
            showConfirmButton: false,
            timer: 2000
          })
          console.log(response)
          vm.payData = response.data
          setTimeout(() => {
            document.getElementById('send').click()
          }, 1500)
        })
        .catch(function () {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '預定失敗',
            showConfirmButton: false,
            timer: 2000
          })
          vm.paying = false
        })
    },
    nextStep: function () {
      $('.nav-pills button[href="#orderCheck"]').tab('show')
      if (
        this.bookingList.booker !== '' &&
        this.bookingList.phone !== '' &&
        this.bookingList.petType !== '' &&
        this.bookingList.weight !== ''
      ) {
        console.log('1')
      }
    },
    lastStep: function () {
      $('.nav-pills button[href="#bookingInfo"]').tab('show')
    }
  }
}
</script>
