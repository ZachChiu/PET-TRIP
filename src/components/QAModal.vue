<template>
  <div
    id="QAModal"
    class="QAModal modal fade"
    tabindex="-1"
    aria-labelledby="QAModalLabel"
    aria-hidden="true"
  >
    <div id="QAModal" class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header text-light bg-info">
          <h5 id="QAModalLabel" class="modal-title">回覆</h5>
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
          <div class="px-3 pb-3">
            <p>
              {{ QADetail.name }}
              <small class="text-muted">({{ QADetail.question_date }})</small>
            </p>
            <p class="m-0">{{ QADetail.question }}</p>
          </div>
          <div v-if="QADetail.answer != ''" class="bg-light border p-3">
            <p>廠商回覆：{{ QADetail.answer }}</p>
            <p class="m-0 text-right text-muted">
              <small>({{ QADetail.answer_date }})</small>
            </p>
          </div>
          <div
            v-if="QADetail.answer == '' && identify.identity != '會員'"
            class="form-group mt-3"
          >
            <hr />
            <ValidationObserver v-slot="{invalid}">
              <form @submit.prevent="sendReply">
                <ValidationProvider v-slot="{errors, classes}" rules="required">
                  <label class="h5" for="reply">回覆</label>
                  <span class="text-danger">{{ errors[0] }}</span>
                  <textarea
                    id="reply"
                    v-model.trim="answerBox"
                    class="form-control"
                    rows="3"
                    :class="classes"
                  ></textarea>
                </ValidationProvider>
                <button
                  type="submit"
                  class="btn btn-info mt-2 w-100"
                  :disabled="invalid"
                  :class="{disabled: invalid}"
                >
                  送出
                </button>
              </form>
            </ValidationObserver>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-info"
            data-dismiss="modal"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  name: 'QAModal',
  props: ['QADetail', 'identify'],
  data() {
    return {
      answerBox: '',
      id: {},
    };
  },
  methods: {
    sendReply() {
      const vm = this;
      const config = {
        method: 'post',
        url: 'http://pettrip.rocket-coding.com/api/Qa/PostAnswer',
        data: {
          queseq: this.QADetail.queseq,
          message: this.answerBox,
        },
      };
      this.$http(config)
        .then(function() {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: '回覆成功',
            showConfirmButton: false,
            timer: 2000,
          });
          $('#QAModal').modal('hide');
          vm.answerBox = '';
          vm.$emit('refresh');
        })
        .catch(function() {
          vm.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '回覆失敗',
            showConfirmButton: false,
            timer: 2000,
          });
          vm.answerBox = '';
        });
    },
  },
};
</script>
