<template>
  <div class="firmCard shadow card mb-4">
    <router-link
      class="text-reset text-decoration-none"
      :to="`/FirmPage/${firm.companyseq}`"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <div
            class="backgroundIMG firmPic h-100"
            :style="{backgroundImage: 'url(' + firm.bannerimg + ')'}"
          >
            <img
              :src="FeaturedBg"
              :class="{opacityZero: firm.bannerimg != ''}"
              class="card-img"
              alt
            />
          </div>
        </div>
        <div class="col-md-8">
          <div class="card-body w-100 h-100">
            <div
              class="row align-items-md-end align-items-start flex-md-row-reverse flex-row"
            >
              <div class="col-4 d-sm-none d-block">
                <div
                  class="backgroundIMG rounded-circle mx-auto"
                  :style="{
                    backgroundImage: 'url(' + firm.avatar + ')',
                  }"
                  style="max-width: 300px"
                >
                  <img
                    :src="AvatarDefault"
                    :class="{opacityZero: firm.avatar != ''}"
                    class="w-100 img-fluid"
                    alt
                  />
                </div>
              </div>
              <div class="col-8 col-sm-12">
                <h6 class="my-0 mr-1 card-title text-truncate font-weight-bold">
                  <p class="mb-0">
                    {{ firm.companybrand }}
                  </p>
                </h6>
                <p class="my-1 d-flex align-items-end flex-wrap">
                  <star-rating
                    v-model="firm.evaluation"
                    :inline="true"
                    :increment="0.1"
                    :rounded-corners="true"
                    :read-only="true"
                    :star-size="20"
                  ></star-rating>
                  <small class="ml-1">({{ firm.evaluation_count }}筆)</small>
                </p>

                <p class="my-1 card-text">
                  <i class="mr-1 fas fa-map-marker-alt"></i>
                  {{ firm.country }}、{{ firm.area }}
                </p>
                <p class="my-1 card-text">{{ firm.pettype }}</p>
                <p class="my-1 text-truncate">
                  <i class="mr-1 fas fa-paw"></i>
                  <span v-if="firm.pettype_cat">貓</span>
                  <span v-if="firm.pettype_cat && firm.pettype_dog">、</span>
                  <span v-if="firm.pettype_dog">狗</span>
                  <span v-if="firm.pettype_dog && firm.pettype_other">、</span>
                  <span
                    v-if="
                      firm.pettype_cat &&
                        !firm.pettype_dog &&
                        firm.pettype_other
                    "
                    >、</span
                  >
                  <span v-if="firm.pettype_other">其他</span>
                </p>
                <p class="my-1 card-text text-secondary">
                  <i class="mr-1 fas fa-tag"></i>
                  共有{{ firm.rooms }}間房間
                </p>
                <p class="my-1 card-text text-danger">
                  <i class="mr-1 fas fa-barcode"></i>
                  $ {{ firm.roomprice_min | currencyStyle }}
                  <span v-if="firm.roomprice_min != firm.roomprice_max"
                    >~{{ firm.roomprice_max | currencyStyle }}</span
                  >
                  / 天
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import AvatarDefault from '@/assets/img/Home/Avatar-default.png';
import FeaturedBg from '@/assets/img/Home/featured-bg.jpg';

export default {
  props: {
    firm: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      AvatarDefault,
      FeaturedBg,
    };
  },
};
</script>
