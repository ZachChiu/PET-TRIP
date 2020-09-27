<template>
 <div
      class="orderInfoModal modal fade"
      id="orderInfoModal"
      tabindex="-1"
      aria-labelledby="orderInfoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" >
        <div class="modal-content" v-if="orderDetail.order != null">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-white" id="orderInfoModalLabel">訂單資訊</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>訂單時間：{{orderDetail.order.setdate}}</p>
            <p>訂單編號：{{orderDetail.order.orderseq}}</p>
            <p>狀態： <span class="font-weight-bold text-success" v-if="orderDetail.order.state == 1">已付款</span>
            <span class="font-weight-bold text-danger" v-if="orderDetail.order.state == 2"><span class="mr-2">{{orderDetail.order.canceldate}}</span>已取消</span>
            <span class="font-weight-bold " v-if="orderDetail.order.state == 3">已退款</span>
            <span class="font-weight-bold" v-if="orderDetail.order.state == 4">已完成</span></p>
            <p v-if="who == 'user'">廠商名稱：{{orderDetail.order.companyname}}</p>
            <p>空間名稱：{{orderDetail.order.roomname}}</p>
            <p>預定日期：{{orderDetail.order.orderdates}}~{{orderDetail.order.orderdatee}}</p>
            <p>房間總價：${{orderDetail.order.roomamt | currencyStyle}}</p>
            <hr />
            <p>訂購者：{{orderDetail.detail.name}}</p>
            <p>電話：{{orderDetail.detail.tel}}</p>
            <p>數量：{{orderDetail.detail.petamount}}隻</p>
            <p>寵物品種：{{orderDetail.detail.pettype}}</p>
            <p>寵物重量：{{orderDetail.detail.petsize}}公斤</p>
            <p>餵藥服務：
              <span class="mr-2" v-if="orderDetail.detail.medicine.medicine_infeed">飼料內(${{orderDetail.detail.medicine.medicine_infeed_amt * orderDetail.detail.petamount | currencyStyle}})</span>
              <span class="mr-2" v-if="orderDetail.detail.medicine.medicine_paste">外用藥(${{orderDetail.detail.medicine.medicine_paste_amt * orderDetail.detail.petamount | currencyStyle}})</span>
              <span class="mr-2" v-if="orderDetail.detail.medicine.medicine_pill">藥丸(${{orderDetail.detail.medicine.medicine_pill_amt * orderDetail.detail.petamount | currencyStyle}})</span>
            </p>
            <p>加購服務：
              <span class="mr-2" v-if="orderDetail.detail.plus.bath">洗澡(${{orderDetail.detail.plus.bath_amt * orderDetail.detail.petamount | currencyStyle}})</span>
              <span class="mr-2" v-if="orderDetail.detail.plus.hair">洗毛(${{orderDetail.detail.plus.hair_amt * orderDetail.detail.petamount | currencyStyle}})</span>
              <span class="mr-2" v-if="orderDetail.detail.plus.nails">剪指甲(${{orderDetail.detail.plus.nails_amt * orderDetail.detail.petamount | currencyStyle}})</span>
            </p>
            <p v-if="who == 'user'">地址：{{orderDetail.order.country}}{{orderDetail.order.area}}{{orderDetail.order.address}}</p>
            <p>備註：{{orderDetail.detail.memo}}</p>
            <p class="text-right h5 text-danger my-3">訂單總額：共 $ {{orderDetail.detail.orderprice | currencyStyle}}元</p>
            <p class="text-right text-secondary">訂單只可於七天前取消，七天內不予受理。</p>
            <div v-if="orderDetail.cancel.reason != null" class="cancel">
             <hr />
              <p class="text-danger h5">取消原因：{{orderDetail.cancel.reason}}</p>
              <p class="h5" v-if="orderDetail.cancel.memo != null">原因描述：{{orderDetail.cancel.memo}}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" id="openBtn" @click="cancelOrder" v-if="orderDetail.detail.btn_cancel">取消訂單</button>
            <button type="button" class="btn btn-dark" data-dismiss="modal">關閉</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
/* global $ */
export default {
  data () {
    return {
      order: {}
    }
  },
  name: 'orderModal',
  props: ['orderDetail', 'who'],
  created () {
  },
  methods: {
    cancelOrder: function () {
      $('#cancelModal').modal('show')
      $('#orderInfoModal').modal('hide')
    }
  }
}
</script>
