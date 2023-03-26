<template>
  <div class="singleRoom">
    <bookingModal
      :tem-data="bookingList"
      :booking-total-price="bookingTotalPrice"
      :room="room"
      :company="company"
      :quantity="quantity"
    ></bookingModal>
    <div v-if="room != null" class="container pt-4 mb-5">
      <p v-if="!company.isopen" class="text-muted h3 text-center">
        {{ room.roomname }} 尚未開放
      </p>
      <div v-if="company.isopen">
        <h2 class="text-center pb-3 mb-3 border-bottom">{{ room.roomname }}</h2>
        <div class="row align-items-center bg-white">
          <div class="col-lg-6 col-12">
            <div
              id="carouselExampleIndicators"
              class="carousel slide"
              data-ride="carousel"
            >
              <div class="carousel-inner" style="height:400px">
                <div
                  v-for="(img, index) in imgList"
                  :key="index"
                  class="carousel-item h-100"
                  :class="{active: index == 0}"
                >
                  <img
                    :src="img"
                    style="object-fit: cover;"
                    class="h-100 d-block w-100"
                  />
                </div>
              </div>
              <a
                class="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div class="col-lg-6 col-12 pt-1">
            <div class="row">
              <div class="col-lg-12 col-md-6 text-center col-12">
                <vc-date-picker
                  v-model="dates"
                  :disabled-dates="this.disabledDate"
                  is-expanded
                  mode="range"
                  is-inline
                />
              </div>
              <div
                class="col-lg-12 col-md-6 col-12 d-flex flex-column justify-content-end"
              >
                <p class="text-danger h4 text-right my-3">
                  ${{ room.roomprice | currencyStyle
                  }}<span v-if="pricePlus != 0"
                    >+{{ priceAdd | currencyStyle }}</span
                  >
                  / 天
                </p>
                <div class="form-group row mb-0">
                  <div class="col-8">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <button
                          id="button-addon1"
                          class="btn btn-outline-secondary"
                          type="button"
                          @click="checkNumber('minus')"
                        >
                          -
                        </button>
                      </div>
                      <input
                        v-model="inputBox"
                        type="text"
                        class="inputAmount form-control text-center"
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        disabled
                      />
                      <div class="input-group-append">
                        <button
                          id="button-addon1"
                          class="btn btn-outline-secondary"
                          type="button"
                          @click="checkNumber('plus')"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <button
                      type="button"
                      class="w-100 btn btn-outline-primary"
                      @click="booking"
                    >
                      預定
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="roomCenter" class="row no-gutters py-3">
          <div class="col-md-4 col-sm-6 col-12 d-flex align-items-center">
            <div class="row align-items-center">
              <div class="col-4">
                <div
                  class="backgroundIMG rounded-circle overflow-hidden"
                  :style="{backgroundImage: 'url(' + company.avatar + ')'}"
                  style="max-width: 300px;"
                >
                  <img
                    :src="AvatarDefault"
                    :class="{opacityZero: company.avatar != ''}"
                    class="img-fluid"
                    alt
                  />
                </div>
              </div>
              <div class="col-8">
                <p class="d-sm-none d-block">
                  <star-rating
                    v-model="company.evaluation"
                    :rounded-corners="true"
                    :inline="true"
                    :increment="0.1"
                    :read-only="true"
                    :star-size="20"
                  ></star-rating>
                </p>
                <p class="text-truncate h5">{{ company.companybrand }}</p>
                <router-link
                  :to="`/FirmPage/${room.companyseq}`"
                  class="btn border rounded-pill"
                  >進入寄宿主頁</router-link
                >
              </div>
            </div>
          </div>
          <div
            class="col-md-4 col-6 d-none d-sm-flex flex-column align-items-center justify-content-center"
          >
            <p class="mb-1">評價{{ company.evaluation_count }}則</p>
            <star-rating
              v-model="company.evaluation"
              :rounded-corners="true"
              :inline="true"
              :increment="0.1"
              :read-only="true"
              :star-size="20"
            ></star-rating>
          </div>
          <div
            class="col-md-4 d-none d-md-flex flex-column justify-content-center text-center"
          >
            <p v-if="!all" class="mb-0">
              回覆時段：
              <span v-if="company.morning">早上</span>
              <span v-if="company.morning && company.afternoon">、</span>
              <span
                v-if="company.morning && !company.afternoon && company.night"
                >、</span
              >
              <span
                v-if="
                  company.morning &&
                    !company.afternoon &&
                    !company.night &&
                    company.midnight
                "
                >、</span
              >
              <span v-if="company.afternoon">下午</span>
              <span v-if="company.afternoon && company.night">、</span>
              <span
                v-if="company.afternoon && !company.night && company.midnight"
                >、</span
              >
              <span v-if="company.night">晚上</span>
              <span v-if="company.night && company.midnight">、</span>
              <span v-if="company.midnight">半夜</span>
            </p>
            <p v-if="all" class="mb-0">回覆時段：24小時</p>
          </div>
        </div>

        <ul id="roomTab" class="nav nav-tabs" role="tablist">
          <li class="nav-item" role="presentation">
            <a
              id="roomInfo-tab"
              class="nav-link active"
              data-toggle="tab"
              href="#roomInfo"
              role="tab"
              aria-controls="roomInfo"
              aria-selected="true"
              ><i class="mr-1 fas fa-info-circle"></i>空間介紹</a
            >
          </li>
          <li class="nav-item" role="presentation">
            <a
              id="qa-tab"
              class="nav-link"
              data-toggle="tab"
              href="#qa"
              role="tab"
              aria-controls="qa"
              aria-selected="false"
              ><i class="mr-1 fas fa-question-circle"></i>問與答</a
            >
          </li>
        </ul>
        <div id="myTabContent" class="tab-content">
          <div
            id="roomInfo"
            class="tab-pane fade show active bg-white"
            role="tabpanel"
            aria-labelledby="roomInfo-tab"
          >
            <roomInfo :room="room" :company="company"></roomInfo>
          </div>
          <div
            id="qa"
            class="tab-pane fade bg-white"
            role="tabpanel"
            aria-labelledby="qa-tab"
          >
            <roomQA
              :identify="identify"
              :q-a="QA"
              :room="room"
              @refresh="getData"
            ></roomQA>
            <page
              v-if="page.count !== 0"
              :page-data="page"
              @page-change="getData"
            ></page>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import bookingModal from '@/components/bookingModal.vue';
import roomInfo from '@/components/roomInfo.vue';
import roomQA from '@/components/roomQA.vue';
import page from '@/components/page.vue';
import Cookies from 'js-cookie';
import AvatarDefault from '@/assets/img/Home/Avatar-default.png';

export default {
  components: {
    roomQA,
    roomInfo,
    bookingModal,
    page,
  },
  props: ['identify'],
  data() {
    return {
      AvatarDefault,
      removeDate: [],
      disabledDate: [],
      imgList: [],
      dates: {},
      company: {},
      room: null,
      QA: [],
      id: {},
      page: {},
      payData: [
        {
          Key: '1',
          Value: '2',
        },
        {
          Key: '1',
          Value: '2',
        },
        {
          Key: '1',
          Value: '2',
        },
        {
          Key: '1',
          Value: '2',
        },
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
        totalPrice: 0,
      },
      all: false,
      quantity: 1,
      quantitytext: '隻',
      inputBox: '1隻',
      pricePlus: 0,
      priceAdd: '',
    };
  },
  computed: {
    bookingTotalPrice() {
      return (
        Number(this.bookingList.addTotal) + Number(this.bookingList.totalPrice)
      );
    },
  },
  created() {
    this.id = this.$route.params;
    this.getData();
  },
  methods: {
    getData(page = 1) {
      this.$emit('loadAction', true);
      const vm = this;
      const config = {
        method: 'get',
        url: `Room/GetRoomsFront?id=${this.id.RoomId}&page=${page}`,
      };

      this.$http(config)
        .then(function(response) {
          vm.company = response.data.company;
          vm.room = response.data.room;
          vm.removeDate = response.data.remove;
          vm.QA = response.data.qa;
          vm.page = response.data.meta;
          vm.removeDate.forEach(function(item) {
            vm.disabledDate.push({
              start: item.orderdates,
              end: item.orderdatee,
            });
          });
          if (
            vm.company.morning &&
            vm.company.afternoon &&
            vm.company.night &&
            vm.company.midnight
          ) {
            vm.all = true;
          }
          for (let i = 1; i <= 4; i++) {
            if (
              vm.room[`img${i}`] !== '' &&
              vm.room[`img${i}`] !== undefined &&
              vm.room[`img${i}`] !== null
            ) {
              vm.imgList.push(vm.room[`img${i}`]);
            }
          }
          vm.$emit('loadAction', false);
        })
        .catch(function() {
          vm.$emit('loadAction', false);
        });
    },
    checkNumber(num) {
      if (num === 'plus' && this.quantity < this.room.roomamount) {
        this.quantity += 1;
        this.pricePlus += 1;
      } else if (num === 'minus' && this.quantity > 1) {
        this.quantity -= 1;
        this.pricePlus -= 1;
      } else {
        this.Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'info',
          title: '已超出本空間容納數量',
          showConfirmButton: false,
          timer: 2000,
        });
      }
      this.inputBox = `${this.quantity}${this.quantitytext}`;
      this.priceAdd = this.room.roomamount_amt * this.pricePlus;
    },
    booking() {
      const jwt = Cookies.get('jwt');

      if (!jwt) {
        this.Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'info',
          title: '請先登入',
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (this.dates === null) {
        this.Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'info',
          title: '請選擇日期',
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (this.identify.identity === '廠商') {
        this.Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'info',
          title: '廠商帳號不得預定',
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (this.dates != null) {
        this.bookingList.dateStart = new Date(
          this.dates.start
        ).toLocaleDateString();
        this.bookingList.dateEnd = new Date(
          this.dates.end
        ).toLocaleDateString();
        $('#bookingModal').modal('show');
        this.bookingList.totalDay =
          (new Date(this.dates.end) - new Date(this.dates.start)) /
            (1000 * 60 * 60 * 24) +
          1;
        this.bookingList.totalPrice =
          (this.room.roomprice +
            (this.quantity - 1) * this.room.roomamount_amt) *
          this.bookingList.totalDay;
        $('.nav-tabs button[href="#bookingInfo"]').tab('show');
      }
    },
  },
};
</script>
