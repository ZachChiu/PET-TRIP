<template>
  <div class="pt-4 mx-0 row">
    <div
      v-for="(room, index) in firmData.roomlists"
      :key="index"
      class="col-lg-4 col-md-6 mb-3"
    >
      <RoomCard :room="room" />
    </div>
  </div>
</template>

<script>
import FeaturedBg from '@/assets/img/Home/featured-bg.jpg';
import RoomCard from '@/components/RoomCard.vue';

export default {
  components: {RoomCard},
  props: ['firmData'],
  data() {
    return {FeaturedBg};
  },
  methods: {},
};
</script>
