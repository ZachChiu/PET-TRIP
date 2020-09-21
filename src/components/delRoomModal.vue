<template>
  <div
      class="delModal modal fade"
      id="delModal"
      tabindex="-1"
      aria-labelledby="delModalLabel"
      aria-hidden="true"
    >
      <div id="delModal" class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title text-white" id="delModalLabel">刪除</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">確定要刪除 <b>{{temData.roomname}}</b> </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delRoom">確定</button>
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
    }
  },
  name: 'delModal',
  props: ['temData'],
  methods: {
    delRoom: function () {
      const vm = this
      const config = {
        method: 'delete',
        url: `http://pettrip.rocket-coding.com/api/Room/Delete?id=${this.temData.roomseq}`
      }
      this.$http(config)
        .then(function (response) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: '刪除成功',
            showConfirmButton: false,
            timer: 2000
          })
          $('#delModal').modal('hide')
          vm.$emit('get-data')
        })
        .catch(function () {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '刪除失敗',
            showConfirmButton: false,
            timer: 2000
          })
        })
    }
  }
}
</script>
