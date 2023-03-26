<template>
  <div class="firmRoom py-2">
    <delModal :tem-data="temData" @get-data="getData"></delModal>
    <roomModal
      ref="roomModal"
      :modal-status="modalStatus"
      :tem-data="temData"
      @get-data="getData"
    ></roomModal>
    <div class="container">
      <div class="row no-gutters overflow-hidden position-relative">
        <div class="col-12 mx-auto py-5 position-relative">
          <form>
            <div class="input-group mb-3 position-relative">
              <div class="position-absolute py-2 px-3" style="z-index:10">
                <i class="fas fa-search"></i>
              </div>
              <input
                v-model.trim="searchBox"
                type="text"
                class="form-control pl-5"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <div class="input-group-append">
                <button
                  id="button-addon2"
                  type="sunmit"
                  class="btn btn-outline-secondary"
                  @click.prevent="getData"
                >
                  搜尋
                </button>
              </div>
            </div>
          </form>

          <button
            type="button"
            class="addRoomBtn btn btn-primary position-absolute"
            @click="openModal('new')"
          >
            新增空間
          </button>
          <div class="table-responsive-xl">
            <table class="table text-nowrap border rounded table-hover">
              <thead class="thead-light">
                <tr>
                  <th scope="col">空間名稱</th>
                  <th scope="col">寵物類型</th>
                  <th scope="col">狀態</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="(item, index) in roomList" :key="index">
                  <th scope="row">
                    <router-link
                      class="linkColor font-weight-normal"
                      target="_blank"
                      :to="`/FirmPage/${item.companyseq}/Room/${item.roomseq}`"
                      >{{ item.roomname }}</router-link
                    >
                  </th>
                  <td>
                    <span v-if="item.pettype_cat">貓</span>
                    <span v-if="item.pettype_cat && item.pettype_dog">、</span>
                    <span v-if="item.pettype_dog">狗</span>
                    <span v-if="item.pettype_dog && item.pettype_other"
                      >、</span
                    >
                    <span
                      v-if="
                        item.pettype_cat &&
                          !item.pettype_dog &&
                          item.pettype_other
                      "
                      >、</span
                    >
                    <span v-if="item.pettype_other">其他</span>
                  </td>
                  <td>
                    <div class="custom-control custom-switch">
                      <input
                        :id="index"
                        class="custom-control-input"
                        type="checkbox"
                        :checked="item.state"
                        @change="toggleStatus(item)"
                      />
                      <label class="custom-control-label" :for="index">
                        <span v-if="item.state">已上架</span>
                        <span v-if="!item.state" class="text-danger"
                          >未上架</span
                        >
                      </label>
                    </div>
                  </td>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        class="btn btn-outline-primary"
                        @click="openModal('edit', item)"
                      >
                        編輯
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="copy(item)"
                      >
                        複製
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        @click="openDelModal(item)"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-if="roomList[0] == null" class="text-center h3 text-muted">
            查無資料
          </p>
        </div>
      </div>
      <page
        v-if="pagelist.total != 0"
        class="mt-3"
        :page-data="pagelist"
        @page-change="getData"
      ></page>
    </div>
  </div>
</template>

<script>
/* global $ */
import roomModal from '@/components/roomModal.vue';
import delModal from '@/components/delRoomModal.vue';
import page from '@/components/page.vue';

export default {
  components: {
    roomModal,
    delModal,
    page,
  },
  props: ['identify'],
  data() {
    return {
      roomList: {},
      temData: {},
      modalStatus: 'new',
      load: {
        imgLoad1: false,
        imgLoad2: false,
        imgLoad3: false,
        imgLoad4: false,
      },
      pagelist: {},
      searchBox: '',
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData(page = 1) {
      this.$emit('checkStatus');
      const vm = this;
      this.$emit('loadAction', true);
      const config = {
        method: 'get',
        url: `http://pettrip.rocket-coding.com/api/Room/GetRooms?page=${page}&roomname=${this.searchBox}`,
      };
      this.$http(config)
        .then(function(response) {
          vm.roomList = response.data.room;
          vm.pagelist = response.data.meta;
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
        });
    },
    openDelModal(item) {
      $('#delModal').modal('show');
      this.temData = item;
    },
    copy(item) {
      const vm = this;
      this.$emit('loadAction', true);
      const config = {
        method: 'post',
        url: ` http://pettrip.rocket-coding.com/api/Room/Clone?id=${item.roomseq}`,
      };

      this.$http(config)
        .then(function() {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: '複製成功',
            showConfirmButton: false,
            timer: 2000,
          });
          vm.getData(vm.pagelist.total_page);
        })
        .catch(function() {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '複製失敗',
            showConfirmButton: false,
            timer: 2000,
          });
          vm.$emit('loadAction', false);
        });
    },
    openModal(item, data) {
      const vm = this;
      if (item === 'new') {
        this.modalStatus = 'new';
        this.temData = {
          roomseq: '',
          roomname: '',
          introduce: '',
          pettype_cat: false,
          pettype_dog: false,
          pettype_other: false,
          petsizes: '',
          petsizee: '',
          roomamount: '',
          roomprice: '',
          roomamount_amt: '',
          walk: '',
          canned: '',
          feed: '',
          catlitter: '',
          visit: '0',
          medicine_infeed: false,
          medicine_infeed_amt: '',
          medicine_pill: false,
          medicine_pill_amt: '',
          medicine_paste: false,
          medicine_paste_amt: '',
          bath: false,
          bath_amt: '',
          hair: false,
          hair_amt: '',
          nails: false,
          nails_amt: '',
          img1: '',
          img2: '',
          img3: '',
          img4: '',
        };
        $('#editModal').modal('show');
      } else if (item === 'edit') {
        this.modalStatus = 'edit';
        this.$emit('loadAction', true);
        const config = {
          method: 'get',
          url: `http://pettrip.rocket-coding.com/api/Room/GetRooms?id=${data.roomseq}`,
        };
        this.$http(config)
          .then(function(response) {
            vm.temData = response.data;
            $('#editModal').modal('show');
            vm.$emit('loadAction', false);
          })
          .catch(function() {
            vm.Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: '開啟失敗',
              showConfirmButton: false,
              timer: 2000,
            });
            vm.$emit('loadAction', false);
          });
      }
    },
    toggleStatus(item) {
      const vm = this;
      this.$emit('loadAction', true);
      const config = {
        method: 'post',
        url: `http://pettrip.rocket-coding.com/api/Room/StateUpdate?id=${item.roomseq}`,
      };
      this.$http(config)
        .then(function() {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: '修改成功',
            showConfirmButton: false,
            timer: 2000,
          });
          vm.getData(vm.pagelist.current_page);
        })
        .catch(function() {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '修改失敗',
            showConfirmButton: false,
            timer: 2000,
          });
          vm.$emit('loadAction', false);
        });
    },
  },
};
</script>
