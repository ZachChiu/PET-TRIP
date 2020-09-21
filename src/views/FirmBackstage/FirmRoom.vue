<template>
  <div class="firmRoom py-2">
    <delModal :temData="temData" @get-data="getData"></delModal>
    <roomModal ref="roomModal" :modalStatus="modalStatus" :temData="temData" @get-data="getData"></roomModal>
    <div class="container">
      <div class="row no-gutters overflow-hidden position-relative">
        <div class="col-12 mx-auto py-5 position-relative">
          <button
            type="button"
            class="addRoomBtn btn btn-primary position-absolute"
            @click="openModal('new')"
          >新增空間</button>
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
                <tr v-for="(item,index) in roomList" :key="index">
                  <th scope="row">{{item.roomname}}</th>
                  <td>
                    <span v-if="item.pettype_cat">貓</span>
                    <span v-if="item.pettype_cat && item.pettype_dog ">、</span>
                    <span v-if="item.pettype_dog">狗</span>
                    <span v-if="item.pettype_dog && item.pettype_other ">、</span>
                    <span v-if="item.pettype_cat && !item.pettype_dog && item.pettype_other ">、</span>
                    <span v-if="item.pettype_other">貓</span>
                  </td>
                  <td>
                    <div class="custom-control custom-switch">
                      <input
                        class="custom-control-input"
                        type="checkbox"
                        :id="index"
                        :checked="item.state"
                        @change="toggleStatus(item)"
                      />
                      <label class="custom-control-label" :for="index">
                        <span v-if="item.state">已上架</span>
                        <span class="text-danger" v-if="!item.state">未上架</span>
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="openModal('edit',item)"
                      >編輯</button>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        @click="openDelModal(item)"
                      >刪除</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.addRoomBtn {
  top: 0;
  right: 0;
}
</style>

<script>
/* global $ */
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import roomModal from '@/components/roomModal.vue'
import delModal from '@/components/delRoomModal.vue'

export default {
  data () {
    return {
      roomList: {},
      temData: {},
      modalStatus: 'new',
      load: {
        imgLoad1: false,
        imgLoad2: false,
        imgLoad3: false,
        imgLoad4: false
      }
    }
  },
  created () {
    this.getData()
  },
  props: ['identify'],
  components: {
    roomModal,
    delModal
  },
  methods: {
    getData: function () {
      this.$emit('checkStatus')
      const vm = this
      this.$emit('loadAction', true)
      const config = {
        method: 'get',
        url: 'http://pettrip.rocket-coding.com/api/Room/GetRooms'
      }
      this.$http(config)
        .then(function (response) {
          vm.roomList = response.data.room
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
          $('html, body').animate(
            {
              scrollTop: $('.headerNav').offset().top
            },
            0
          )
        })
        .catch(function () {
          vm.$emit('loadAction', false)
        })
    },
    openDelModal: function (item) {
      $('#delModal').modal('show')
      this.temData = item
    },
    openModal: function (item, data) {
      const vm = this
      if (item === 'new') {
        this.modalStatus = 'new'
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
          img4: ''
        }
        $('#editModal').modal('show')
      } else if (item === 'edit') {
        this.modalStatus = 'edit'
        this.$emit('loadAction', true)
        const config = {
          method: 'get',
          url: `http://pettrip.rocket-coding.com/api/Room/GetRooms?id=${data.roomseq}`
        }
        this.$http(config)
          .then(function (response) {
            vm.temData = response.data
            $('#editModal').modal('show')
            vm.$emit('loadAction', false)
          })
          .catch(function () {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: '開啟失敗',
              showConfirmButton: false,
              timer: 2000
            })
            vm.$emit('loadAction', false)
          })
      }
    },
    toggleStatus: function (item) {
      const vm = this
      this.$emit('loadAction', true)
      const config = {
        method: 'post',
        url: `http://pettrip.rocket-coding.com/api/Room/StateUpdate?id=${item.roomseq}`
      }
      this.$http(config)
        .then(function (response) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: '修改成功',
            showConfirmButton: false,
            timer: 2000
          })
          vm.getData()
        })
        .catch(function () {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '修改失敗',
            showConfirmButton: false,
            timer: 2000
          })
          vm.$emit('loadAction', false)
        })
    }
  }
}
</script>
