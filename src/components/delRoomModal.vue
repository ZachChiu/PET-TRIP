<template>
  <div
    id="delModal"
    class="delModal modal fade"
    tabindex="-1"
    aria-labelledby="delModalLabel"
    aria-hidden="true"
  >
    <div id="delModal" class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 id="delModalLabel" class="modal-title text-white">刪除</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          確定要刪除 <b>{{ temData.roomname }}</b>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="d-flex align-items-center btn btn-danger"
            :class="{disabled: load}"
            :disabled="load"
            @click="delRoom"
          >
            <ring-loader
              class="custom-class"
              :color="'black'"
              :loading="load"
              :size="20"
            ></ring-loader
            >確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  name: 'DelModal',
  props: ['temData'],
  data() {
    return {
      load: false,
    };
  },
  methods: {
    delRoom() {
      const vm = this;
      vm.load = true;
      const config = {
        method: 'delete',
        url: `Room/Delete?id=${this.temData.roomseq}`,
      };
      this.$http(config)
        .then(function() {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: '刪除成功',
            showConfirmButton: false,
            timer: 2000,
          });
          $('#delModal').modal('hide');
          vm.$emit('get-data');
          vm.load = false;
        })
        .catch(function() {
          vm.load = false;
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '刪除失敗',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    },
  },
};
</script>
