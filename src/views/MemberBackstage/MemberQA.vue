<template>
  <div class="memberQA">
    <loading :active.sync="isLoading" loader="bars"></loading>
    <QAModal :identify="identify" :QADetail="QADetail" @change-state="changeState"></QAModal>
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
          id="already-tab"
          data-toggle="tab"
          href="#already"
          role="tab"
          aria-controls="already"
          aria-selected="false"
          @click="changeState('2')"
        >已回覆</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="yet-tab"
          data-toggle="tab"
          href="#yet"
          role="tab"
          aria-controls="yet"
          aria-selected="false"
          @click="changeState('1')"
        >未回覆</a>
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
        <QAList @open-detail="openDetail" :QAData="QAData"></QAList>
        <page v-if="pagelist.total != 0" class="mt-3" :page-data="pagelist" @page-change="getData"></page>
      </div>
      <div
        v-if="!isLoading"
        class="tab-pane p-3 fade"
        id="already"
        role="tabpanel"
        aria-labelledby="already-tab"
      >
        <QAList @open-detail="openDetail" :QAData="QAData"></QAList>
        <page v-if="pagelist.total != 0" class="mt-3" :page-data="pagelist" @page-change="getData"></page>
      </div>
      <div
        v-if="!isLoading"
        class="tab-pane p-3 fade"
        id="yet"
        role="tabpanel"
        aria-labelledby="yet-tab"
      >
        <QAList @open-detail="openDetail" :QAData="QAData"></QAList>
        <page v-if="pagelist.total != 0" class="mt-3" :page-data="pagelist" @page-change="getData"></page>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import page from '@/components/page.vue'
import QAList from '@/components/QAList.vue'
import QAModal from '@/components/QAModal.vue'

export default {
  data () {
    return {
      isLoading: false,
      pagelist: {},
      QAData: {},
      QADetail: {},
      state: null
    }
  },
  components: { loading: VueLoading, page, QAList, QAModal },
  props: ['identify'],
  created () {
    this.getData()
  },
  methods: {
    getData: function (page = 1) {
      this.$emit('checkStatus')
      const vm = this
      this.isLoading = true
      const config = {
        method: 'get',
        url: `http://pettrip.rocket-coding.com/api/Qa/GetQuestion?page=${page}&state=${this.state}`
      }
      console.log(config)
      this.$http(config)
        .then(function (response) {
          vm.QAData = response.data.question
          vm.pagelist = response.data.meta
          vm.isLoading = false
          if (vm.identify.identity !== '會員') {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: '進入會員後台失敗',
              showConfirmButton: false,
              timer: 2000
            })
            vm.$router.push('/')
          }
          $('html, body').animate(
            {
              scrollTop: $('.headerNav').offset().top
            },
            10
          )
        })
        .catch(function () {
          vm.isLoading = false
        })
    },
    changeState: function (data) {
      if (data === 'all') {
        this.state = null
        this.getData(1)
      } else if (data === '1') {
        this.state = '1'
        this.getData(1)
      } else if (data === '2') {
        this.state = '2'
        this.getData(1)
      }
    },
    openDetail: function (QA) {
      const vm = this
      const config = {
        method: 'get',
        url: `http://pettrip.rocket-coding.com/api/Qa/GetQuestionDetail?queseq=${QA.queseq}`
      }

      this.$http(config)
        .then(function (response) {
          vm.QADetail = response.data
          $('#QAModal').modal('show')
        })
        .catch(function () {})
    }
  }
}
</script>
