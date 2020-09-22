<template>
  <div class="firmOrder pb-5">
    <div class="loader" v-show="load">
      <hash-loader class="custom-class" :color="'#FFDE47'" :loading="load" :size="70"></hash-loader>
    </div>
    <orderModal :who="who" :orderList="orderList" :orderDetail="orderDetail"></orderModal>
    <delOrderModal :who="who" :delData="orderDetail" @change-state="changeState"></delOrderModal>
    <firmEvaluateModal :evaluationData="evaluationList"></firmEvaluateModal>
    <div class="container">
      <form>
        <div class="row">
          <div class="col-lg-6 col-12 mb-3">
            <p>日期搜尋：</p>
            <div class="d-flex">
              <div class="w-75"><vc-date-picker mode="range" v-model="range" /></div>
              <div class="w-25"><button type="button" class="w-100 btn btn-outline-secondary" @click="reset">清除</button></div>
            </div>
          </div>
          <div class="col-lg-6 col-12 mb-3">
            <p>文字與單號搜尋：</p>
            <div class="input-group  mb-3 position-relative">
              <div class="position-absolute py-2 px-3" style="z-index:5">
                <i class="fas fa-search"></i>
              </div>
              <input
                type="text"
                class="form-control pl-5 rounded"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                v-model.trim="searchBox"
              />
              <div class="input-group-append w-25">
                <button
                  type="sunmit"
                  class="w-100 btn btn-outline-secondary"
                  id="button-addon2"
                  @click.prevent="search"
                >搜尋</button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <ul class="nav nav-tabs nav-fill text-center" id="myTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="whole-tab"
            data-toggle="tab"
            href="#whole"
            role="tab"
            aria-controls="whole"
            aria-selected="true"
            @click="changeState('all')"
          >全部</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="pay-tab"
            data-toggle="tab"
            href="#pay"
            role="tab"
            aria-controls="pay"
            aria-selected="false"
            @click="changeState('1')"
          >已付款</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="complete-tab"
            data-toggle="tab"
            href="#complete"
            role="tab"
            aria-controls="complete"
            aria-selected="false"
            @click="changeState('4')"
          >已完成</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="decline-tab"
            data-toggle="tab"
            href="#decline"
            role="tab"
            aria-controls="decline"
            aria-selected="false"
            @click="changeState('2')"
          >已取消</a>
        </li>
      </ul>
      <div class="bg-white text-nowrap tab-content border border-top-0" id="myTabContent">
        <div
          class="tab-pane p-3 fade show active"
          id="whole"
          role="tabpanel"
          aria-labelledby="whole-tab"
          v-if="!isLoading"
        >
          <order :orderList="orderList" @open-detail="openDetail" @open-evaluation="openEvaluation"></order>
          <page
            v-if="pagelist.total != 0"
            class="mt-3"
            :page-data="pagelist"
            @page-change="getData"
          ></page>
        </div>
        <div
          v-if="!isLoading"
          class="tab-pane p-3 fade"
          id="pay"
          role="tabpanel"
          aria-labelledby="pay-tab"
        >
          <order :orderList="orderList" @open-detail="openDetail" @open-evaluation="openEvaluation"></order>
          <page
            v-if="pagelist.total != 0"
            class="mt-3"
            :page-data="pagelist"
            @page-change="getData"
          ></page>
        </div>
        <div
          v-if="!isLoading"
          class="tab-pane p-3 fade"
          id="complete"
          role="tabpanel"
          aria-labelledby="complete-tab"
        >
          <order :orderList="orderList" @open-detail="openDetail" @open-evaluation="openEvaluation"></order>
          <page
            v-if="pagelist.total != 0"
            class="mt-3"
            :page-data="pagelist"
            @page-change="getData"
          ></page>
        </div>
        <div
          v-if="!isLoading"
          class="tab-pane p-3 fade"
          id="decline"
          role="tabpanel"
          aria-labelledby="decline-tab"
        >
          <order :orderList="orderList" @open-detail="openDetail" @open-evaluation="openEvaluation"></order>
          <page
            v-if="pagelist.total != 0"
            class="mt-3"
            :page-data="pagelist"
            @page-change="getData"
          ></page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import page from '@/components/page.vue'
import order from '@/components/orderList.vue'
import orderModal from '@/components/orderModal.vue'
import delOrderModal from '@/components/delOrderModal.vue'
import firmEvaluateModal from '@/components/firmEvaluateModal.vue'

export default {
  data () {
    return {
      who: 'firm',
      evaluationList: {},
      orderList: {},
      pagelist: {},
      state: null,
      orderDetail: {},
      isLoading: false,
      load: false,
      searchBox: '',
      range: {},
      searchDate: {}
    }
  },
  created () {
    this.getData()
    $('html, body').animate(
      {
        scrollTop: $('#app').offset().top
      },
      0
    )
  },
  components: {
    page,
    order,
    delOrderModal,
    firmEvaluateModal,
    orderModal
  },
  props: ['identify'],
  methods: {
    getData: function (page = 1) {
      $('#orderInfoModal').modal('hide')
      $('#cancelModal').modal('hide')
      this.$emit('checkStatus')
      this.isLoading = true
      this.$emit('loadAction', true)
      const vm = this
      var config = {
        method: 'get',
        url: `http://pettrip.rocket-coding.com/api/Order/Getorder?state=${this.state}&page=${page}&paged=6&roomname=${this.searchBox}&datetimes=${this.searchDate.start}&datetimee=${this.searchDate.end}`
      }
      this.$http(config)
        .then(function (response) {
          vm.orderList = response.data.order
          vm.pagelist = response.data.meta
          vm.isLoading = false
          vm.$emit('loadAction', false)
          setTimeout(() => {
            if (vm.identify.identity !== '廠商') {
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: '進入廠商後台失敗',
                showConfirmButton: false,
                timer: 2000
              })
              vm.$router.push('/')
            }
          }, 500)
        })
        .catch(function () {
          vm.isLoading = false
          vm.$emit('loadAction', false)
        })
    },
    search: function () {
      if (this.range !== null) {
        this.searchDate.start = new Date(this.range.start).toLocaleDateString()
        this.searchDate.end = new Date(this.range.end).toLocaleDateString()
      } else {
        this.searchDate.start = ''
        this.searchDate.end = ''
      }
      this.getData()
    },
    reset: function () {
      this.range = null
      this.search()
    },
    changeState: function (state) {
      if (state === 'all') {
        this.state = null
        this.getData(1)
      } else if (state === '1') {
        this.state = 1
        this.getData(1)
      } else if (state === '2') {
        this.state = 2
        this.getData(1)
      } else if (state === '4') {
        this.state = 4
        this.getData(1)
      }
    },
    openDetail: function (order) {
      this.load = true

      const vm = this
      const config = {
        method: 'get',
        url: `http://pettrip.rocket-coding.com/api/Order/Getorder?id=${order.orderseq}`
      }
      this.$http(config)
        .then(function (response) {
          vm.load = false
          vm.orderDetail = response.data
          $('#orderInfoModal').modal('show')
        })
        .catch(function () {
          vm.load = false
        })
    },
    openEvaluation: function (order) {
      this.load = true
      const vm = this
      const config = {
        method: 'get',
        url: `http://pettrip.rocket-coding.com/api/Evaluation/Get?id=${order.orderseq}`
      }
      this.$http(config)
        .then(function (response) {
          vm.load = false
          vm.evaluationList = response.data
          $('#evaluationModal').modal('show')
        })
        .catch(function () {
          vm.load = false
        })
    }
  }
}
</script>
