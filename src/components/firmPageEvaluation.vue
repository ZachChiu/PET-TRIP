<template>
  <div class="py-4">
    <div v-if="firmData.evaluation[0] != null" class="row no-gutters">
      <div
        v-for="(data, index) in firmData.evaluation"
        :key="index"
        class="mx-auto border-bottom py-3 my-2 col-md-7 col-sm-10 col-11"
      >
        <div class="row no-gutters">
          <div class="col-2">
            <div
              class="backgroundIMG rounded-circle overflow-hidden ml-1"
              :style="{backgroundImage: 'url(' + data.avatar + ')'}"
            >
              <img
                :src="AvatarDefault"
                :class="{opacityZero: firmData.company.avatar != ''}"
                class="w-100 h-100 img-fluid"
                style="object-fit: cover"
                alt
              />
            </div>
          </div>
          <div class="col-10">
            <div class="ml-3">
              <p class="mb-0 text-secondary">
                <small>{{ data.postdate }}</small>
              </p>
              <p class="d-flex align-items-end mb-0">
                <span class="mr-2 h5 mb-0">{{ data.poster }}</span>
                <star-rating
                  v-model="data.star"
                  :rounded-corners="true"
                  :inline="true"
                  :increment="0.1"
                  :read-only="true"
                  :star-size="18"
                ></star-rating>
              </p>
              <p class="text-break text-muted mb-0 mt-1">{{ data.memo }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="firmData.evaluation[0] == null">
      <p class="mb-0 h2 text-center text-secondary">尚無評價</p>
    </div>
  </div>
</template>

<script>
import AvatarDefault from '@/assets/img/Home/Avatar-default.png';

export default {
  props: ['firmData'],
  data() {
    return {AvatarDefault};
  },
  methods: {},
};
</script>
