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
          <div v-for="(room, index) in homeData.rooms" :key="index">
            <div class="backgroundIMG roomCard shadow card mb-3">
              <div
                class="h-100"
                :style="{backgroundImage: 'url(' + room.img1 + ')'}"
              >
                <img
                  :src="FeaturedBg"
                  :class="{opacityZero: room.bannerimg != ''}"
                  class="card-img"
                  alt
                />
              </div>
              <div class="card-body">
                <h5 class="card-title">
                  <router-link
                    target="_blank"
                    :to="`/FirmPage/${room.companyseq}/Room/${room.roomseq}`"
                    class="text-truncate text-body stretched-link"
                  >
                    <i class="text-warning fas fa-star"></i>
                    {{ room.roomname }}
                  </router-link>
                </h5>
                <p class="card-text">
                  <i class="mr-1 fas fa-paw"></i>可接受：
                  <span v-if="room.pettype_cat">貓</span>
                  <span v-if="room.pettype_cat && room.pettype_dog">、</span>
                  <span v-if="room.pettype_dog">狗</span>
                  <span v-if="room.pettype_dog && room.pettype_other">、</span>
                  <span
                    v-if="
                      room.pettype_cat &&
                        !room.pettype_dog &&
                        room.pettype_other
                    "
                    >、</span
                  >
                  <span v-if="room.pettype_other">其他</span>
                </p>
                <p class="card-text">
                  <i class="mr-1 fas fa-sort-numeric-down"></i>
                  可容納：{{ room.roomamount }}隻
                </p>
                <p class="card-text">
                  <i class="mr-1 fas fa-expand-alt"></i>接受重量：
                  <span>{{ room.petsizes }}</span>
                  <span v-if="room.petsizes != room.petsizee">~</span>
                  <span v-if="room.petsizes != room.petsizee">{{
                    room.petsizee
                  }}</span
                  >公斤
                </p>
                <p class="card-text text-danger h5 text-right">
                  $ {{ room.roomprice | currencyStyle }} / 天
                </p>
                <p
                  class="text-center card-text p-2 rounded text-light bg-secondary"
                >
                  <i class="mr-1 fas fa-hashtag"></i>
                  {{ room.companybrand }}
                </p>
              </div>
            </div>
          </div>
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
        <div v-for="(firm, index) in homeData.company" :key="index">
          <div class="firmCard shadow card mb-4">
            <router-link
              class="text-reset text-decoration-none"
              :to="`/FirmPage/${firm.companyseq}`"
            >
              <div class="row no-gutters">
                <div class="col-md-4">
                  <div
                    class="backgroundIMG firmPic h-100"
                    :style="{backgroundImage: 'url(' + firm.bannerimg + ')'}"
                  >
                    <img
                      :src="FeaturedBg"
                      :class="{opacityZero: firm.bannerimg != ''}"
                      class="card-img"
                      alt
                    />
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="card-body w-100 h-100">
                    <div
                      class="row align-items-md-end align-items-start flex-md-row-reverse flex-row"
                    >
                      <div class="col-4 d-sm-none d-block">
                        <div
                          class="backgroundIMG rounded-circle mx-auto"
                          :style="{
                            backgroundImage: 'url(' + firm.avatar + ')',
                          }"
                          style="max-width: 300px"
                        >
                          <img
                            :src="AvatarDefault"
                            :class="{opacityZero: firm.avatar != ''}"
                            class="w-100 img-fluid"
                            alt
                          />
                        </div>
                      </div>
                      <div class="col-8 col-sm-12">
                        <h6
                          class="my-0 mr-1 card-title text-truncate font-weight-bold"
                        >
                          <p class="mb-0">
                            {{ firm.companybrand }}
                          </p>
                        </h6>
                        <p class="my-1 d-flex align-items-end flex-wrap">
                          <star-rating
                            v-model="firm.evaluation"
                            :inline="true"
                            :increment="0.1"
                            :rounded-corners="true"
                            :read-only="true"
                            :star-size="20"
                          ></star-rating>
                          <small class="ml-1"
                            >({{ firm.evaluation_count }}筆)</small
                          >
                        </p>

                        <p class="my-1 card-text">
                          <i class="mr-1 fas fa-map-marker-alt"></i>
                          {{ firm.country }}、{{ firm.area }}
                        </p>
                        <p class="my-1 card-text">{{ firm.pettype }}</p>
                        <p class="my-1 text-truncate">
                          <i class="mr-1 fas fa-paw"></i>
                          <span v-if="firm.pettype_cat">貓</span>
                          <span v-if="firm.pettype_cat && firm.pettype_dog"
                            >、</span
                          >
                          <span v-if="firm.pettype_dog">狗</span>
                          <span v-if="firm.pettype_dog && firm.pettype_other"
                            >、</span
                          >
                          <span
                            v-if="
                              firm.pettype_cat &&
                                !firm.pettype_dog &&
                                firm.pettype_other
                            "
                            >、</span
                          >
                          <span v-if="firm.pettype_other">其他</span>
                        </p>
                        <p class="my-1 card-text text-secondary">
                          <i class="mr-1 fas fa-tag"></i>
                          共有{{ firm.rooms }}間房間
                        </p>
                        <p class="my-1 card-text text-danger">
                          <i class="mr-1 fas fa-barcode"></i>
                          $ {{ firm.roomprice_min | currencyStyle }}
                          <span v-if="firm.roomprice_min != firm.roomprice_max"
                            >~{{ firm.roomprice_max | currencyStyle }}</span
                          >
                          / 天
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
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
import FeaturedBg from '@/assets/img/Home/featured-bg.jpg';
import AvatarDefault from '@/assets/img/Home/Avatar-default.png';

AOS.init({once: true});
export default {
  components: {carousel},
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
      FeaturedBg,
      AvatarDefault,
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
    getData() {
      const vm = this;
      vm.$emit('loadAction', true);
      const config = {
        method: 'get',
        url: 'http://pettrip.rocket-coding.com/api/Home/GetAllInfo',
      };
      this.$http(config)
        .then(function(response) {
          vm.$emit('loadAction', false);
          vm.homeData = response.data;
        })
        .catch(function() {
          vm.$emit('loadAction', false);
        });
    },
  },
};
</script>
