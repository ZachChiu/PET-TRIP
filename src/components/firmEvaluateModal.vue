<template>
  <div
    class="modal fade"
    id="evaluationModal"
    tabindex="-1"
    aria-labelledby="evaluationModalLabel"
    aria-hidden="true"
    v-if="evaluationData.company != null"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title" id="evaluationModal">評價</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="d-flex align-items-center">
            <div
              class="rounded-circle mx-auto overflow-hidden"
              :style="{backgroundImage: 'url(' + evaluationData.company.avatar + ')'}"
              style="background-size: cover;max-width: 120px;"
            >
              <img
                src="https://upload.cc/i1/2020/09/01/IaZYfp.png"
                :class="{opacityZero:evaluationData.company.avatar != ''}"
                class="w-100 img-fluid"
                alt
              />
            </div>
            <div class="ml-3 w-100">
              <p class="h4 mb-1">{{evaluationData.company.membername}}</p>
              <p class="mb-1">
                <small class="text-secondary">子庭毛毛屋A01</small>
              </p>
              <p class="text-danger mb-0">$ {{evaluationData.company.amt}} 元</p>
            </div>
          </div>
          <hr>
          <div class="text-center my-3">
            <star-rating
              :inline="true"
              v-model="evaluationData.evalution.star"
              :read-only="true"
              :border-width="0"
              :rounded-corners="true"
              :star-size="40"
            ></star-rating>
          </div>
          <div class="form-group">
            <label for="evauationText">評論</label>
            <textarea class="form-control" id="evauationText" rows="3" v-model="evaluationData.evalution.memo" readonly></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  name: 'firmEvaluateModal',
  props: ['evaluationData']
}
</script>
