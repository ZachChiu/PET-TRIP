<template>
  <div class="firmPage">
    <div class="banner">
      <div
        v-if="firmData.company != null"
        class="backgroundIMG mx-auto"
        :style="{backgroundImage: 'url(' + firmData.company.bannerimg + ')'}"
      >
        <img
          src="https://upload.cc/i1/2020/09/09/GIaohq.jpg"
          :class="{opacityZero: firmData.company.bannerimg != ''}"
          class="w-100 img-fluid"
          style="height: 300px;object-fit: cover;"
          alt
        />
      </div>
    </div>
    <div
      v-if="firmData.company != null"
      class="container pt-3 position-relative"
      style="top:-70px"
    >
      <div class="row mx-0 justify-content-center">
        <div class="py-3 bg-dark col-lg-5 col-md-6 col-sm-10">
          <div class="row justify-content-center text-light align-items-center">
            <div class="col-sm-3 col-4">
              <div
                class="backgroundIMG mx-auto rounded-circle overflow-hidden"
                :style="{
                  backgroundImage: 'url(' + firmData.company.avatar + ')',
                }"
                style="width:80px; height:80px"
              >
                <img
                  src="https://upload.cc/i1/2020/09/09/wa8QmM.png"
                  :class="{opacityZero: firmData.company.avatar != ''}"
                  class="w-100 h-100 img-fluid"
                  style="object-fit: cover;"
                  alt
                />
              </div>
            </div>
            <div class="col-sm-9 col-8 text-truncate">
              <h4 class="mb-0 text-truncate">
                {{ firmData.company.companybrand }}
              </h4>
              <p class="mb-0 text-truncate">
                接受寵物：
                <span v-if="firmData.company.pettype_cat">貓</span>
                <span
                  v-if="
                    firmData.company.pettype_cat && firmData.company.pettype_dog
                  "
                  >、</span
                >
                <span v-if="firmData.company.pettype_dog">狗</span>
                <span
                  v-if="
                    firmData.company.pettype_dog &&
                      firmData.company.pettype_other
                  "
                  >、</span
                >
                <span
                  v-if="
                    firmData.company.pettype_cat &&
                      !firmData.company.pettype_dog &&
                      firmData.company.pettype_other
                  "
                  >、</span
                >
                <span v-if="firmData.company.pettype_other">其他</span>
              </p>
            </div>
          </div>
        </div>
        <div
          class="py-3 col-lg-5 col-md-6 col-sm-10 bg-white border d-flex flex-column justify-content-center"
        >
          <div class="d-md-block d-none">
            <div class="text-warning mb-0 d-flex align-items-end">
              <span class="text-dark mr-2"
                >評價：{{ firmData.company.evaluation_count }}筆</span
              >
              <star-rating
                v-model="firmData.company.evaluation"
                :rounded-corners="true"
                :inline="true"
                :increment="0.1"
                :read-only="true"
                :star-size="22"
              ></star-rating>
            </div>
            <p v-if="!all" class="mb-0">
              回覆時段：
              <span v-if="firmData.company.morning">早上</span>
              <span
                v-if="firmData.company.morning && firmData.company.afternoon"
                >、</span
              >
              <span
                v-if="
                  firmData.company.morning &&
                    !firmData.company.afternoon &&
                    firmData.company.night
                "
                >、</span
              >
              <span
                v-if="
                  firmData.company.morning &&
                    !firmData.company.afternoon &&
                    !firmData.company.night &&
                    firmData.company.midnight
                "
                >、</span
              >
              <span v-if="firmData.company.afternoon">下午</span>
              <span v-if="firmData.company.afternoon && firmData.company.night"
                >、</span
              >
              <span
                v-if="
                  firmData.company.afternoon &&
                    !firmData.company.night &&
                    firmData.company.midnight
                "
                >、</span
              >
              <span v-if="firmData.company.night">晚上</span>
              <span v-if="firmData.company.night && firmData.company.midnight"
                >、</span
              >
              <span v-if="firmData.company.midnight">半夜</span>
            </p>
            <p v-if="all" class="mb-0">回覆時段：24小時</p>
            <p class="mb-0">空間：{{ firmData.company.count }}間</p>
          </div>
          <div
            class="d-md-none d-flex text-center justify-content-around align-items-center"
          >
            <p class="mb-0">
              {{ firmData.company.evaluation }}/5.0 <br />{{
                firmData.company.evaluation_count
              }}筆評價
            </p>
            <div>|</div>
            <p v-if="!all" class="mb-0">
              回覆時段
              <br />
              <span v-if="firmData.company.morning">早上</span>
              <span
                v-if="firmData.company.morning && firmData.company.afternoon"
                >、</span
              >
              <span
                v-if="
                  firmData.company.morning &&
                    !firmData.company.afternoon &&
                    firmData.company.night
                "
                >、</span
              >
              <span
                v-if="
                  firmData.company.morning &&
                    !firmData.company.afternoon &&
                    !firmData.company.night &&
                    firmData.company.midnight
                "
                >、</span
              >
              <span v-if="firmData.company.afternoon">下午</span>
              <span v-if="firmData.company.afternoon && firmData.company.night"
                >、</span
              >
              <span
                v-if="
                  firmData.company.afternoon &&
                    !firmData.company.night &&
                    firmData.company.midnight
                "
                >、</span
              >
              <span v-if="firmData.company.night">晚上</span>
              <span v-if="firmData.company.night && firmData.company.midnight"
                >、</span
              >
              <span v-if="firmData.company.midnight">半夜</span>
            </p>
            <p v-if="all" class="mb-0">
              回覆時段
              <br />24小時
            </p>
            <div>|</div>
            <p class="mb-0">
              空間
              <br />
              共{{ firmData.company.count }}間
            </p>
          </div>
        </div>
      </div>
      <div class="row mx-0">
        <div
          style="height:150px"
          class="mx-auto col-lg-10 col-md-12 col-sm-10 overflow-auto my-3 p-3 introduce border"
        >
          <p v-if="firmData.company.introduce != null" class>
            {{ firmData.company.introduce }}
          </p>
          <p
            v-if="firmData.company.introduce == null"
            class="text-secondary h2 text-center"
          >
            無廠商介紹
          </p>
        </div>
      </div>
      <hr />
      <div class="container">
        <ul id="myTab" class="nav nav-tabs text-center" role="tablist">
          <li class="nav-item" role="presentation">
            <a
              id="space"
              class="nav-link active"
              data-toggle="tab"
              href="#nav-space"
              role="tab"
              aria-controls="nav-space"
              aria-selected="true"
              ><i class="mr-1 fas fa-gift"></i>空間</a
            >
          </li>
          <li class="nav-item" role="presentation">
            <a
              id="evaluation"
              class="nav-link border-top border-right bprder-left"
              data-toggle="tab"
              href="#nav-contact"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="false"
              ><i class="mr-1 fas fa-star"></i>評價</a
            >
          </li>
        </ul>

        <div id="nav-tabContent" class="tab-content">
          <div
            id="nav-space"
            class="tab-pane fade show active bg-white border-top-0 border"
            role="tabpanel"
            aria-labelledby="space"
          >
            <firmPageRoom :firm-data="firmData"></firmPageRoom>
          </div>
          <div
            id="nav-contact"
            class="tab-pane fade bg-white border-top-0 border"
            role="tabpanel"
            aria-labelledby="evaluation"
          >
            <firmPageEvaluation :firm-data="firmData"></firmPageEvaluation>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// /* global $ */
import firmPageRoom from '@/components/firmPageRoom.vue';
import firmPageEvaluation from '@/components/firmPageEvaluation.vue';
import {getFirm} from '@/lib/service/room.js';

export default {
  components: {
    firmPageRoom,
    firmPageEvaluation,
  },
  data() {
    return {
      firmData: {},
      id: {},
      all: false,
    };
  },
  created() {
    this.id = this.$route.params;
    this.getData();
  },
  methods: {
    async getData() {
      try {
        this.$emit('loadAction', true);

        this.firmData = await getFirm({id: this.id.FirmId});

        if (
          this.firmData.company.morning &&
          this.firmData.company.afternoon &&
          this.firmData.company.night &&
          this.firmData.company.midnight
        ) {
          this.all = true;
        }
        this.$emit('loadAction', false);
      } finally {
        this.$emit('loadAction', false);
      }
    },
  },
};
</script>
