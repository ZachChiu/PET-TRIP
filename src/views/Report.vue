<template>
  <div class="report">
    <div class="container">
      <div class="row">
        <div
          class="col-11 col-md-8 col-lg-6 mx-auto bg-white border rounded py-4 my-5"
        >
          <form @submit.prevent="send">
            <h2 class="text-center mt-2">回報表單</h2>
            <div class="form-group">
              <label for="who">提問者</label>
              <input
                id="who"
                v-model="name"
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group">
              <label for="email">信箱地址</label>
              <input
                id="email"
                v-model="email"
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group">
              <label for="title">主旨</label>
              <input
                id="title"
                v-model="title"
                type="password"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="question">問題</label>
              <textarea
                id="question"
                v-model="question"
                class="form-control"
                rows="5"
              ></textarea>
            </div>
            <button type="submit" class="w-100 btn btn-primary">送出</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      title: '',
      question: '',
    };
  },

  methods: {
    send() {
      this.name = '';
      this.email = '';
      this.title = '';
      this.question = '';
      this.Swal.fire({
        icon: 'success',
        title: '回報成功',
        timer: 2000,
        showConfirmButton: false,
      });
    },
  },
};
</script>
