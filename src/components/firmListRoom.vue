<template>
  <div>
    <form
      class="p-3 mb-3 bg-white border border-top-0"
      @submit.prevent="searchBtn"
    >
      <div class="form-row">
        <div class="form-group col-md-6 col-12 align-items-center">
          <div class="row align-items-center">
            <label class="col-lg-3 col-form-label" for="petType"
              >寵物類型</label
            >
            <div class="col-lg-9">
              <div class="form-check form-check-inline">
                <input
                  id="cat"
                  v-model="typeCat"
                  class="form-check-input"
                  type="checkbox"
                  value="cat"
                />
                <label class="form-check-label" for="cat">貓</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  id="bog"
                  v-model="typeDog"
                  class="form-check-input"
                  type="checkbox"
                  value="dog"
                />
                <label class="form-check-label" for="bog">狗</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  id="other"
                  v-model="typeOther"
                  class="form-check-input"
                  type="checkbox"
                  value="other"
                />
                <label class="form-check-label" for="other">其他</label>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group col-md-6 col-12 align-items-center">
          <div class="row">
            <label class="col-lg-3 col-form-label" for="petType"
              >條件篩選</label
            >
            <div class="col-lg-9">
              <div class="form-check form-check-inline">
                <button
                  id="price"
                  type="button"
                  class="mb-1 btn btn-outline-danger"
                  @click="filter()"
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
            </div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6 col-12">
          <div class="row">
            <label class="col-lg-3 col-form-label" for="petNum">寵物數量</label>
            <div class="col-lg-9">
              <select id="petNum" v-model="amount" class="form-control">
                <option value selected>請選擇</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">5以上</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-group col-md-6 col-12">
          <div class="row">
            <label class="col-lg-3 col-form-label" for="petWeight"
              >接受重量</label
            >
            <div class="col-lg-9">
              <select id="petWeight" v-model="size" class="form-control">
                <option value selected>請選擇</option>
                <option value="5">5以下</option>
                <option value="10">10以下</option>
                <option value="15">15以下</option>
                <option value="20">20以下</option>
                <option value="25">25以下</option>
                <option value="26">25以上</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6 col-12">
          <div class="form-group row">
            <label class="col-lg-3 col-form-label" for="petSize">期間</label>
            <div class="col-lg-9">
              <vc-date-picker
                v-model="range"
                mode="range"
                :disabled-dates="disabledDate"
              />
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
    <div v-if="roomList[0] != null" class="pt-4 mx-0 row">
      <div
        v-for="room in roomList"
        :key="room.roomseq"
        class="col-lg-4 col-md-6 mb-3"
      >
        <RoomCard :room="room" />
      </div>
    </div>
    <div
      v-if="roomList[0] == null"
      class="text-muted py-3 display-4 text-center"
    >
      <p>查無資料</p>
    </div>
  </div>
</template>

<script>
import RoomCard from '@/components/RoomCard.vue';

/* global $ */
export default {
  components: {RoomCard},
  props: ['roomList', 'disabledDate'],
  data() {
    return {
      range: {},
      size: '',
      amount: '',
      typeCat: false,
      typeDog: false,
      typeOther: false,
      togglePrice: false,
      filterSelect: '',
    };
  },
  methods: {
    filter() {
      $('#price').addClass('active');
      switch (this.togglePrice) {
        case true:
          this.togglePrice = false;
          this.filterSelect = 'DESC';
          break;
        default:
          this.togglePrice = true;
          this.filterSelect = 'ASC';
          break;
      }
      this.searchBtn();
    },
    searchBtn() {
      const searchData = {
        chk_cat: this.typeCat,
        chk_dog: this.typeDog,
        chk_other: this.typeOther,
        dates: '',
        datee: '',
        size: this.size,
        amount: this.amount,
        money: this.filterSelect,
      };
      if (this.range != null) {
        searchData.dates = new Date(this.range.start).toLocaleDateString();
        searchData.datee = new Date(this.range.end).toLocaleDateString();
      }
      this.$emit('search', searchData);
    },
    resetBtn() {
      $('#price').removeClass('active');
      this.range = null;
      this.size = '';
      this.filterSelect = '';
      this.amount = '';
      this.typeCat = false;
      this.typeDog = false;
      this.typeOther = false;
      this.togglePrice = false;
      this.searchBtn();
    },
  },
};
</script>
