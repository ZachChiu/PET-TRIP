<template>
  <div class="home overflow-hidden">
    <div class="banner position-relative">
      <div
        class="HomeBanner position-absolute text-white h1 mb-0 font-weight-bold"
      >
        <div
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          class="container text-center"
        >
          <h2>替家中寶貝找到<br class="d-sm-none d-block" />完美寄宿空間</h2>
          <router-link class="btn btn-primary shadow" to="/FirmList"
            >尋找適合的寄宿空間</router-link
          >
        </div>
      </div>
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators" style="z-index: 9">
          <li
            v-for="(carousel, index) in carousels"
            :key="carousel.key + index"
            data-target="#carouselExampleIndicators"
            :data-slide-to="index"
            :class="{active: index === 0}"
          ></li>
        </ol>
        <div class="carousel-inner" style="height: 450px">
          <div
            v-for="(carousel, index) in carousels"
            :key="carousel.key"
            :class="{active: index === 0}"
            class="carousel-item  h-100"
          >
            <img
              :src="carousel.img"
              style="object-fit: cover"
              class="h-100 d-block w-100"
              alt
            />
          </div>
        </div>
        <a
          style="z-index: 9"
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          style="z-index: 9"
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
    <div class="process py-5">
      <div class="container">
        <h2 class="text-center mb-5"><b>三大步驟</b></h2>
        <div class="row justify-content-between">
          <div
            v-for="step in steps"
            :key="step.title"
            :data-aos="step.fadeWay"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            class="col-11 col-md-3 mx-auto mb-4"
          >
            <p class="text-center display-4 text-primary">
              <img :src="step.img" alt="" class="img-fluid" />
            </p>
            <h4 class="text-center h5 font-weight-bold">{{ step.title }}</h4>
            <p>
              {{ step.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="position-relative">
      <div
        class="promise d-flex align-items-center justify-content-center position-absolute text-white h1 mb-0 font-weight-bold"
        :style="[{backgroundImage: `url(${PromiseBg})`}]"
      >
        <div
          data-aos="zoom-out-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          class="container text-center"
        >
          <p>三大保證</p>
          <ul class="list-unstyled">
            <li>
              <p class="h4">
                <i class="mr-1 fas fa-check-square"></i>七天前取消
                <b>保證</b>全額退費
              </p>
            </li>
            <li>
              <p class="h4">
                <i class="mr-1 fas fa-shield-alt"></i>預定過程 <b>保證</b>安全
              </p>
            </li>
            <li>
              <p class="h4">
                <i class="mr-1 fas fa-dollar-sign"></i>價格資訊 <b>保證</b>透明
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="hotRoom py-4">
      <div class="container">
        <h4 class="text-center h2 mb-4">
          <span class="text-primary">
            <i class="fas fa-star"></i>
          </span>
          精選寄宿空間
        </h4>
        <carousel
          v-if="homeData.rooms != null"
          :loop="true"
          :dot="false"
          :nav="false"
          :autoplay="true"
          :autoplay-timeout="5000"
          :autoplay-hover-pause="true"
          :margin="10"
          :responsive="responsiveRoom"
          :responsive-class="true"
          data-aos="fade-left"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
        >
          <RoomCard
            v-for="room in homeData.rooms"
            :key="room.roomseq"
            :room="room"
          />
        </carousel>
      </div>
    </div>
    <div class="platformNum my-4">
      <hr />
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-12 col-md-6">
            <img
              data-aos="fade-right"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              class="img-fluid"
              :src="Target"
              alt=""
            />
          </div>
          <div class="col-12 col-md-6">
            <h4
              data-aos="flip-up"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              class="text-center mb-3"
            >
              進駐廠商高達
              <b>{{ homeData.compantcount }}</b> 間
            </h4>
            <div
              data-aos="flip-up"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              class="progress mt-2 mb-4"
            >
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                style="width: 70%"
              >
                已涵括全台大部分廠商
              </div>
            </div>

            <h4
              data-aos="flip-up"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              class="text-center mb-3"
            >
              空間總數高達
              <span class="font-weight-bold">{{ homeData.roomcount }}</span> 間
            </h4>
            <div
              data-aos="flip-up"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              class="progress mt-2 mb-4"
            >
              <div
                class="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                style="width: 80%"
              >
                選擇多於其他平台
              </div>
            </div>
            <h4
              data-aos="flip-up"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              class="text-center mb-3"
            >
              已完成委託高達
              <span class="font-weight-bold">{{ homeData.ordercount }}</span> 筆
            </h4>
            <div
              data-aos="flip-up"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              class="progress mt-2 mb-4"
            >
              <div
                class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                style="width: 90%"
              >
                快速達成委託
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <div class="hotFirm container py-4">
      <h4 class="text-center h2 mb-4">
        <span class="mr-1 text-danger"> <i class="fas fa-fire"></i></span>
        熱門廠商
      </h4>
      <carousel
        v-if="homeData.rooms != null"
        :loop="false"
        :dot="false"
        :nav="false"
        :autoplay="true"
        :autoplay-timeout="5000"
        :autoplay-hover-pause="true"
        :margin="10"
        :responsive="responsiveFirm"
        :responsive-class="true"
        data-aos="fade-right"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <FirmCard
          v-for="firm in homeData.company"
          :key="firm.companyseq"
          :firm="firm"
        />
      </carousel>
    </div>
  </div>
</template>

<script>
/* global $ */
import carousel from 'vue-owl-carousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import carousel1 from '@/assets/img/Home/carousel-1.jpg';
import carousel2 from '@/assets/img/Home/carousel-2.jpg';
import carousel3 from '@/assets/img/Home/carousel-3.jpg';
import step1 from '@/assets/img/Home/step-1.png';
import step2 from '@/assets/img/Home/step-2.png';
import step3 from '@/assets/img/Home/step-3.png';
import Target from '@/assets/img/Home/target.png';
import PromiseBg from '@/assets/img/Home/promise-bg.jpg';
import {getHomeAllInfo} from '@/lib/service/home.js';
import FirmCard from '@/components/FirmCard.vue';
import RoomCard from '@/components/RoomCard.vue';

AOS.init({once: true});
export default {
  components: {carousel, FirmCard, RoomCard},
  data() {
    return {
      homeData: {},
      responsiveRoom: {
        0: {
          items: 1,
        },
        576: {
          items: 1,
        },
        768: {
          items: 2,
        },
        992: {
          items: 3,
        },
      },
      responsiveFirm: {
        0: {
          items: 1,
        },
        992: {
          items: 2,
        },
      },
      Target,
      PromiseBg,
      carousels: [
        {
          key: 'carousel-1',
          img: carousel1,
        },
        {
          key: 'carousel-2',
          img: carousel2,
        },
        {
          key: 'carousel-3',
          img: carousel3,
        },
      ],
      steps: [
        {
          title: '搜尋適合的寄宿空間',
          text:
            'Pet Trip 上有高達 100 間寵物寄宿廠商，你可以在任何地區找到適合的寵物寄宿空間。',
          fadeWay: 'fade-right',
          img: step1,
        },
        {
          title: '與寄宿廠商預定空間',
          text:
            ' Pet Trip 有最完善的交易政策，你可以輕鬆且快速的在這裡預定合適的寄宿空間。',
          fadeWay: 'fade-up',
          img: step2,
        },
        {
          title: '寵物安心玩得放心',
          text:
            'Pet Trip 有最完善的交易政策，你可以輕鬆且快速的在這裡預定合適的寄宿空間。',
          fadeWay: 'fade-left',
          img: step3,
        },
      ],
    };
  },
  created() {
    $('html, body').animate(
      {
        scrollTop: $('#app').offset().top,
      },
      0
    );
    this.getData();
  },
  methods: {
    async getData() {
      try {
        this.$emit('loadAction', true);
        this.homeData = await getHomeAllInfo();
      } finally {
        this.$emit('loadAction', false);
      }
    },
  },
};
</script>
