<template>
  <div
    class="modal fade"
    id="MemberEvaluationModal"
    tabindex="-1"
    aria-labelledby="evaluationModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content" v-if="dataList.company != null">
        <div class="modal-header bg-primary">
          <h5 class="modal-title" >評價</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="d-flex align-items-center mb-3">
            <div
                class="backgroundIMG rounded-circle mx-auto overflow-hidden"
                :style="{backgroundImage: 'url(' + dataList.company.avatar + ')'}"
                style="max-width: 120px;"
              >
                <img
                  src="https://upload.cc/i1/2020/09/01/IaZYfp.png"
                  :class="{opacityZero:dataList.company.avatar != ''}"
                  class="w-100 img-fluid"
                  alt
                />
              </div>            <div class="ml-3  w-100">
                <p class="mb-1">{{dataList.company.companybrand}}</p>
                <p class="mb-1"><small class="text-secondary">{{dataList.company.roomname}}</small></p>
                <p class="text-danger mb-0">$ {{dataList.company.amt | currencyStyle}} 元</p>
            </div>
          </div>
          <div class="text-center mb-3">
            <star-rating :read-only="dataList.state.btn_Evalution_readonly" :inline="true" v-model="dataList.evalution.star" :border-width="0" :rounded-corners="true" :star-size="40"></star-rating>
          </div>

          <div class="form-group">
            <label for="evauationText">評論</label>
            <textarea class="form-control" id="evauationText" rows="3" v-model="dataList.evalution.memo" :readonly="dataList.state.btn_Evalution_readonly"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">關閉</button>
          <button type="button" v-if="!dataList.state.btn_Evalution_readonly" class="d-flex align-items-center btn btn-primary" @click="setRating" :class="{disabled:load}" :disabled="load"><ring-loader class="custom-class" :color="'black'" :loading="load" :size="20"></ring-loader>評價</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default {
  data () {
    return {
      dataList: this.evaluationData,
      load: false
    }
  },
  name: 'memberEvaluateModal',
  props: ['evaluationData'],
  watch: {
    evaluationData: function (newVal, oldVal) {
      this.dataList = newVal
    }
  },
  methods: {
    setRating: function () {
      const vm = this
      vm.load = true
      const config = {
        method: 'post',
        url: 'http://pettrip.rocket-coding.com/api/Evaluation/Set',
        headers: {},
        data: {
          orderseq: this.dataList.company.orderseq,
          star: this.dataList.evalution.star,
          memo: this.dataList.evalution.memo
        }
      }
      this.$http(config)
        .then(function (response) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: '評價成功',
            showConfirmButton: false,
            timer: 2000
          })
          $('#MemberEvaluationModal').modal('hide')
          vm.$emit('refresh')
          vm.load = false
        })
        .catch(function (error) {
          vm.load = false
          console.log(error)
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '評價失敗',
            showConfirmButton: false,
            timer: 2000
          })
        })
    }
  }
}
</script>
