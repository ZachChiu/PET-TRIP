<template>
  <div class="firmList">
    <div class="container py-3">
      <ul id="myTab" class="nav nav-tabs" role="tablist">
        <li class="nav-item w-50" role="presentation">
          <a
            id="firmLst-tab"
            class="nav-link active h4 mb-0"
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
            id="roomList-tab"
            class="nav-link h4 mb-0"
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
      <div id="myTabContent" class="tab-content">
        <div
          id="firmLst"
          class="tab-pane fade show active"
          role="tabpanel"
          aria-labelledby="firmLst-tab"
        >
          <firmListFirm
            :firm-list="firmList"
            @search="searchFirm"
          ></firmListFirm>
          <page
            v-if="firmList[0] != null"
            :page-data="firmPageObj"
            @page-change="getFirmData"
          ></page>
        </div>
        <div
          id="roomList"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="roomList-tab"
        >
          <firmListRoom
            :room-list="roomList"
            :disabled-date="disabledDate"
            @search="searchRoom"
          ></firmListRoom>
          <page
            v-if="roomList[0] != null"
            :page-data="roomPageObj"
            @page-change="getRoomData"
          ></page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import page from '@/components/page.vue';
import firmListFirm from '@/components/firmListFirm.vue';
import firmListRoom from '@/components/firmListRoom.vue';
import {scrollToTop} from '@/lib/scrollToTop.js';
export default {
  components: {page, firmListFirm, firmListRoom},
  data() {
    return {
      disabledDate: [],
      firmList: {},
      roomList: {},
      firmPageObj: {},
      roomPageObj: {},
      searchFirmConfig: {
        keyword: '',
        evaluation: '',
        money: '',
        area: '',
        country: '',
      },
      searchRoomConfig: {
        chk_cat: false,
        chk_other: false,
        chk_dog: false,
        amount: '',
        datee: '',
        dates: '',
        size: '',
        money: '',
      },
    };
  },
  created() {
    this.$emit('loadAction', true);
    this.getPageData();
  },
  methods: {
    async getPageData() {
      const vm = this;
      vm.$emit('loadAction', true);

      this.$http
        .all([
          this.$http('Room/GetRoom?page=1paged=6'),
          this.$http('Room/GetCompanys?page=1paged=6'),
        ])
        .then(function(results) {
          vm.firmList = results[1].data.companies;
          vm.firmPageObj = results[1].data.meta;
          vm.roomList = results[0].data.rooms;
          results[0].data.remove.forEach(function(item) {
            vm.disabledDate.push({
              start: item.orderdates,
              end: item.orderdatee,
            });
          });
          vm.roomPageObj = results[0].data.meta;
          vm.$emit('loadAction', false);
        });
    },
    async getFirmData(page = 1) {
      const vm = this;
      vm.$emit('loadAction', true);
      const config = {
        method: 'get',
        url: `Room/GetCompanys?page=${page}&paged=6&keyword=${this.searchFirmConfig.keyword}&money=${this.searchFirmConfig.money}&evaluation=${this.searchFirmConfig.evaluation}&country=${this.searchFirmConfig.country}&area=${this.searchFirmConfig.area}`,
      };
      this.$http(config)
        .then(function(response) {
          vm.firmList = response.data.companies;
          vm.firmPageObj = response.data.meta;
          vm.$emit('loadAction', false);
        })
        .catch(function() {
          vm.$emit('loadAction', false);
        });
    },
    async getRoomData(page = 1) {
      const vm = this;
      vm.$emit('loadAction', true);

      const config = {
        method: 'get',
        url: `Room/GetRoom?page=${page}&paged=6&chk_cat=${this.searchRoomConfig.chk_cat}&chk_dog=${this.searchRoomConfig.chk_dog}&chk_other=${this.searchRoomConfig.chk_other}&dates=${this.searchRoomConfig.dates}&datee=${this.searchRoomConfig.datee}&size=${this.searchRoomConfig.size}&amount=${this.searchRoomConfig.amount}&money=${this.searchRoomConfig.money}`,
      };
      this.$http(config)
        .then(function(response) {
          vm.roomList = response.data.rooms;
          vm.roomPageObj = response.data.meta;
          vm.$emit('loadAction', false);
          scrollToTop();
        })
        .catch(function() {
          vm.$emit('loadAction', false);
        });
    },
    searchFirm(data) {
      this.searchFirmConfig = data;
      this.getFirmData();
    },
    searchRoom(data) {
      this.searchRoomConfig = data;
      this.getRoomData();
    },
  },
};
</script>
