<template>
  <div>
    <form
      class="p-3 mb-3 bg-white border border-top-0"
      @submit.prevent="searchBtn"
    >
      <div class="form-row">
        <div class="form-group col-md-6 col-12">
          <div class="row">
            <label class="col-lg-3 col-form-label" for="inputCity">縣市</label>
            <div class="col-lg-9">
              <select
                id="inputCity"
                v-model="regin"
                class="form-control"
                @change="selectRegion"
              >
                <option value selected>請選擇</option>
                <option
                  v-for="(region, index) in regionList"
                  :key="index"
                  :value="region"
                  >{{ region }}</option
                >
              </select>
            </div>
          </div>
        </div>
        <div class="form-group col-md-6 col-12">
          <div class="row">
            <label class="col-lg-3 col-form-label" for="inputState">區域</label>
            <div class="col-lg-9">
              <select id="inputState" v-model="area" class="form-control">
                <option value selected>請選擇</option>
                <option
                  v-for="(area, index) in areaList"
                  :key="index"
                  :value="area"
                  >{{ area }}</option
                >
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6 col-12 align-items-center">
          <div class="row align-items-center">
            <label class="col-lg-3 col-form-label" for="petType"
              >條件篩選</label
            >
            <div class="col-lg-9">
              <div class="form-check form-check-inline">
                <button
                  id="priceBtn"
                  type="button"
                  class="mb-1 btn btn-outline-danger"
                  @click="filter('price')"
                >
                  <i
                    v-show="!togglePrice"
                    class="mr-1 fas fa-sort-amount-down"
                  ></i>
                  <i
                    v-show="togglePrice"
                    class="mr-1 fas fa-sort-amount-down-alt"
                  ></i
                  >金額
                  <span v-show="!togglePrice">(高-低)</span>
                  <span v-show="togglePrice">(低-高)</span>
                </button>
              </div>
              <div class="form-check form-check-inline">
                <button
                  id="evaluationBtn"
                  type="button"
                  class="btn btn-outline-danger"
                  @click="filter('evaluation')"
                >
                  <i
                    v-show="!toggleEvaluation"
                    class="mr-1 fas fa-sort-amount-down"
                  ></i>
                  <i
                    v-show="toggleEvaluation"
                    class="mr-1 fas fa-sort-amount-down-alt"
                  ></i
                  >評價
                  <span v-show="!toggleEvaluation">(高-低)</span>
                  <span v-show="toggleEvaluation">(低-高)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group col-md-6 col-12 align-items-center">
          <div class="row">
            <label class="col-lg-3 col-form-label" for="search">搜尋</label>
            <div class="col-lg-9">
              <div class="input-group mb-3">
                <input
                  id="search"
                  v-model="keywords"
                  type="text"
                  class="form-control"
                  placeholder="關鍵字搜尋"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-right">
        <button
          type="button"
          class="mr-3 btn btn-outline-primary"
          @click.prevent="resetBtn"
        >
          重置篩選條件
        </button>
        <button type="submit" class="btn btn-primary">查詢</button>
      </div>
    </form>
    <div v-if="firmList[0] != null" class="row">
      <div
        v-for="(firm, index) in firmList"
        :key="index"
        class="col-12 col-sm-6 col-lg-6 "
      >
        <div class="firmCard shadow card mb-4">
          <router-link
            class="text-reset text-decoration-none"
            :to="`/FirmPage/${firm.companyseq}`"
          >
            <div class="row no-gutters">
              <div class="col-md-4">
                <div
                  class="firmPic backgroundIMG h-100"
                  :style="{backgroundImage: 'url(' + firm.bannerimg + ')'}"
                >
                  <img
                    src="https://upload.cc/i1/2020/09/09/GIaohq.jpg"
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
                        class="backgroundIMG rounded-circle mx-auto overflow-hidden"
                        :style="{backgroundImage: 'url(' + firm.avatar + ')'}"
                        style="max-width: 300px;"
                      >
                        <img
                          src="https://upload.cc/i1/2020/09/09/wa8QmM.png"
                          :class="{opacityZero: firm.avatar != ''}"
                          class="w-100 img-fluid"
                          alt
                        />
                      </div>
                    </div>
                    <div class="col-8 col-sm-12 ">
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
    </div>
    <div
      v-if="firmList[0] == null"
      class="text-muted py-3 display-4 text-center"
    >
      <p>查無資料</p>
    </div>
  </div>
</template>

<script>
/* global $ */
import taiwan from '@/taiwan_districts.json';

export default {
  name: 'FirmListFirm',
  props: ['firmList'],
  data() {
    return {
      regin: '',
      regionList: [],
      area: '',
      areaList: [],
      taiwan,
      togglePrice: false,
      toggleEvaluation: false,
      filterSelect: '',
      keywords: '',
    };
  },
  created() {
    this.getRegion();
  },
  methods: {
    getRegion() {
      this.taiwan.forEach((item) => this.regionList.push(item.name));
    },
    selectRegion() {
      const vm = this;
      vm.areaList = [];
      vm.area = '';
      this.taiwan.forEach(function(item) {
        if (vm.regin.indexOf(item.name) !== -1) {
          item.districts.forEach((area) => vm.areaList.push(area.name));
        }
      });
    },
    filter(filterData) {
      if (filterData === 'price') {
        $('#evaluationBtn').removeClass('active');
        $('#priceBtn').addClass('active');
        switch (this.togglePrice) {
          case true:
            this.togglePrice = false;
            break;
          default:
            this.togglePrice = true;
            break;
        }
        this.filterSelect = 'price';
      } else {
        $('#evaluationBtn').addClass('active');
        $('#priceBtn').removeClass('active');
        switch (this.toggleEvaluation) {
          case true:
            this.toggleEvaluation = false;
            break;
          default:
            this.toggleEvaluation = true;
            break;
        }
        this.filterSelect = 'evaluation';
      }
      this.searchBtn();
    },
    searchBtn() {
      let priceFilter = '';
      let evaluationFilter = '';
      if (this.filterSelect === 'evaluation') {
        priceFilter = '';
        switch (this.toggleEvaluation) {
          case true:
            evaluationFilter = 'ASC';
            break;
          default:
            evaluationFilter = 'DESC';
            break;
        }
      } else if (this.filterSelect === 'price') {
        evaluationFilter = '';
        switch (this.togglePrice) {
          case true:
            priceFilter = 'ASC';
            break;
          default:
            priceFilter = 'DESC';
            break;
        }
      }
      const searchData = {
        country: this.regin,
        area: this.area,
        keyword: this.keywords,
        money: priceFilter,
        evaluation: evaluationFilter,
      };
      this.$emit('search', searchData);
    },
    resetBtn() {
      this.regin = '';
      this.area = '';
      this.keywords = '';
      this.filterSelect = '';
      $('#evaluationBtn').removeClass('active');
      $('#priceBtn').removeClass('active');
      this.searchBtn();
    },
  },
};
</script>
