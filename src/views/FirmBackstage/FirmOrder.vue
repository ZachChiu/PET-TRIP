<template>
  <div class="firmOrder py-5">
    <loading :active.sync="isLoading" loader="bars"></loading>
    <div
      class="orderInfoModal modal fade"
      id="orderInfoModal"
      tabindex="-1"
      aria-labelledby="orderInfoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-white" id="orderInfoModalLabel">訂單資訊</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>訂單編號：AAAA000013132</p>
            <p>狀態：已付款</p>
            <p>空間名稱：喵喵毛毛屋A01</p>
            <p>預定日期：2020/09/04~2020/09~06</p>
            <p>寄宿總價：$3,400</p>
            <hr />
            <p>訂購者：邱廷鈺</p>
            <p>電話：0900000000</p>
            <p>數量：2隻</p>
            <p>寵物品種：米克斯</p>
            <p>餵藥服務：飼料內($200)</p>
            <p>加購服務：洗澡($200)</p>
            <p>備註：我家貓咪會打呼</p>
            <hr />
            <p class="text-right h5 text-danger my-3">訂單總額：共 $ 3,800 元</p>
            <p class="text-secondary">如欲取消訂單，請先與買家取得共識，如為單方面取消訂單，將無法取消。</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" id="openBtn">取消訂單</button>
            <button type="button" class="btn btn-dark" data-dismiss="modal">關閉</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="cancelModal modal fade"
      id="cancelModal"
      tabindex="-1"
      aria-labelledby="cancelModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title text-white" id="cancelModalLabel">取消訂單</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="text-center modal-body">
            <p>確定要取消此筆訂單？</p>
            <p>訂單編號：AAAA000013132</p>
            <div class="form-group">
              <label class="h5 text-danger" for="reason">取消原因</label>
              <select class="form-control" name id="reason">
                <option value disabled selected>請選擇</option>
                <option value="檔期衝突">檔期衝突</option>
                <option value="無法提供完善服務">無法提供完善服務</option>
                <option value="與買家協議">已與買家協議取消訂單</option>
                <option value="平台功能不足">平台功能不足</option>
                <option value="與買家溝通不良">與買家溝通不良</option>
              </select>
            </div>
            <p class="text-left text-secondary">如欲取消訂單，請先與買家取得共識，如為單方面取消訂單，將無法取消。</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger" data-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-danger">取消訂單</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
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
            @click="changeState('0')"
          >全部</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="pay-tab"
            data-toggle="tab"
            href="#pay"
            role="tab"
            aria-controls="pay"
            aria-selected="false"
            @click="changeState('0')"
          >已付款</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="complete-tab"
            data-toggle="tab"
            href="#complete"
            role="tab"
            aria-controls="complete"
            aria-selected="false"
            @click="changeState('3')"
          >已完成</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="decline-tab"
            data-toggle="tab"
            href="#decline"
            role="tab"
            aria-controls="decline"
            aria-selected="false"
            @click="changeState('1')"
          >已取消</a>
        </li>
      </ul>
      <div class="bg-white text-nowrap tab-content border border-top-0" id="myTabContent">
        <div
          class="tab-pane p-3 fade show active"
          id="whole"
          role="tabpanel"
          aria-labelledby="whole-tab"
        >
          <div class="table-responsive-md">
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
                  <th scope="row">{{order.orderseq}}</th>
                  <td>
                    {{order.orderdates}} ~
                    <br />
                    {{order.orderdatee}}
                  </td>
                  <td>{{order.roomname}}</td>
                  <td>
                    <span v-if="order.state == 0">已付款</span>
                    <span v-if="order.state == 1">已取消</span>
                    <span v-if="order.state == 2">已退款</span>
                    <span v-if="order.state == 3">已完成</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#orderInfoModal"
                    >詳情</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <page v-if="pagelist.total != 0" class="mt-3" :page-data="pagelist" @page-change="getData"></page>
          </div>
        </div>
        <div class="tab-pane p-3 fade" id="pay" role="tabpanel" aria-labelledby="pay-tab">
          <div class="table-responsive-md">
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
                  <th scope="row">{{order.orderseq}}</th>
                  <td>
                    {{order.orderdates}} ~
                    <br />
                    {{order.orderdatee}}
                  </td>
                  <td>{{order.roomname}}</td>
                  <td>
                    <span v-if="order.state == 0">已付款</span>
                    <span v-if="order.state == 1">已取消</span>
                    <span v-if="order.state == 2">已退款</span>
                    <span v-if="order.state == 3">已完成</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#orderInfoModal"
                    >詳情</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <page v-if="pagelist.total != 0" class="mt-3" :page-data="pagelist" @page-change="getData"></page>
          </div>
        </div>
        <div class="tab-pane p-3 fade" id="complete" role="tabpanel" aria-labelledby="complete-tab">
          <div class="table-responsive-md">
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
                  <th scope="row">{{order.orderseq}}</th>
                  <td>
                    {{order.orderdates}} ~
                    <br />
                    {{order.orderdatee}}
                  </td>
                  <td>{{order.roomname}}</td>
                  <td>
                    <span v-if="order.state == 0">已付款</span>
                    <span v-if="order.state == 1">已取消</span>
                    <span v-if="order.state == 2">已退款</span>
                    <span v-if="order.state == 3">已完成</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#orderInfoModal"
                    >詳情</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <page v-if="pagelist.total != 0" class="mt-3" :page-data="pagelist" @page-change="getData"></page>
          </div>
        </div>
        <div class="tab-pane p-3 fade" id="decline" role="tabpanel" aria-labelledby="decline-tab">
          <div class="table-responsive-md">
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
                  <th scope="row">{{order.orderseq}}</th>
                  <td>
                    {{order.orderdates}} ~
                    <br />
                    {{order.orderdatee}}
                  </td>
                  <td>{{order.roomname}}</td>
                  <td>
                    <span v-if="order.state == 0">已付款</span>
                    <span v-if="order.state == 1">已取消</span>
                    <span v-if="order.state == 2">已退款</span>
                    <span v-if="order.state == 3">已完成</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#orderInfoModal"
                    >詳情</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <page v-if="pagelist.total != 0" class="mt-3" :page-data="pagelist" @page-change="getData"></page>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import page from '@/components/page.vue'

export default {
  data () {
    return {
      orderList: {},
      pagelist: {},
      state: 0,
      isLoading: false
    }
  },
  created () {
    this.getData()
  },
  components: { page, loading: VueLoading },
  methods: {
    getData: function (page = 1) {
      this.isLoading = true
      const vm = this
      this.$emit('checkStatus', 'check')
      var config = {
        method: 'get',
        url: `http://pettrip.rocket-coding.com/api/Order/Getorder?state=${this.state}&page=${page}&paged=6`
      }
      this.$http(config)
        .then(function (response) {
          vm.orderList = response.data.order
          vm.pagelist = response.data.meta
          console.log(response)
          vm.isLoading = false
        })
        .catch(function (error) {
          console.log(error)
          vm.isLoading = false
        })
    },
    changeState: function (state) {
      if (state === '0') {
        this.state = 0
        this.getData(1, 0)
      } else if (state === '1') {
        this.state = 1
        this.getData(1)
      } else if (state === '2') {
        this.state = 2
        this.getData(1)
      } else if (state === '3') {
        this.state = 3
        this.getData(1)
      }
    }
  }
}
</script>
