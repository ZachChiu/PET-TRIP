<template>
  <div class="firmList bg-light">
    <div class="banner position-relative">
      <div class="bannerText position-absolute text-dark display-4 font-weight-bold">尋找寄宿</div>
      <img
        class="img-fluid"
        src="https://upload.cc/i1/2020/09/02/JE5b96.png"
        style="height: 200px;object-fit: cover; width: 100%;"
        alt
      />
    </div>

    <div class="container py-3">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item w-50" role="presentation">
          <a
            class="nav-link active h4 mb-0"
            id="firmLst-tab"
            data-toggle="tab"
            href="#firmLst"
            role="tab"
            aria-controls="firmLst"
            aria-selected="true"
          >
            <i class="mr-1 fas fa-tags"></i>廠商列表
          </a>
        </li>
        <li class="nav-item w-50" role="presentation">
          <a
            class="nav-link h4 mb-0"
            id="roomList-tab"
            data-toggle="tab"
            href="#roomList"
            role="tab"
            aria-controls="roomList"
            aria-selected="false"
          >
            <i class="mr-1 fas fa-tags"></i>房間列表
          </a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="firmLst"
          role="tabpanel"
          aria-labelledby="firmLst-tab"
        >
          <firmListFirm :firmList="firmList" @search="searchFirm"></firmListFirm>
          <page v-if="firmList[0] != null" :page-data="firmPagelist" @page-change="getFirmData"></page>
        </div>
        <div class="tab-pane fade" id="roomList" role="tabpanel" aria-labelledby="roomList-tab">
          <firmListRoom :roomList="roomList" :disabledDate="disabledDate" @search="searchRoom"></firmListRoom>
          <page v-if="roomList[0] != null" :page-data="roomPagelist" @page-change="getRoomData"></page>
        </div>
      </div>
    </div>
    <div class="container py-5"></div>
  </div>
</template>

<script>
/* global $ */
import page from '@/components/page.vue'
import firmListFirm from '@/components/firmListFirm.vue'
import firmListRoom from '@/components/firmListRoom.vue'

export default {
  data () {
    return {
      disabledDate: [],
      firmList: {},
      roomList: {},
      firmPagelist: {},
      roomPagelist: {},
      searchFirmConfig: {
        keyword: '',
        evaluation: '',
        money: '',
        area: '',
        country: ''
      },
      searchRoomConfig: {
        chk_cat: false,
        chk_other: false,
        chk_dog: false,
        amount: '',
        datee: '',
        dates: '',
        size: '',
        money: ''
      }
    }
  },
  created () {
    const vm = this
    vm.$emit('loadAction', true)

    this.$http
      .all([
        this.$http(
          'http://pettrip.rocket-coding.com/api/Room/GetRoom?page=1paged=6'
        ),
        this.$http(
          'http://pettrip.rocket-coding.com/api/Room/GetCompanys?page=1paged=6'
        )
      ])
      .then(function (results) {
        vm.firmList = results[1].data.companies
        vm.firmPagelist = results[1].data.meta
        vm.roomList = results[0].data.rooms
        results[0].data.remove.forEach(function (item) {
          vm.disabledDate.push({
            start: item.orderdates,
            end: item.orderdatee
          })
        })
        vm.roomPagelist = results[0].data.meta
        vm.$emit('loadAction', false)
      })
  },
  components: { page, firmListFirm, firmListRoom },
  methods: {
    getFirmData: function (page = 1) {
      const vm = this
      vm.$emit('loadAction', true)
      const config = {
        method: 'get',
        url: `http://pettrip.rocket-coding.com/api/Room/GetCompanys?page=${page}&paged=6&keyword=${this.searchFirmConfig.keyword}&money=${this.searchFirmConfig.money}&evaluation=${this.searchFirmConfig.evaluation}&country=${this.searchFirmConfig.country}&area=${this.searchFirmConfig.area}`
      }
      this.$http(config)
        .then(function (response) {
          vm.firmList = response.data.companies
          vm.firmPagelist = response.data.meta
          vm.$emit('loadAction', false)
        })
        .catch(function () {
          vm.$emit('loadAction', false)
        })
    },
    searchFirm: function (data) {
      this.searchFirmConfig = data
      this.getFirmData()
    },
    searchRoom: function (data) {
      this.searchRoomConfig = data
      this.getRoomData()
    },
    getRoomData: function (page = 1) {
      const vm = this
      vm.$emit('loadAction', true)

      const config = {
        method: 'get',
        url: `http://pettrip.rocket-coding.com/api/Room/GetRoom?page=${page}&paged=6&chk_cat=${this.searchRoomConfig.chk_cat}&chk_dog=${this.searchRoomConfig.chk_dog}&chk_other=${this.searchRoomConfig.chk_other}&dates=${this.searchRoomConfig.dates}&datee=${this.searchRoomConfig.datee}&size=${this.searchRoomConfig.size}&amount=${this.searchRoomConfig.amount}&money=${this.searchRoomConfig.money}`
      }
      this.$http(config)
        .then(function (response) {
          vm.roomList = response.data.rooms
          vm.roomPagelist = response.data.meta
          vm.$emit('loadAction', false)
          $('html, body').animate(
            {
              scrollTop: $('#app').offset().top
            },
            0
          )
        })
        .catch(function () {
          vm.$emit('loadAction', false)
        })
    }
  }
}
</script>
