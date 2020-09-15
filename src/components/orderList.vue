<template>
  <div class="table-responsive-lg">
    <table class="table table-hover">
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
            <br><small>{{order.setdate}}</small>
          </th>
          <td>
            {{order.orderdates}} ~
            <br />
            {{order.orderdatee}}
          </td>
          <td>{{order.roomname}}</td>
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
            >評價</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  name: 'order',
  props: ['orderList'],
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
