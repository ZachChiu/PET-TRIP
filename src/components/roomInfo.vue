<template>
  <div class="border border-top-0 rounded p-3">
            <h5 class="text-center">
              關於{{company.companybrand}}的
              <b>{{room.roomname}}</b>
            </h5>
            <hr>
            <p class="my-4 text-muted text-center">{{room.introduce}}</p>
            <p>
              <i class="roomInfoIcon mr-1 fas fa-paw"></i>接受寵物類型：
              <span v-if="room.pettype_cat">貓</span>
              <span v-if="room.pettype_cat && room.pettype_dog ">、</span>
              <span v-if="room.pettype_dog">狗</span>
              <span v-if="room.pettype_dog && room.pettype_other ">、</span>
              <span v-if="room.pettype_cat && !room.pettype_dog && room.pettype_other ">、</span>
              <span v-if="room.pettype_other">其他</span>
            </p>
            <p>
              <i class="roomInfoIcon mr-1 fas fa-sort-numeric-down"></i>
              可容納數量：{{room.roomamount}}隻
            </p>
            <p>
              <i class="roomInfoIcon mr-1 fas fa-sort-numeric-down"></i>
              超過一隻額外加價：${{room.roomamount_amt | currencyStyle}}/隻
            </p>
            <p>
              <i class="roomInfoIcon mr-1 fas fa-expand-alt"></i>
              接受寵物重量：{{room.petsizes}}~{{room.petsizee}}公斤
            </p>
            <p>
              <i class="roomInfoIcon mr-1 far fa-eye"></i>
              看管程度：
              <span v-if="room.visit != 7">{{room.visit}}小時</span>
              <span v-else>八小時以下</span>
            </p>
            <p>
              <i class="roomInfoIcon mr-1 fas fa-baby-carriage"></i>
              散步次數：{{room.walk}} / 天
            </p>
            <p>
              <i class="roomInfoIcon mr-1 fas fa-bone"></i>提供飼料：
              <span v-if="room.feed">有</span>
              <span v-if="!room.feed">無</span>
            </p>
            <p>
              <i class="roomInfoIcon mr-1 fas fa-utensils"></i>提供罐頭：
              <span v-if="room.canned">有</span>
              <span v-if="!room.canned">無</span>
            </p>
            <p>
              <i class="roomInfoIcon mr-1 fas fa-poo"></i>提供貓砂：
              <span v-if="room.catlitter">有</span>
              <span v-if="!room.catlitter">無</span>
            </p>
            <p>
              <i class="roomInfoIcon mr-1 fas fa-pills"></i>餵藥服務：
              <span v-if="room.medicine_pill || room.medicine_infeed || room.medicine_paste">有</span>
              <span v-else>無</span>
            </p>
            <p>
              <i class="roomInfoIcon mr-1 fas fa-map-marker-alt"></i>
              地點：{{company.country}}{{company.area}}{{company.address}}
            </p>
            <iframe
              :src="`https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${company.country}${company.area}${company.address}&z=16&output=embed&t=`"
              width="600"
              height="400"
              frameborder="0"
              style="border:0;width: 100%;"
              allowfullscreen
            ></iframe>
          </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  name: 'roomInfo',
  props: ['company', 'room'],
  methods: {

  }
}
</script>
