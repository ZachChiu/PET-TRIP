<template>
  <div class="report">
    <div class="banner position-relative">
      <div
        class="bannerText position-absolute text-dark display-4 font-weight-bold"
      >
        問題回報
      </div>
      <img
        class="img-fluid"
        src="https://upload.cc/i1/2020/09/02/JE5b96.png"
        style="height: 200px; object-fit: cover; width: 100%"
        alt
      />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-11 col-md-8 col-lg-6 mx-auto bg-white border rounded py-4 my-5">
          <form  @submit.prevent="send">
            <h2 class="text-center mt-2">回報表單</h2>
            <div class="form-group">
              <label for="who">提問者</label>
              <input
                type="text"
                class="form-control"
                id="who"
                aria-describedby="emailHelp" v-model="name"
              />
            </div>
            <div class="form-group">
              <label for="email">信箱地址</label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp" v-model="email"
              />
            </div>
            <div class="form-group">
              <label for="title">主旨</label>
              <input type="password" class="form-control" id="title" v-model="title" />
            </div>
            <div class="form-group">
              <label for="question">問題</label>
              <textarea class="form-control" id="question" rows="5" v-model="question"></textarea>
            </div>
            <button type="submit" class="w-100 btn btn-primary">送出</button>
          </form>
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
      name: '',
      email: '',
      title: '',
      question: ''
    }
  },
  created () {
    $('html, body').animate(
      {
        scrollTop: $('#app').offset().top
      },
      0
    )
  },
  methods: {
    send: function () {
      this.name = ''
      this.email = ''
      this.title = ''
      this.question = ''
      Swal.fire({
        icon: 'success',
        title: '回報成功',
        timer: 2000,
        showConfirmButton: false
      })
    }
  }
}
</script>
