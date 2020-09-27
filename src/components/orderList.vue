<template>
  <div class="table-responsive-lg">
    <table v-if="orderList[0] != null" class="table table-hover">
      <thead class="thead-light">
        <tr>
          <th scope="col">訂單編號</th>
          <th scope="col">日期</th>
          <th scope="col">空間</th>
          <th scope="col">狀態</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order,index) in orderList" :key="index">
          <th scope="row">{{order.orderseq}}
            <br><small class="text-muted">{{order.setdate}}</small>
          </th>
          <td>{{order.orderdates}} ~
            <br />
            {{order.orderdatee}}
          </td>
          <td><span class="d-inline-block text-truncate" style="max-width: 150px;">
            <router-link class="linkColor" target="_blank" :to="`/FirmPage/${order.companyseq}/Room/${order.roomseq}`">{{order.roomname}}</router-link>
</span></td>
          <td>
            <span v-if="order.state == 1">已付款</span>
            <span v-if="order.state == 2">已取消</span>
            <span v-if="order.state == 3">已退款</span>
            <span v-if="order.state == 4">已完成</span>
            <br>
            <small class="text-danger" v-if="order.canceldate != '0001-01-01 00:00'">{{order.canceldate}}</small>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              @click="openDetail(order)"
            >詳情</button>
            <button
              type="button"
              class="btn btn-danger ml-2"
              data-toggle="modal" v-if="order.btn_Evalution"
              @click="openEvaluation(order)"
            ><span v-if="!order.btn_Evalution_readonly">已評價</span><span v-if="order.btn_Evalution_readonly">未評價</span> </button>
          </td>
        </tr>
      </tbody>
    </table>
        <p v-if="orderList[0] == null" class="h1 text-center text-muted">暫無資料</p>

  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  name: 'order',
  props: ['orderList', 'identify'],
  methods: {
    openDetail: function (order) {
      this.$emit('open-detail', order)
    },
    openEvaluation: function (order) {
      this.$emit('open-evaluation', order)
    }
  }
}
</script>
