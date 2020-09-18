<template>
  <div class="pt-3">
    <div class="QA px-3" v-for="(data,index) in QA" :key="index">
      <div class="row no-gutters">
        <div class="col-12 col-sm-2 text-center">
          <p class="pt-3 mb-0">提問{{data.index}}</p>
        </div>
        <div class="col-12 col-sm-10">
          <div class="p-3">
            <p>
              {{data.name}}
              <small class="text-muted">({{data.question_date}})</small>
            </p>
            <p class="m-0">{{data.question}}</p>
          </div>
          <div v-if="data.answer != ''" class="bg-light border p-3">
            <p >廠商回覆：{{data.answer}}</p>
            <p class="m-0 text-right text-muted">
              <small>({{data.answer_date}})</small>
            </p>
          </div>
        </div>
      </div>
      <hr />
    </div>

    <form class="p-3" @submit.prevent="ask">
      <div class="form-group">
        <label class="h5" for="QA">提出問題</label>
        <textarea class="form-control" id="QA" rows="3" v-model.trim="msg"></textarea>
      </div>
      <div class="text-right">
        <button type="submit" class="btn btn-outline-success" :class="{disabled:loading}" :disabled="loading">
          <i v-if="loading" class="mr-1 fas fa-spinner fa-spin"></i>提問
        </button>
      </div>
    </form>
  </div>
</template>

<script>
/* global $ */
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
export default {
  data () {
    return {
      msg: '',
      loading: false
    }
  },
  name: 'roomQA',
  props: ['QA', 'identify', 'room'],
  methods: {
    ask: function () {
      const vm = this
      if (this.identify === '無授權') {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'info',
          title: '請先登入',
          showConfirmButton: false,
          timer: 2000
        })
      } else if (this.identify.identity === '廠商') {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'info',
          title: '廠商帳號不得留言',
          showConfirmButton: false,
          timer: 2000
        })
      } else if (this.msg === '') {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'info',
          title: '請輸入內容',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        this.loading = true
        const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)pet\s*=\s*([^;]*).*$)|^.*$/,
          '$1'
        )
        const config = {
          method: 'post',
          url: 'http://pettrip.rocket-coding.com/api/Qa/PostQuestion',
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {
            roomseq: this.room.roomseq,
            companyseq: this.room.companyseq,
            message: this.msg
          }
        }
        this.$http(config)
          .then(function (response) {
            console.log(response)
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: '成功提問',
              showConfirmButton: false,
              timer: 1500
            })
            vm.$emit('refresh')
            vm.msg = ''
            $('html, body').animate(
              {
                scrollTop: $('#roomCenter').offset().top
              },
              1000
            )
            vm.loading = false
          })
          .catch(function (error) {
            console.log(error)
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: '提問失敗',
              showConfirmButton: false,
              timer: 2000
            })
            vm.loading = false
          })
      }
    }
  }
}
</script>
