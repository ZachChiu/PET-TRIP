<template>
  <div class="table-responsive-lg">
    <table v-if="QAData[0] != null" class="table table-hover">
      <thead class="thead-light">
        <tr>
          <th scope="col">狀態</th>
          <th scope="col">問題</th>
          <th scope="col">空間名稱</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(QA,index) in QAData" :key="index">
          <th scope="row">
            <span class="font-weight-normal" :class="{'text-danger':QA.state == '未回覆'}">{{QA.state}}</span>
            <p class="text-muted"><small>{{QA.postday}}</small></p>

          </th>
          <td>
            <span style="max-width: 150px;" class="d-inline-block text-truncate">{{QA.message}}</span>
          </td>
          <td>
           <span style="max-width: 120px;" class="d-inline-block text-truncate">
             <router-link target="_blank" :to="`/FirmPage/${QA.companyseq}/Room/${QA.roomseq}`">{{QA.roomname}}</router-link>
             </span>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              @click="openDetail(QA)"
            >詳情</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="QAData[0] == null" class="h1 text-center text-muted">暫無資料</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  name: 'QAList',
  props: ['QAData'],
  methods: {
    openDetail: function (QA) {
      this.$emit('open-detail', QA)
    }
  }
}
</script>
