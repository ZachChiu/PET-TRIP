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
        v-for="firm in firmList"
        :key="firm.companyseq"
        class="col-12 col-sm-6 col-lg-6 "
      >
        <FirmCard :firm="firm" />
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
import FirmCard from '@/components/FirmCard.vue';

export default {
  components: {FirmCard},
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
