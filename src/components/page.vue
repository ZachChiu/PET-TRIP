<template>
  <div class="page">
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{disabled:pageData.current_page == '1'}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(pageData.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="(page,index) in pageData.total_page" :key="index" class="page-item" :class="{active:pageData.current_page == page}">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{disabled:pageData.current_page == pageData.total_page}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(pageData.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  name: 'Page',
  props: ['pageData'],
  methods: {
    changePage: function (page) {
      this.$emit('page-change', page)
    }
  }
}
</script>
