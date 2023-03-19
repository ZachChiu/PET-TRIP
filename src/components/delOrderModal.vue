<template>
  <div
    id="cancelModal"
    class="cancelModal modal fade"
    tabindex="-1"
    aria-labelledby="cancelModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div v-if="delData.order != null" class="modal-content">
        <div class="modal-header bg-danger">
          <h5 id="cancelModalLabel" class="modal-title text-white">取消訂單</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <ValidationObserver v-slot="{invalid}">
          <form action="#" @submit.prevent="delOrder">
            <div class=" modal-body  text-center">
              <p class="h5">確定要取消此筆訂單？</p>
              <p>
                訂單編號：
                <b>{{ delData.order.orderseq }}</b>
              </p>
              <div class="form-group text-left ">
                <ValidationProvider v-slot="{errors, classes}" rules="required">
                  <label class=" text-danger" for="reason">取消原因</label>
                  <select
                    v-if="who == 'firm'"
                    id="reason"
                    v-model="reason"
                    value
                    class="form-control"
                    :class="classes"
                  >
                    <option value disabled selected>請選擇</option>
                    <option value="檔期衝突">檔期衝突</option>
                    <option value="無法提供完善服務">無法提供完善服務</option>
                    <option value="已與買家協議取消訂單"
                      >已與買家協議取消訂單</option
                    >
                    <option value="平台功能不足">平台功能不足</option>
                    <option value="與買家溝通不良">與買家溝通不良</option>
                  </select>
                  <select
                    v-if="who == 'user'"
                    id="reason"
                    v-model="reason"
                    class="form-control"
                    :class="classes"
                  >
                    <option value disabled selected>請選擇</option>
                    <option value="找到更便宜的平台">找到更便宜的平台</option>
                    <option value="在此平台找到更適合我的空間"
                      >在此平台找到更適合我的空間</option
                    >
                    <option value="已與賣家協議取消訂單"
                      >已與賣家協議取消訂單</option
                    >
                    <option value="平台功能不足">平台功能不足</option>
                    <option value="與賣家溝通不良">與賣家溝通不良</option>
                  </select>
                  <small class="text-danger ">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="form-group text-left">
                <label for="memo">備註</label>
                <textarea
                  id="memo"
                  v-model="memo"
                  class="form-control"
                  rows="3"
                ></textarea>
              </div>
              <p class="text-left text-secondary">
                訂單只可於七天前取消，七天內不予受理。
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-danger"
                data-dismiss="modal"
              >
                關閉
              </button>
              <button
                type="submit"
                class="d-flex align-items-center btn btn-danger"
                :disabled="invalid || load"
                :class="{disabled: invalid || load}"
              >
                <ring-loader
                  class="custom-class"
                  :color="'black'"
                  :loading="load"
                  :size="20"
                ></ring-loader
                >取消訂單
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
export default {
  name: 'DelOrderModal',
  props: ['delData', 'who'],
  data() {
    return {
      reason: '',
      memo: '',
      load: false,
    };
  },
  methods: {
    delOrder() {
      const vm = this;
      vm.load = true;
      const config = {
        method: 'POST',
        url: 'http://pettrip.rocket-coding.com/api/Order/Cancelorder',
        data: {
          orderseq: `${this.delData.order.orderseq}`,
          reason: `${this.reason}`,
          memo: `${this.memo}`,
        },
      };
      this.$http(config)
        .then(function() {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: '取消成功',
            showConfirmButton: false,
            timer: 2000,
          });
          $('#decline-tab').click();
          vm.$emit('change-state', '2');
          $('.nav-tabs a[href="#decline"]').tab('show');
          vm.load = false;
        })
        .catch(function() {
          vm.load = false;
        });
    },
  },
};
</script>
