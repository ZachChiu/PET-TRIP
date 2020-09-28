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
          <h2>替家中寶貝找到<br class="d-sm-none d-block">完美寄宿空間</h2>
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
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" style="height: 450px">
          <div class="carousel-item active h-100">
            <img
              src="https://upload.cc/i1/2020/09/20/KGJ2dY.jpg"
              style="object-fit: cover"
              class="h-100 d-block w-100"
              alt
            />
          </div>
          <div class="carousel-item h-100">
            <img
              src="https://upload.cc/i1/2020/09/21/ifl71W.jpg"
              style="object-fit: cover"
              class="h-100 d-block w-100"
              alt
            />
          </div>
          <div class="carousel-item h-100">
            <img
              src="https://upload.cc/i1/2020/09/21/H8ZgSU.jpg"
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
            data-aos="fade-right"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            class="col-11 col-md-3 mx-auto mb-4"
          >
            <p class="text-center display-4 text-primary">
              <img
                src="https://upload.cc/i1/2020/09/25/VhmtWk.png"
                alt=""
                class="img-fluid"
              />
            </p>
            <h4 class="text-center h5 font-weight-bold">搜尋適合的寄宿空間</h4>
            <p>
              Pet Trip 上有高達 100
              間寵物寄宿廠商，你可以在任何地區找到適合的寵物寄宿空間。
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            class="col-11 col-md-3 mx-auto mb-4"
          >
            <p class="text-center display-4 text-primary">
              <img
                src="https://upload.cc/i1/2020/09/25/AysSzw.png"
                alt=""
                class="img-fluid"
              />
            </p>
            <h4 class="text-center h5 font-weight-bold">與寄宿廠商預定空間</h4>
            <p>
              Pet Trip
              有最完善的交易政策，你可以輕鬆且快速的在這裡預定合適的寄宿空間。
            </p>
          </div>
          <div
            data-aos="fade-left"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            class="col-11 col-md-3 mx-auto mb-4"
          >
            <p class="text-center display-4 text-primary">
              <img
                src="https://upload.cc/i1/2020/09/25/4cbPdr.png"
                alt=""
                class="img-fluid"
              />
            </p>
            <h4 class="text-center h5 font-weight-bold">寵物安心玩得放心</h4>
            <p>放心的把寵物交給寄宿廠商，快樂出遊去。</p>
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
          :autoplayTimeout="5000"
          :autoplayHoverPause="true"
          :margin="10"
          :responsive="responsiveRoom"
          :responsiveClass="true"
          data-aos="fade-left"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
        >
          <div v-for="(room, index) in homeData.rooms" :key="index">
            <div class="roomCard shadow card mb-3">
              <div
                class="h-100"
                :style="{ backgroundImage: 'url(' + room.img1 + ')' }"
                style="background-size: cover"
              >
                <img
                  src="https://upload.cc/i1/2020/09/09/GIaohq.jpg"
                  :class="{ opacityZero: room.bannerimg != '' }"
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
                  $ {{ room.roomprice | currencyStyle}} / 天
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
            <img          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
              class="img-fluid"
              src="https://upload.cc/i1/2020/09/25/KeE4bR.png"
              alt=""
            />
          </div>
          <div class="col-12 col-md-6">
            <h4         data-aos="flip-up"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000" class="text-center mb-3">
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

            <h4         data-aos="flip-up"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000" class="text-center mb-3">
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
            <h4         data-aos="flip-up"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000" class="text-center mb-3">
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
        :autoplayTimeout="5000"
        :autoplayHoverPause="true"
        :margin="10"
        :responsive="responsiveFirm"
        :responsiveClass="true"
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
                    class="firmPic h-100"
                    :style="{ backgroundImage: 'url(' + firm.bannerimg + ')' }"
                    style="background-size: cover; background-position: center"
                  >
                    <img
                      src="https://upload.cc/i1/2020/09/09/GIaohq.jpg"
                      :class="{ opacityZero: firm.bannerimg != '' }"
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
                          class="rounded-circle mx-auto"
                          :style="{
                            backgroundImage: 'url(' + firm.avatar + ')',
                          }"
                          style="background-size: cover; max-width: 300px"
                        >
                          <img
                            src="https://upload.cc/i1/2020/09/09/wa8QmM.png"
                            :class="{ opacityZero: firm.avatar != '' }"
                            class="w-100 img-fluid"
                            alt
                          />
                        </div>
                      </div>
                      <div class="col-8 col-sm-12">
                        <h6
                          class="my-0 mr-1 card-title text-truncate font-weight-bold"
                        >
                          <p class="mb-0 ">
                            {{ firm.companybrand }}
                          </p>
                        </h6>
                        <p class="my-1 d-flex align-items-end flex-wrap">
                          <star-rating
                            :inline="true"
                            v-model="firm.evaluation"
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
                            >~{{ firm.roomprice_max | currencyStyle}}</span
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

<style lang="scss">
.HomeBanner {
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 3px;
  background: rgba($color: #d8d8d8, $alpha: 0.4);
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  h2 {
    text-shadow: black 0.1em 0.1em 0.2em;
  }
}
.promise {
  text-shadow: black 0.1em 0.1em 0.2em;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-attachment: fixed;
  background-position: center;
  background-image: url("https://upload.cc/i1/2020/09/21/GUYRjv.jpg");
  background-size: cover;
  height: 450px;
}
.process {
  background: linear-gradient(#fcfcfc, rgb(250, 249, 245));
}
.hotRoom {
  padding-top: 500px !important;
  background: linear-gradient(rgb(250, 249, 242), #fcfcfc);
}
</style>

<script>
/* global $ */
import carousel from 'vue-owl-carousel'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({ once: true })
export default {
  name: 'Home',
  data () {
    return {
      homeData: {},
      responsiveRoom: {
        0: {
          items: 1
        },
        576: {
          items: 1
        },
        768: {
          items: 2
        },
        992: {
          items: 3
        }
      },
      responsiveFirm: {
        0: {
          items: 1
        },
        992: {
          items: 2
        }
      }
    }
  },
  components: { carousel },
  created () {
    $('html, body').animate(
      {
        scrollTop: $('#app').offset().top
      },
      0
    )
    this.getData()
  },
  methods: {
    getData: function () {
      const vm = this
      vm.$emit('loadAction', true)
      const config = {
        method: 'get',
        url: 'http://pettrip.rocket-coding.com/api/Home/GetAllInfo'
      }
      this.$http(config)
        .then(function (response) {
          vm.$emit('loadAction', false)
          vm.homeData = response.data
        })
        .catch(function () {
          vm.$emit('loadAction', false)
        })
    }
  }
}
</script>
