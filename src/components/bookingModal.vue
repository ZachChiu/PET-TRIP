<template>
  <div v-if="room != null" id="bookingModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-center">預定寄宿</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul id="pills-tab" class="nav nav-pills mb-3" role="tablist">
            <li class="nav-item w-50" role="presentation">
              <button
                id="bookingInfo-tab"
                class="nav-link w-100 active btn"
                data-toggle="tab"
                href="#bookingInfo"
                role="tab"
                aria-controls="bookingInfo"
                aria-selected="true"
                disabled
              >
                填寫資料
              </button>
            </li>
            <li class="nav-item w-50" role="presentation">
              <button
                id="orderCheck-tab"
                class="nav-link w-100 btn"
                data-toggle="tab"
                href="#orderCheck"
                role="tab"
                aria-controls="orderCheck"
                aria-selected="false"
                disabled
              >
                訂單確認
              </button>
            </li>
          </ul>
          <div id="pills-tabContent" class="tab-content">
            <div
              id="bookingInfo"
              class="tab-pane fade show active"
              role="tabpanel"
              aria-labelledby="bookingInfo-tab"
            >
              <ValidationObserver v-slot="{invalid}">
                <form @submit.prevent="nextStep">
                  <ValidationProvider
                    v-slot="{errors, classes}"
                    rules="required"
                  >
                    <div class="form-group">
                      <label for="name">
                        訂購人
                        <span class="text-danger">{{ errors[0] }}</span>
                      </label>
                      <input
                        id="name"
                        v-model.trim="bookingList.booker"
                        type="text"
                        class="form-control"
                        required
                        :class="classes"
                      />
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{errors, classes}"
                    rules="required|numeric"
                  >
                    <div class="form-group">
                      <label for="phone">
                        電話
                        <span class="text-danger">{{ errors[0] }}</span>
                      </label>
                      <input
                        id="phone"
                        v-model.trim="bookingList.phone"
                        type="text"
                        class="form-control"
                        :class="classes"
                      />
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{errors, classes}"
                    rules="required"
                  >
                    <div class="form-group">
                      <label for="type">
                        寵物品種
                        <span class="text-danger">{{ errors[0] }}</span>
                      </label>
                      <input
                        id="type"
                        v-model.trim="bookingList.petType"
                        type="text"
                        class="form-control"
                        :class="classes"
                      />
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{errors, classes}"
                    rules="required"
                  >
                    <div class="form-group">
                      <label for="weight">
                        寵物重量(kg)
                        <span class="text-danger">{{ errors[0] }}</span>
                      </label>
                      <input
                        id="weight"
                        v-model.trim="bookingList.weight"
                        name="重量"
                        type="number"
                        class="form-control"
                        :class="classes"
                        min="0"
                      />
                    </div>
                  </ValidationProvider>

                  <div class="form-group align-items-center row">
                    <label class="col-12 col-form-label" for="medical">
                      餵藥服務({{ quantity }}隻)
                      <span></span>
                    </label>
                    <div class="col-12">
                      <div class="form-check form-check-inline">
                        <input
                          id="inside"
                          v-model="bookingList.addInfeed"
                          class="form-check-input"
                          type="checkbox"
                          value="飼料內"
                          :disabled="!room.medicine_infeed"
                          @change="addService"
                        />
                        <label class="form-check-label" for="inside"
                          >飼料內(${{
                            (room.medicine_infeed_amt * quantity)
                              | currencyStyle
                          }})</label
                        >
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          id="pill"
                          v-model="bookingList.addPill"
                          class="form-check-input"
                          type="checkbox"
                          value="藥丸"
                          :disabled="!room.medicine_pill"
                          @change="addService"
                        />
                        <label class="form-check-label" for="pill">
                          藥丸
                          <span v-if="room.medicine_pill == true"
                            >($
                            {{
                              (room.medicine_pill_amt * quantity)
                                | currencyStyle
                            }})</span
                          >
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          id="outside"
                          v-model="bookingList.addPaste"
                          class="form-check-input"
                          type="checkbox"
                          value="外用"
                          :disabled="!room.medicine_paste"
                          @change="addService"
                        />
                        <label class="form-check-label" for="outside">
                          外用
                          <span v-if="room.medicine_paste == true"
                            >($
                            {{
                              (room.medicine_paste_amt * quantity)
                                | currencyStyle
                            }})</span
                          >
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group align-items-center row">
                    <label class="col-12 col-form-label" for="plus"
                      >加購服務({{ quantity }}隻)</label
                    >
                    <div class="col-12">
                      <div class="form-check form-check-inline">
                        <input
                          id="bath"
                          v-model="bookingList.addBath"
                          class="form-check-input"
                          type="checkbox"
                          value="洗澡"
                          :disabled="!room.bath"
                          @change="addService"
                        />
                        <label class="form-check-label" for="bath">
                          洗澡
                          <span v-if="room.bath == true"
                            >(${{
                              (room.bath_amt * quantity) | currencyStyle
                            }})</span
                          >
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          id="cutNails"
                          v-model="bookingList.addNails"
                          class="form-check-input"
                          type="checkbox"
                          value="剪指甲"
                          :disabled="!room.nails"
                          @change="addService"
                        />
                        <label class="form-check-label" for="cutNails">
                          剪指甲
                          <span v-if="room.nails == true"
                            >(${{
                              (room.nails_amt * quantity) | currencyStyle
                            }})</span
                          >
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          id="cutHair"
                          v-model="bookingList.addHair"
                          class="form-check-input"
                          type="checkbox"
                          value="剪毛"
                          :disabled="!room.hair"
                          @change="addService"
                        />
                        <label class="form-check-label" for="cutHair">
                          剪毛
                          <span v-if="room.hair == true"
                            >(${{
                              (room.hair_amt * quantity) | currencyStyle
                            }})</span
                          >
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-12 col-form-label" for="remarks"
                      >備註</label
                    >
                    <div class="col-12">
                      <textarea
                        id="remarks"
                        v-model.trim="bookingList.comment"
                        class="form-control"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                  <p class="text-center h4 text-danger my-3">
                    小計：共 ${{ bookingList.addTotal | currencyStyle }} 元
                  </p>
                  <div class="text-right">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      :disabled="invalid"
                      :class="{disabled: invalid}"
                    >
                      下一步
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
            <div
              id="orderCheck"
              class="tab-pane fade"
              role="tabpanel"
              aria-labelledby="orderCheck-tab"
            >
              <p>寄宿廠商：{{ company.companybrand }}</p>
              <p>空間名稱：{{ room.roomname }}</p>
              <p>
                預定日期：{{ bookingList.dateStart }}~{{ bookingList.dateEnd }}
              </p>
              <p>
                地點：{{ company.country }}{{ company.area
                }}{{ company.address }}
              </p>
              <p>寄宿總價：${{ bookingList.totalPrice | currencyStyle }}</p>
              <hr />
              <p>訂購人：{{ bookingList.booker }}</p>
              <p>電話：{{ bookingList.phone }}</p>
              <p>數量：{{ quantity }}隻</p>
              <p>寵物品種：{{ bookingList.petType }}</p>
              <p>
                餵藥服務：
                <span v-if="bookingList.addInfeed"
                  >飼料內(${{
                    (room.medicine_infeed_amt * quantity) | currencyStyle
                  }})</span
                >
                <span v-if="bookingList.addPill" class="ml-1"
                  >藥丸(${{
                    (room.medicine_pill_amt * quantity) | currencyStyle
                  }})</span
                >
                <span v-if="bookingList.addPaste" class="ml-1"
                  >外用(${{
                    (room.medicine_paste_amt * quantity) | currencyStyle
                  }})</span
                >
                <span
                  v-if="
                    !bookingList.addPaste &&
                      !bookingList.addPill &&
                      !bookingList.addInfeed
                  "
                  >無</span
                >
              </p>
              <p>
                加購服務：
                <span v-if="bookingList.addBath"
                  >洗澡(${{ (room.bath_amt * quantity) | currencyStyle }})</span
                >
                <span v-if="bookingList.addNails" class="ml-1"
                  >剪指甲(${{
                    (room.nails_amt * quantity) | currencyStyle
                  }})</span
                >
                <span v-if="bookingList.addHair" class="ml-1"
                  >剪毛(${{ (room.hair_amt * quantity) | currencyStyle }})</span
                >
                <span
                  v-if="
                    !bookingList.addHair &&
                      !bookingList.addNails &&
                      !bookingList.addBath
                  "
                  >無</span
                >
              </p>
              <p>
                備註：
                <span v-if="bookingList.comment != ''">{{
                  bookingList.comment
                }}</span>
                <span v-if="bookingList.comment == ''">無</span>
              </p>
              <hr />
              <p class="text-center h4 text-danger my-3">
                訂單總額：共 $ {{ bookingTotalPrice | currencyStyle }} 元
              </p>
              <div class="d-flex justify-content-between">
                <button class="btn btn-outline-secondary" @click="lastStep">
                  上一步
                </button>
                <button
                  class="d-flex align-items-center btn btn-primary"
                  :class="{disabled: paying}"
                  :disabled="paying"
                  @click="pay"
                >
                  <ring-loader
                    class="custom-class"
                    :color="'black'"
                    :loading="paying"
                    :size="20"
                  ></ring-loader
                  >付款
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
/* global $ */
export default {
  props: ['temData', 'room', 'quantity', 'company', 'bookingTotalPrice'],
  data() {
    return {
      paying: false,
      bookingList: this.temData,
    };
  },
  watch: {
    temData(newVal) {
      this.bookingList = newVal;
    },
  },
  methods: {
    addService() {
      this.bookingList.addTotal = 0;
      if (this.bookingList.addInfeed === true) {
        this.bookingList.addTotal +=
          this.room.medicine_infeed_amt * this.quantity;
      }
      if (this.bookingList.addPill === true) {
        this.bookingList.addTotal +=
          this.room.medicine_pill_amt * this.quantity;
      }
      if (this.bookingList.addPaste === true) {
        this.bookingList.addTotal +=
          this.room.medicine_paste_amt * this.quantity;
      }
      if (this.bookingList.addBath === true) {
        this.bookingList.addTotal += this.room.bath_amt * this.quantity;
      }
      if (this.bookingList.addNails === true) {
        this.bookingList.addTotal += this.room.nails_amt * this.quantity;
      }
      if (this.bookingList.addHair === true) {
        this.bookingList.addTotal += this.room.hair_amt * this.quantity;
      }
    },
    pay() {
      const vm = this;
      vm.paying = true;

      const jwt = Cookies.get('jwt');

      const config = {
        method: 'post',
        url: 'Pay/Getinfo',
        headers: {
          Authorization: jwt,
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
          memo: `${this.bookingList.comment}`,
        },
      };
      this.$http(config)
        .then(function(response) {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: '即將進入金流頁面',
            showConfirmButton: false,
            timer: 2000,
          });
          vm.sendFormPost(response.data);
        })
        .catch(function() {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '預定失敗',
            showConfirmButton: false,
            timer: 2000,
          });
          vm.paying = false;
        });
    },
    sendFormPost(payData) {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://ccore.newebpay.com/MPG/mpg_gateway';
      form.style.display = 'none';

      payData.forEach((data) => {
        const inputFirst = document.createElement('input');
        inputFirst.value = data.Value;
        inputFirst.type = 'text';
        inputFirst.name = data.Key;
        form.appendChild(inputFirst);
      });
      const sendBtn = document.createElement('button');
      sendBtn.type = 'submit';
      sendBtn.id = 'send';
      form.appendChild(sendBtn);
      document.body.appendChild(form);

      sendBtn.click();
    },
    nextStep() {
      $('.nav-pills button[href="#orderCheck"]').tab('show');
    },
    lastStep() {
      $('.nav-pills button[href="#bookingInfo"]').tab('show');
    },
  },
};
</script>
