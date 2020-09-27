<template>
  <div class="pt-4 mx-0 row">
    <div class="col-lg-4 col-md-6 mb-3" v-for="(room,index) in firmData.roomlists" :key="index">
      <div class="roomCard shadow card mb-3">
        <div
          class="h-100"
          :style="{backgroundImage: 'url(' + room.img1 + ')'}"
          style="background-size: cover;"
        >
          <img
            src="https://upload.cc/i1/2020/09/09/GIaohq.jpg"
            :class="{opacityZero:room.bannerimg != ''}"
            class="card-img"
            alt
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">
            <router-link
              :to="`/FirmPage/${room.companyseq}/Room/${room.roomseq}`"
              class="text-body stretched-link"
            >
              <i class="text-warning fas fa-star"></i>
              {{room.roomname}}
            </router-link>
          </h5>
          <p class="card-text">
            <i class="mr-1 fas fa-paw"></i>可接受：
            <span v-if="room.pettype_cat">貓</span>
            <span v-if="room.pettype_cat && room.pettype_dog ">、</span>
            <span v-if="room.pettype_dog">狗</span>
            <span v-if="room.pettype_dog && room.pettype_other ">、</span>
            <span v-if="room.pettype_cat && !room.pettype_dog && room.pettype_other">、</span>
            <span v-if="room.pettype_other">其他</span>
          </p>
          <p class="card-text">
            <i class="mr-1 fas fa-sort-numeric-down"></i>
            可容納：{{room.roomamount}}隻
          </p>
          <p class="card-text">
            <i class="mr-1 fas fa-expand-alt"></i>接受重量：
            <span>{{room.petsizes}}</span>
            <span v-if="room.petsizes != room.petsizee">~</span>
            <span v-if="room.petsizes != room.petsizee">{{room.petsizee}}</span>公斤
          </p>
          <p class="card-text text-danger h5 text-right">$ {{room.roomprice | currencyStyle}} / 天</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.roomCard {
  position: relative;
  top: 0;
  transition: all 0.3s;
  &:hover {
    top: -10px;
  }
}
</style>

<script>
export default {
  data () {
    return {
    }
  },
  name: 'firmPageRoom',
  props: ['firmData'],
  created () {},
  methods: {}
}
</script>
