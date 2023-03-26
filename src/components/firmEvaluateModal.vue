<template>
  <div
    id="FirmEvaluationModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="evaluationModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div v-if="evaluationData.company != null" class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title">評價</h5>
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
          <div class="d-flex align-items-center">
            <div
              class="backgroundIMG rounded-circle mx-auto overflow-hidden"
              :style="{
                backgroundImage: 'url(' + evaluationData.company.avatar + ')',
              }"
              style="max-width: 120px;"
            >
              <img
                :src="NoImageImg"
                :class="{opacityZero: evaluationData.company.avatar != ''}"
                class="w-100 img-fluid"
                alt
              />
            </div>
            <div class="ml-3 w-100">
              <p class="h4 mb-1">{{ evaluationData.company.membername }}</p>
              <p class="mb-1">
                <small class="text-secondary">{{
                  evaluationData.company.roomname
                }}</small>
              </p>
              <p class="text-danger mb-0">
                $ {{ evaluationData.company.amt | currencyStyle }} 元
              </p>
            </div>
          </div>
          <hr />
          <div class="text-center my-3">
            <star-rating
              v-model="evaluationData.evalution.star"
              :inline="true"
              :read-only="true"
              :border-width="0"
              :rounded-corners="true"
              :star-size="40"
            ></star-rating>
          </div>
          <div class="form-group">
            <label for="evauationText">評論</label>
            <textarea
              id="evauationText"
              v-model="evaluationData.evalution.memo"
              class="form-control"
              rows="3"
              readonly
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
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
import NoImageImg from '@/assets/img/no-image.png';

export default {
  props: ['evaluationData'],
  data() {
    return {NoImageImg};
  },
};
</script>
