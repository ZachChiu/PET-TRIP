<template>
  <div class="firmQA">
    <div v-show="Load" class="loader">
      <hash-loader
        class="custom-class"
        :color="'#FFDE47'"
        :loading="Load"
        :size="70"
      ></hash-loader>
    </div>
    <QAModal
      :identify="identify"
      :q-a-detail="QADetail"
      @refresh="getData"
    ></QAModal>
    <ul id="myTab" class="nav nav-tabs nav-fill text-center" role="tablist">
      <li class="nav-item">
        <a
          id="whole-tab"
          class="nav-link active"
          data-toggle="tab"
          href="#whole"
          role="tab"
          aria-controls="whole"
          aria-selected="true"
          @click="changeState('all')"
          >全部</a
        >
      </li>
      <li class="nav-item">
        <a
          id="already-tab"
          class="nav-link"
          data-toggle="tab"
          href="#already"
          role="tab"
          aria-controls="already"
          aria-selected="false"
          @click="changeState('2')"
          >已回覆</a
        >
      </li>
      <li class="nav-item">
        <a
          id="yet-tab"
          class="nav-link"
          data-toggle="tab"
          href="#yet"
          role="tab"
          aria-controls="yet"
          aria-selected="false"
          @click="changeState('1')"
          >未回覆</a
        >
      </li>
    </ul>
    <div
      id="myTabContent"
      class="bg-white text-nowrap tab-content border border-top-0"
    >
      <div
        v-if="!isLoading"
        id="whole"
        class="tab-pane px-3 py-5 fade show active"
        role="tabpanel"
        aria-labelledby="whole-tab"
      >
        <QAList :q-a-data="QAData" @open-detail="openDetail"></QAList>
        <page
          v-if="pagelist.total != 0"
          class="mt-3"
          :page-data="pagelist"
          @page-change="getData"
        ></page>
      </div>
      <div
        v-if="!isLoading"
        id="already"
        class="tab-pane p-3 fade"
        role="tabpanel"
        aria-labelledby="already-tab"
      >
        <QAList :q-a-data="QAData" @open-detail="openDetail"></QAList>
        <page
          v-if="pagelist.total != 0"
          class="mt-3"
          :page-data="pagelist"
          @page-change="getData"
        ></page>
      </div>
      <div
        v-if="!isLoading"
        id="yet"
        class="tab-pane p-3 fade"
        role="tabpanel"
        aria-labelledby="yet-tab"
      >
        <QAList :q-a-data="QAData" @open-detail="openDetail"></QAList>
        <page
          v-if="pagelist.total != 0"
          class="mt-3"
          :page-data="pagelist"
          @page-change="getData"
        ></page>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import page from '@/components/page.vue';
import QAList from '@/components/QAList.vue';
import QAModal from '@/components/QAModal.vue';

export default {
  components: {page, QAList, QAModal},
  props: ['identify'],
  data() {
    return {
      isLoading: false,
      Load: false,
      pagelist: {},
      QAData: {},
      QADetail: {},
      state: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData(page = 1) {
      this.$emit('checkStatus');
      const vm = this;
      this.isLoading = true;
      this.$emit('loadAction', true);
      const config = {
        method: 'get',
        url: `Qa/GetQuestion?page=${page}&state=${this.state}`,
      };
      this.$http(config)
        .then(function(response) {
          vm.QAData = response.data.question;
          vm.pagelist = response.data.meta;
          vm.isLoading = false;
          vm.$emit('loadAction', false);

          setTimeout(() => {
            if (vm.identify.identity !== '廠商') {
              vm.Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: '進入廠商後台失敗',
                showConfirmButton: false,
                timer: 2000,
              });
              vm.$router.push('/');
            }
          }, 500);
        })
        .catch(function() {
          vm.$emit('loadAction', false);

          vm.isLoading = false;
        });
    },
    changeState(data) {
      if (data === 'all') {
        this.state = null;
        this.getData(1);
      } else if (data === '1') {
        this.state = '1';
        this.getData(1);
      } else if (data === '2') {
        this.state = '2';
        this.getData(1);
      }
    },
    openDetail(QA) {
      this.Load = true;
      const vm = this;
      const config = {
        method: 'get',
        url: `Qa/GetQuestionDetail?queseq=${QA.queseq}`,
      };

      this.$http(config)
        .then(function(response) {
          vm.Load = false;
          vm.QADetail = response.data;
          $('#QAModal').modal('show');
        })
        .catch(function() {
          vm.Load = false;
        });
    },
  },
};
</script>
